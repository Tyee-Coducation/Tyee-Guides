"use client";

import styles from "@styles/Calendar.module.css";

export default function AddEvents(props) {
  async function addEvent(event) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const res = await fetch("/api/addEvents", {
      method: "POST",
      body: JSON.stringify({
        startTime: data.get("start-time"),
        endTime: data.get("end-time"),
        eventName: data.get("event-name"),
        eventDescription: data.get("event-description"),
        eventLocation: data.get("event-location"),
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
        onClick={() => document.getElementById("form").showModal()}
      >
        Add event
      </button>
      <dialog id="form" className={styles.addEventModal}>
        <form onSubmit={addEvent}>
          <h1 className="mt-2 text-2xl text-center">Add Event:</h1>
          <input
            placeholder="Start Time"
            required
            type="text"
            name="start-time"
          ></input>
          <input
            placeholder="End Time"
            required
            type="text"
            name="end-time"
          ></input>
          <input
            placeholder="Event Name"
            required
            type="text"
            name="event-name"
          ></input>
          <input
            placeholder="Event Description"
            required
            type="text"
            name="event-description"
          ></input>
          <input
            placeholder="Event Location"
            required
            type="text"
            name="event-location"
          ></input>
          <button className={styles.submitEvent}>Submit</button>
        </form>
      </dialog>
    </>
  );
}
