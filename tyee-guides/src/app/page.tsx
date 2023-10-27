import Image from "next/image";
import Navbar from "@components/Navbar";

export default function Home() {
  return (
    <>
      <Navbar />
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
        <h1 className="text-4xl">One website to make Tyee life easier</h1>
        <p className="mt-4 text-lg">
          Middle School can be very overwhelming to many people. Tyee Guides is
          here to make the experience so much less stressful. Tyee Guides was
          created by Max locke and William Liang, both 8th graders at Tyee. They
          realized how hard it was to find important information about Tyee,
          especially input from other students. 
        </p>
      </main>
    </>
  );
}
