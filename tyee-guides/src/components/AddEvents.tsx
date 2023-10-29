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
  }

  return (
    <>
      <button
        className={styles.addEvent}
        onClick={() => document.getElementById("form").showModal()}
      >
        Add event
      </button>
      <dialog id="form">
        <form onSubmit={addEvent}>
          <label>Start Time</label>
          <input required type="text" name="start-time"></input>
          <label>End Time</label>
          <input required type="text" name="end-time"></input>
          <label>Event Name</label>
          <input required type="text" name="event-name"></input>
          <label>Event Description</label>
          <input required type="text" name="event-description"></input>
          <label>Event Location</label>
          <input required type="text" name="event-location"></input>
          <button>Submit</button>
        </form>
      </dialog>
    </>
  );
}
