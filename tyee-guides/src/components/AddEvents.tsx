"use client";

import styles from "@styles/Calendar.module.css";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function AddEvents(props) {
  const form = useRef(null);
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  async function addEvent(event) {
    event.preventDefault();
    const timeRegex = /^(0?[1-9]|1[0-2]):[0-5][0-9] [APap][mM]$/;
    const data = new FormData(event.currentTarget);
    if (
      !timeRegex.test(data.get("start-time")) ||
      !timeRegex.test(data.get("end-time"))
    ) {
      alert("Please enter a valid start time");
      return;
    }
    function convertTime(time) {
      const hour1 = parseInt(time.split(":")[0]);
      const minutes = parseInt(time.split(":")[1].split(" ")[0]);
      const am = time.includes("am");
      if (am) {
        if (hour1 === 12) {
          return minutes;
        }
        return hour1 * 60 + minutes;
      } else {
        if (hour1 === 12) {
          return hour1 * 60 + minutes;
        }
        return (hour1 + 12) * 60 + minutes;
      }
    }
    const res = await fetch("/api/addEvents", {
      method: "POST",
      body: JSON.stringify({
        startTime: data.get("start-time"),
        endTime: data.get("end-time"),
        startTimestamp: convertTime(data.get("start-time")),
        endTimestamp: convertTime(data.get("end-time")),
        name: data.get("event-name"),
        description: data.get("event-description"),
        location: data.get("event-location"),
        week: props.week,
        day: props.day,
      }),
    });
    const json = await res.json();
    alert(json.message);
    location.reload();
  }

  return (
    <>
      <button
        className={styles.addEvent}
        onClick={() => form.current.showModal()}
      >
        Add event
      </button>
      <dialog ref={form} className={styles.addEventModal}>
        <form onSubmit={addEvent}>
          <h1 className="mt-2 text-2xl text-center">Add Event:</h1>
          <input
            placeholder="Start Time (Enter like 7:30 am)"
            required
            type="text"
            name="start-time"
          />
          <input
            placeholder="End Time (Enter like 7:30 am)"
            required
            type="text"
            name="end-time"
          />
          <input
            placeholder="Event Name"
            required
            type="text"
            name="event-name"
          />
          <input
            placeholder="Event Description"
            required
            type="text"
            name="event-description"
          />
          <input
            placeholder="Event Location"
            required
            type="text"
            name="event-location"
          />
          <button className={styles.submitEvent}>Submit</button>
        </form>
      </dialog>
    </>
  );
}
