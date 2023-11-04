import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";
import UpdateEvents from "@components/UpdateEvents";
import DeleteEvents from "@components/DeleteEvents";

export default async function Event({ params }) {
  const session = await getServerSession();
  let { week, day, id } = params;
  week = week.split("%20").join(" ");
  week = week.split("%2C").join(",");
  day = day.split("%20").join(" ");
  day = day.split("%2C").join(",");
  if(id.includes("%7D")){
    id = id.split("%7D")[0]
  }
  await connectToDataBase();
  const weekData = await TyeeGuidesWeek.findOne({ week: week });
  const dayData = weekData?.days[day];
  const event = dayData?.events?.find((event) => event._id === id);
  return (
    <main>
      {event ? (
        <>
          <h1 className="text-4xl">{event.name}</h1>
          <p className="text-2xl mt-4">{event.description}</p>
          <p className="text-xl mt-2">{event.location}</p>
          <p className="text-lg mt-2">
            {event.startTime} - {event.endTime}
          </p>
          {
            session?.user?.email === event.person && (
              <div className="mt-4">
                <UpdateEvents
                  week={week}
                  day={day}
                  event={event}
                  className="updateEvents"
                />
                <DeleteEvents
                  event={event}
                  className="dayDeleteEvents"
                  redirect={`/day/${week}/${day}`}
                />
              </div>
            )
          }
        </>
      ) : (
        <div>
          <h1 className="text-6xl">404</h1>
          <p className="text-3xl mt-6">Event not found :(</p>
        </div>
      )}
    </main>
  );
}
