import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";
import styles from "@styles/Day.module.css";
import AddEvents from "@components/AddEvents";
import UpdateEvents from "@components/UpdateEvents";
import DeleteEvents from "@components/DeleteEvents";
import Link from "next/link";

export default async function Week({ params }) {
  const session = await getServerSession();
  let { week, day } = params;
  week = week.split("%20").join(" ");
  week = week.split("%2C").join(",");
  day = day.split("%20").join(" ");
  day = day.split("%2C").join(",");
  await connectToDataBase();
  const weekData = await TyeeGuidesWeek.findOne({ week: week });
  const dayData = weekData?.days[day];
  return (
    <>
      <main>
        {dayData ? (
          <>
            <h1 className="text-4xl mb-6">{day}</h1>
            <AddEvents week={week} day={day} className="dayAddEvent" />
            <div className={styles.grid}>
              {dayData.events.map((event, index) => {
                return (
                  <div className={styles.event} key={index}>
                    <Link href={`/event/${week}/${day}/${event._id}`}>
                      <h1 className="text-2xl">{event.name}</h1>
                    </Link>
                    <p className="text-lg mt-4">{event.description}</p>
                    <p className="text-lg mt-2">{event.location}</p>
                    <p className="text-lg mt-2">
                      {event.startTime} - {event.endTime}
                    </p>
                    {session?.user?.email === event.person && (
                      <>
                        <UpdateEvents
                          week={week}
                          day={day}
                          index={index}
                          event={event}
                          className="updateEvents"
                        />
                        <DeleteEvents
                          event={event}
                          className="dayDeleteEvents"
                        />
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        ) : (
          <div>
            <h1 className="text-6xl">404</h1>
            <p className="text-3xl mt-6">Day not found :(</p>
          </div>
        )}
      </main>
    </>
  );
}
