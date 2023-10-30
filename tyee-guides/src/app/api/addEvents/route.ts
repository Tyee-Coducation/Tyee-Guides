import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (session) {
    try {
      const data = await req.json();
      const event = data;

      // Assuming that TyeeGuidesWeek is a Mongoose model
      const saveWeek = await TyeeGuidesWeek.findOne({ week: data.week });

      if (!saveWeek) {
        return Response.json({
          message: "Week not found",
        });
      }

      const day = event.day;

      // Push the event data into the events array for the specific day
      saveWeek.days[day].events.push(event);

      // Mark the document as modified
      saveWeek.markModified("days");

      // Save the updated document
      await saveWeek.save();

      console.log(saveWeek.days[day]);
      return Response.json({
        message: "Event added successfully",
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
