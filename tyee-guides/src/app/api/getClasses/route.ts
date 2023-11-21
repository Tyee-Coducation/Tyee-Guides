import { connectToDataBase } from "@lib/db";
import TyeeGuidesClass from "@models/class";

export async function POST(req: Request) {
  const data = await req.json();
  const { query } = data;
  await connectToDataBase();
  let returnedClasses = [];
  const classes = await TyeeGuidesClass.find();
  classes.forEach((item) => {
    if (
      item.subjects?.includes(query) ||
      item.name?.toLowerCase()?.includes(query) ||
      item.teacher?.toLowerCase()?.includes(query) ||
      item.classRoom?.toLowerCase()?.includes(query)
    ) {
      returnedClasses.push(item);
    }
  });
  return Response.json({ classes: returnedClasses });
}
