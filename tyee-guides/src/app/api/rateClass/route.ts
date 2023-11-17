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
  let className = data.className.replace('"', '');
  console.log(className);
  const searchedClass = await TyeeGuidesClass.findOne({ name: className });
  if (!searchedClass) {
    return Response.json({
      message: "Class not found",
    });
  }
  if (searchedClass.votedUsers.includes(session?.user?.email)) {
    return Response.json({
      message: "You have already voted for this class",
    });
  }
  searchedClass.ratings[data.overallRating] += 1;
  Object.keys(searchedClass.genRatings).forEach((key) => {
    if (data.genRatings[key]) {
      searchedClass.genRatings[key][0] += parseInt(data.genRatings[key]);
      searchedClass.genRatings[key][1] += 1;
    }
  });
  searchedClass.votedUsers.push(session?.user?.email);
  searchedClass.markModified("votedUsers");
  searchedClass.markModified("ratings");
  searchedClass.markModified("genRatings");
  await searchedClass.save();
  return Response.json({ message: "Rating added successfully" });
}
