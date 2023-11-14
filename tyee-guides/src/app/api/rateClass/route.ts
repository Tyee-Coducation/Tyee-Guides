import { getServerSession } from "next-auth";
import { connectToDataBase } from "@lib/db";
import TyeeGuidesClass from "@models/class";

export async function POST(req: Request) {
  const session = await getServerSession();
  if (!session) {
    return Response.json({
      message: "You are not authorized",
    });
  }
  const data = await req.json();
  await connectToDataBase();
  const searchedClass = await TyeeGuidesClass.findOne({ name: data.name });
  if (!searchedClass) {
    return Response.json({
      message: "Class not found",
    });
  }
  searchedClass.ratings[data.rating] += 1;
  Object.keys(searchedClass.genRatings).forEach((key) => {
    if (data.genRatings[key]) {
      searchedClass.genRatings[key][0] += data.genRatings[key];
      searchedClass.genRatings[key][1] += 1;
    }
  });
  searchedClass.markModified("ratings");
  searchedClass.markModified("genRatings");
  await searchedClass.save();
}
