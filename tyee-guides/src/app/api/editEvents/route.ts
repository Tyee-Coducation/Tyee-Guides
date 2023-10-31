import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (session) {
    try {
      const data = await req.json();
      let event = data;
      event.person = session.user.email;
      // Assuming that TyeeGuidesWeek is a Mongoose model
      const saveWeek = await TyeeGuidesWeek.findOne({ week: data.week });

      if (!saveWeek) {
        return Response.json({
          message: "Week not found",
        });
      }
      const day = event.day;
      let updatedEvent = saveWeek.days[day].events.find(
        (event) => event._id === data._id,
      );
      event._id = data._id;
      if (!updatedEvent) {
        return Response.json({
          message: "Event not found",
        });
      }
      saveWeek.days[day].events[
        saveWeek.days[day].events.indexOf(updatedEvent)
      ] = event;
      saveWeek.markModified("days");

      // Save the updated document
      await saveWeek.save();
      return Response.json({
        message: "Event Updated successfully",
      });
    } catch (err) {
      console.error(err);
      return Response.json({
        message: "Error adding event",
      });
    }
  } else {
    return Response.json({
      message: "You are not authorized",
    });
  }
}
