import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";
import { getServerSession } from "next-auth";
import { v4 } from "uuid";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (session) {
    try {
      const data = await req.json();
      let event = data;
      event.person = session?.user?.email;
      event._id = v4();
      
      // Assuming that TyeeGuidesWeek is a Mongoose 
      await connectToDataBase();
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
