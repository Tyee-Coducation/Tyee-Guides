import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (session) {
    try {
      const data = await req.json();
      if (session?.user?.email !== data.person) {
        return Response.json({
          message: "You are not the author of the event!",
        });
      }
      let event = data;
      event.person = session?.user?.email;

      const saveWeek = await TyeeGuidesWeek.findOne({ week: data.week });

      if (!saveWeek) {
        return Response.json({
          message: "Week not found",
        });
      }

      const day = event.day;

      // Push the event data into the events array for the specific day
      let deleteEvent = saveWeek.days[day].events.find(
        (e) => e._id === event._id
      );
      if (!deleteEvent) {
        return Response.json({
          message: "Event not found",
        });
      } else {
        saveWeek.days[day].events.splice(
          saveWeek.days[day].events.indexOf(deleteEvent),
          1
        );
      }
      // Mark the document as modified
      saveWeek.markModified("days");

      // Save the updated document
      await saveWeek.save();
      return Response.json({
        message: "Event Deleted successfully",
      });
    } catch (err) {
      console.error(err);
      return Response.json({
        message: "Error Deleting event",
      });
    }
  } else {
    return Response.json({
      message: "You are not authorized",
    });
  }
}
