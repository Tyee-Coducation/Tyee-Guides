import { connectToDataBase } from "@lib/db";
import QuizGeniusWeek from "@models/week";

function generateWeeks(startDate: Date, endDate: Date) {
  const weeks: object = {};
  const current = new Date(startDate);

  while (current <= endDate) {
    const weekStart = new Date(current);
    weekStart.setDate(weekStart.getDate() - weekStart.getDay()); // Move to the previous Monday

    const weekEnd = new Date(weekStart);
    weekEnd.setDate(weekEnd.getDate() + 6); // Move to the following Sunday

    const weekLabel = `${weekStart.toISOString().split("T")[0]} - ${
      weekEnd.toISOString().split("T")[0]
    }`;

    weeks[weekLabel] = {};

    for (let i = 0; i < 7; i++) {
      const day = new Date(weekStart);
      day.setDate(weekStart.getDate() + i);
      const dayLabel = day.toISOString().split("T")[0];
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
