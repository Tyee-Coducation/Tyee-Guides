"use client";

import styles from "@styles/Calendar.module.css";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function AddEvents(props) {
  const form = useRef(null);
  const { data: session } = useSession();
  if (session?.user?.email !== props.event?.person) {
    return <></>;
  }
  async function updateEvents(event) {
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
    if (
      convertTime(data.get("start-time")) > convertTime(data.get("end-time"))
    ) {
      alert("Please make sure the start time is before the end time");
      return;
    }
    if (data.get("event-name")?.length > 20) {
      alert("Please make sure the event name is less than 20 characters");
      return;
    }
    const res = await fetch("/api/editEvents", {
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
        _id: props.event._id,
      }),
    });
    const json = await res.json();
    alert(json.message);
    location.reload();
  }

  return (
    <>
      <button
        className={styles[props.className]}
        onClick={() => form.current.showModal()}
      >
        Update
      </button>
      <dialog ref={form} className={styles.addEventModal}>
        <form onSubmit={updateEvents}>
          <h1 className="mt-2 text-2xl text-center">Update Event:</h1>
          <input
            placeholder="Start Time (Enter like 7:30 am)"
            required
            type="text"
            name="start-time"
            defaultValue={props.event?.startTime}
          ></input>
          <input
            placeholder="End Time (Enter like 7:30 am)"
            required
            type="text"
            name="end-time"
            defaultValue={props.event?.endTime}
          ></input>
          <input
            placeholder="Event Name"
            required
            type="text"
            name="event-name"
            defaultValue={props.event?.name}
          ></input>
          <input
            placeholder="Event Description"
            required
            type="text"
            name="event-description"
            defaultValue={props.event?.description}
          ></input>
          <input
            placeholder="Event Location"
            required
            type="text"
            name="event-location"
            defaultValue={props.event?.location}
          ></input>
          <button className={styles.submitEvent}>Submit</button>
          <div onClick={() => form?.current?.close()} className={styles.close}>
            X
          </div>
        </form>
      </dialog>
    </>
  );
}
