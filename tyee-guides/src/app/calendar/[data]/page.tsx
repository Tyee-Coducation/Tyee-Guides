import Navbar from "@components/Navbar";
import { connectToDataBase } from "@lib/db";
import TyeeGuidesWeek from "@models/week";

export default async function Calendar({ params }) {
  let { data } = params;
  data = data.split("%20").join(" ");
  await connectToDataBase();
  const week = await TyeeGuidesWeek.findOne({ week: data });
  return (
    <>
      <Navbar />
      <h1 className="mt-4 text-3xl">Calendar</h1>

    </>
  );
}
