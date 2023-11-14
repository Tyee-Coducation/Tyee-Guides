import { connectToDataBase } from "@lib/db";
import TyeeGuidesClass from "@models/class";

export default async function ({ params }) {
  let { name } = params;
  name = name.split("%20").join(" ");
  await connectToDataBase();
  const classData = await TyeeGuidesClass.findOne({ name: name });
  if (classData) {
    let votes = 0;
    let talley = 0;
    Object.keys(classData.ratings).forEach((rating) => {
      console.log(parseInt(rating), classData.ratings[rating]);
      talley += parseInt(rating) * classData.ratings[rating];
      votes += classData.ratings[rating];
    });
    classData.average = talley !== 0 ? talley / votes : "No Votes";
  }
  return (
    <main>
      {classData ? (
        <>
          <h1 className="text-4xl">{classData.name}</h1>
          <p className="mt-2 text-lg">
            {classData.info} {classData.average}
          </p>
          <p className="mt-2 text-lg">{classData.teacher}</p>
          <p className="mt-2 text-lg">{classData.room}</p>
          <p className="mt-2 text-lg">{classData.classInfo}</p>
          <h1 className="mt-6 text-2xl">
            How would you rate {classData.name}?
          </h1>
          <form action="">
            <input name="rating"></input>
          </form>
        </>
      ) : (
        <div>
          <h1 className="text-6xl">404</h1>
          <p className="text-3xl mt-6">Class not found :(</p>
        </div>
      )}
    </main>
  );
}
