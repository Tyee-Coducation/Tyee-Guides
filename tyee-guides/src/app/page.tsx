import LoginButton from "@components/LoginButton";

export default function Home() {
  return (
    <>
      <header className="hero">
        <div className="hero-content">
          <h1>Tyee Guides</h1>
          <p>
            Tyee Guides is a website for the community of students at Tyee. It
            is a place where students go to learn more about activities taking
            place, the classes they can take, and special events.
          </p>
        </div>
      </header>
      <main>
        <section className="fade">
          <h1 className="text-4xl">One website to make Tyee life easier</h1>
          <p className="mt-5 text-lg">
            Middle School can be very overwhelming to many people. Tyee Guides
            is here to make the experience so much less stressful. Tyee Guides
            was created by Max locke and William Liang, both 8th graders at
            Tyee. They realized how hard it was to find important information
            about Tyee, especially input from other students.
          </p>
        </section>
        <section className="fade">
          <div className="row">
            <div className="col">
              <h1 className="text-2xl">Classes</h1>
              <p className="mt-4 text-md">
                Tyee Guides has a list of all the classes you can take at Tyee.
                Each class has a description and a rating from other students.
              </p>
            </div>
            <div className="col ">
              <h1 className="text-2xl">Calendar</h1>
              <p className="mt-4 text-md">
                Tyee Guides has a public and collaborative calendar. Students
                can add events to the calendar and see what events are coming
                up.
              </p>
            </div>
            <div className="col ">
              <h1 className="text-2xl">FAQ about Tyee</h1>
              <p className="mt-4 text-md">
                Tyee Guides has a list of frequently asked questions about Tyee.
                Students can ask questions and get answers from other students.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h1 className="text-4xl mt-6">Join the community</h1>
          <p className="mt-5 text-lg">
            Tyee Guides is a community of students who want to make Tyee a
            better place. Join the community and make Tyee Guides better for
            everyone.
          </p>
          <LoginButton className="mt-6 loginButton" />
        </section>
      </main>
    </>
  );
}
