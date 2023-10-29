import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";

export async function POST(req: Request) {
  try {
    const data = await req.json();
    const event = data;
    await connectToDataBase();
    const day = event.day;
    const saveWeek = await TyeeGuidesWeek.findOne({ week: data.week });
    saveWeek.days[data.day].events.push(event);
    await saveWeek.save();
    console.log(saveWeek.days[data.day]);
    return Response.json({
      message: "Event added successfully",
    });
  } catch (err) {
    console.error(err);
    return Response.json({
      message: "Error adding event",
    });
  }
}
