"use client";

import styles from "@styles/Calendar.module.css";
import { useSession } from "next-auth/react";
import { useRef } from "react";

export default function DeleteEvents(props) {
  const form = useRef(null);
  const { data: session } = useSession();
  if (!session) {
    return <></>;
  }
  async function deleteEvents(event) {
    event.preventDefault();
    const res = await fetch("/api/deleteEvents", {
      method: "POST",
      body: JSON.stringify({
        week: props.event.week,
        day: props.event.day,
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
        Delete event
      </button>
      <dialog ref={form} className={styles.addEventModal}>
        <form onSubmit={deleteEvents}>
          <h1 className="mt-2 text-2xl text-center">
            Are you sure you want to delete {props.event.name}?
          </h1>
          <button className={styles.submitEvent}>Submit</button>
          <div onClick={() => form?.current?.close()} className={styles.close}>
            X
          </div>
        </form>
      </dialog>
    </>
  );
}
