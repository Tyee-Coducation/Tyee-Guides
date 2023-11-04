import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import styles from "@styles/Calendar.module.css";
import AddEvents from "@components/AddEvents";
import Link from "next/link";

export default async function Calendar({ params }) {
  let { data } = params;
  data = data.split("%20").join(" ");
  data = data.split("%2C").join(",");
  await connectToDataBase();
  const week = await TyeeGuidesWeek.findOne({ week: data });
  return (
    <>
      {week ? (
        <>
          <h1 className={styles.header + " text-3xl"}>{data}</h1>
          <div className={styles.grid}>
            {week &&
              Object.keys(week.days).map((day, index) => {
                return (
                  <div className={styles.day} key={index}>
                    <div className={styles.dayContent}>
                      <Link href={`/day/${week.week}/${day}`}>
                        <h2 className={styles.dayName}>{day.split(",")[0]}</h2>
                      </Link>
                      <div className={styles.dayEvents}>
                        {week.days[day].events.map((event, index) => {
                          return (
                            <Link
                              href={`/event/${week.week}/${day}/${event._id}}`}
                            >
                              <div className={styles.event} key={index}>
                                <h3 className={styles.eventBox}>
                                  {event.name || event.eventName}{" "}
                                  {event.startTime} - {event.endTime}
                                </h3>
                              </div>
                            </Link>
                          );
                        })}
                      </div>
                    </div>
                    <AddEvents
                      week={week.week}
                      day={day}
                      className="addEvent"
                    />
                  </div>
                );
              })}
          </div>
        </>
      ) : (
        <main>
          <h1 className="text-6xl">404</h1>
          <p className="text-3xl mt-6">Week not found :(</p>
        </main>
      )}
    </>
  );
}
