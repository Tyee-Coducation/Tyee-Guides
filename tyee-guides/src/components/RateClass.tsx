"use client";
import { useRef, MutableRefObject } from "react";
import styles from "@styles/Class.module.css";

function StarInput({ name }) {
  return (
    <>
      <div className={styles.rating}>
        <label>
          <input type="radio" name={name} value="1" required />
          <span className={styles.icon}>★</span>
        </label>
        <label>
          <input type="radio" name={name} value="2" />
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
        </label>
        <label>
          <input type="radio" name={name} value="3" />
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
        </label>
        <label>
          <input type="radio" name={name} value="4" />
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
        </label>
        <label>
          <input type="radio" name={name} value="5" />
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
          <span className={styles.icon}>★</span>
        </label>
      </div>
    </>
  );
}

export default function RateClass({ name }) {
  const form = useRef(null);
  async function submit(e) {
    e.preventDefault();
    const data = new FormData(form?.current);
    let test = name.split("%20").join(" ");
    const req = await fetch("/api/rateClass", {
      method: "POST",
      body: JSON.stringify({
        className: test,
        overallRating: data.get("overallRating"),
        genRatings: {
          fun: data.get("fun"),
          difficulty: data.get("difficulty"),
          workload: data.get("workload"),
        },
      }),
    });
    const json = await req.json();
    alert(json.message);
    location.reload();
  }
  return (
    <>
      <form onSubmit={submit} ref={form}>
        <h1 className="mt-6">What overall rating would you give {name}</h1>
        <StarInput name="overallRating" />
        <h1 className="mt-2">How would you rate the funness of {name}?</h1>
        <StarInput name="fun" />
        <h1 className="mt-2">
          How would you rate the difficulty of {name}? (5 is hardest)
        </h1>
        <StarInput name="difficulty" />
        <h1 className="mt-2">
          How would you rate the workload of {name}? (5 is most)
        </h1>
        <StarInput name="workload" />
        <button className={styles.submit}>Submit</button>
      </form>
    </>
  );
}
