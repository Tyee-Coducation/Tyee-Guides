import Navbar from "@components/Navbar";
import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import styles from "@styles/Calendar.module.css";
import AddEvents from "@components/AddEvents";

export default async function Calendar({ params }) {
  let { data } = params;
  data = data.split("%20").join(" ");
  data = data.split("%2C").join(",");
  await connectToDataBase();
  const week = await TyeeGuidesWeek.findOne({ week: data });
  console.log(week)
  return (
    <>
      <Navbar />
      <h1 className={styles.header + " text-3xl"}>{data}</h1>
      <div className={styles.grid}>
        {week &&
          Object.keys(week.days).map((day, index) => {
            return (
              <div className={styles.day} key={index}>
                <h2 className={styles.dayName}>{day}</h2>
                <div className={styles.dayEvents}>
                  {week.days[day].events.map((event, index) => {
                    return (
                      <div className={styles.event} key={index}>
                        <h3 className={styles.eventName}>{event.name}</h3>
                        <p className={styles.eventTime}>{event.time}</p>
                        <p className={styles.eventDescription}>
                          {event.description}
                        </p>
                      </div>
                    );
                  })}
                </div>
                <AddEvents week={week.week} day={day} />
              </div>
            );
          })}
      </div>
    </>
  );
}
