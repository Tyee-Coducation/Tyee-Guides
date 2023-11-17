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
    let classExists = await QuizGeniusClass.findOne({ name: data.className });
    if (classExists) {
      try {
        classExists.teacher =
          data.teacher !== "same" ? data.teacher : classExists.teacher;
        classExists.classInfo =
          data.classInfo !== "same" ? data.classInfo : classExists.classInfo;
        classExists.classRoom =
          data.classRoom !== "same" ? data.classRoom : classExists.classRoom;
        classExists.name =
          data.className !== "same" ? data.className : classExists.name;
        await classExists.save();
        return Response.json({ message: "Class updated." });
      } catch (err) {
        return Response.json({ message: "Error updating class.", error: err });
      }
    }
  }
  return Response.json({ message: "You are not authorized to do this." });
}
