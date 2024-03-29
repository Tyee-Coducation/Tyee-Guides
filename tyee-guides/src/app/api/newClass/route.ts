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
    const classExists = await QuizGeniusClass.findOne({ name: data.className });
    if (classExists) {
      return Response.json({ message: "Class already exists." });
    }
    const newClass = new QuizGeniusClass({
      name: data.className,
      teacher: data.teacher,
      classInfo: data.classInfo,
      classRoom: data.classRoom,
      ratings: {
        1: 0,
        2: 0,
        3: 0,
        4: 0,
        5: 0,
      },
      genRatings: {
        fun: [0, 0],
        difficulty: [0, 0],
        workload: [0, 0],
      },
    });
    await newClass.save();
    return Response.json({ message: "New class created." });
  }
  return Response.json({ message: "You are not authorized to do this." });
}
