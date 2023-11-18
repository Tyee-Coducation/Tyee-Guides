import { connectToDataBase } from "@lib/db";
import TyeeGuidesClass from "@models/class";
import RateClass from "@components/RateClass";
import { getServerSession } from "next-auth";
import LoginButton from "@components/LoginButton";
import styles from "@styles/Class.module.css";

export default async function ClassComponent({ params }) {
  const session = await getServerSession();
  let { name } = params;
  name = name.split("%20").join(" ");
  await connectToDataBase();
  const classData = await TyeeGuidesClass.findOne({ name: name });
  if (!classData)
    return (
      <main>
        <div>
          <h1 className="text-6xl">404</h1>
          <p className="text-3xl mt-6">Class not found :(</p>
        </div>
      </main>
    );
  let votes = 0;
  let talley = 0;
  Object.keys(classData.ratings).forEach((rating) => {
    talley += parseInt(rating) * classData.ratings[rating];
    votes += classData.ratings[rating];
  });
  classData.average =
    talley !== 0 ? Math.round((talley * 10) / votes) / 10 : "No Votes";
  let stars = [];
  for (let i = 0; i < 5; i++) {
    let width;
    if (classData.average - i >= 1) {
      width = "100%";
    } else if (i > classData.average) {
      width = "0%";
    } else {
      width = `${(classData.average - i) * 100}%`;
    }
    stars.push(
      <span style={{ "--width": width }} className={styles.icon}>
        ★
      </span>
    );
  }
  return (
    <main>
      <>
        <h1 className="text-4xl">{classData.name}</h1>
        <p className="mt-2 text-lg">
          {classData.average} {classData.average !== "No Votes" && stars}
        </p>
        <p className="mt-2 text-lg">{classData.teacher}</p>
        <p className="mt-2 text-lg">{classData.classRoom}</p>
        <p className="mt-2 text-lg">{classData.classInfo}</p>
        {session ? (
          <>
            <h1 className="mt-6 text-2xl">
              How would you rate {classData.name}?
            </h1>
            {!classData.votedUsers.includes(session?.user?.email) ? (
              <RateClass name={classData.name} />
            ) : (
              <>
                <h1>You&apos;ve already voted for this class</h1>
              </>
            )}
          </>
        ) : (
          <>
            <h1 className="mt-4 text-2xl">You must be logged in to vote</h1>
            <LoginButton className={styles.submit} />
          </>
        )}
      </>
    </main>
  );
}
