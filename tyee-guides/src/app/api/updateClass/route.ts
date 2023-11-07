import { connectToDataBase } from "@lib/db";
import QuizGeniusClass from "@models/class";
import { getServerSession } from "next-auth";

export async function POST(req: Request) {
  const data = await req.json();
  const session = await getServerSession();
  if (
    session?.user?.email === "lockemaximus@yahoo.com" ||
    session?.user?.email === "pineappletwo@gmail.com"
  ) {
    await connectToDataBase();
    let classExists = await QuizGeniusClass.findOne({ name: data.name });
    if (classExists) {
      try {
        classExists = data;
        await classExists.save();
        return Response.json({ message: "Class updated." });
      } catch (err) {
        return Response.json({ message: "Error updating class.", error: err });
      }
    }
  }
  return Response.json({ message: "You are not authorized to do this." });
}
