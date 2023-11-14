import { getServerSession } from "next-auth";
import { connectToDataBase } from "@lib/db";
import TyeeGuidesClass from "@models/class";

export async function POST(req: Request) {
  const data = await req.json();
  const session = await getServerSession();
  if (!session) {
    return Response.json({
      message: "You are not authorized",
    });
  }
  await connectToDataBase();
  let className = JSON.parse(data.className);
  console.log(className);
  const searchedClass = await TyeeGuidesClass.findOne({ name: "Chinese 2" });
  if (!searchedClass) {
    return Response.json({
      message: "Class not found",
    });
  }
  searchedClass.ratings[data.overallRating] += 1;
  Object.keys(searchedClass.genRatings).forEach((key) => {
    if (data.genRatings[key]) {
      searchedClass.genRatings[key][0] += parseInt(data.genRatings[key]);
      searchedClass.genRatings[key][1] += 1;
    }
  });
  searchedClass.markModified("ratings");
  searchedClass.markModified("genRatings");
  await searchedClass.save();
  console.log(searchedClass);
  return Response.json({ message: "Rating added successfully" });
}