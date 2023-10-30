import { connectToDataBase } from "@lib/db";
import QuizGeniusWeek from "@models/week";

const months = {
  1: "January",
  2: "February",
  3: "March",
  4: "April",
  5: "May",
  6: "June",
  7: "July",
  8: "August",
  9: "September",
  10: "October",
  11: "November",
  12: "December",
};

function generateWeeks(startDate: Date, endDate: Date) {
  const weeks: object = {};
  const current = new Date(startDate);
  current.setDate(startDate.getDate() - startDate.getDay() + 1); // Move to the Monday of the selected week

  while (current <= endDate) {
    const weekStart = new Date(current);

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekStart.getDate() + 6); // Move to the following Sunday

    const weekLabel = `${
      months[weekStart.getMonth() + 1]
    } ${weekStart.getDate()}, ${weekStart.getFullYear()} to ${
      months[weekEnd.getMonth() + 1]
    } ${weekEnd.getDate()}, ${weekEnd.getFullYear()}`;

    weeks[weekLabel] = {};

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dayLabel = `${
        months[day.getMonth() + 1]
      } ${day.getDate()}, ${day.getFullYear()}`;
      weeks[weekLabel][dayLabel] = {
        day: day.getDate(),
        month: day.getMonth() + 1,
        year: day.getFullYear(),
        events: [],
      };
    }

    current.setDate(current.getDate() + 7); // Move to the next week
  }

  return weeks;
}

export async function POST(req: Request) {
  const data = await req.json();
  if ((data.password = process.env.ADMIN_PASSWORD)) {
    await connectToDataBase();
    try {
      const startDate = new Date(2023, 9, 28); // October 28, 2023
      const endDate = new Date(2024, 5, 18); // June 18, 2024

      const weeksObject = generateWeeks(startDate, endDate);
      Object.keys(weeksObject).forEach(async (week) => {
        const saveWeek = new QuizGeniusWeek({
          days: weeksObject[week],
          week: week,
        });
        await saveWeek.save();
      });
      return Response.json("success");
    } catch (error) {
      console.error(error);
      return Response.json(error);
    }
  }
}
