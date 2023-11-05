import logo from "@public/logo.png";
import maxlogo from "@public/maxlogo.png";
import williamlogo from "@public/williamlogo.png";
import styles from "@styles/About.module.css";
import Image from "next/image";
import LoginButton from "@components/LoginButton";

export default function About() {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.introText}>
          <h1 className="text-5xl mt-6">Helping Students At Tyee</h1>
          <p className="text-xl mt-8 max-w-xl">
            We are a two-person team supporting tyee middle school students
            particularly 6th graders moving to middle school. Our Websites also
            aids all students at Tyee.
          </p>
          <LoginButton className="mt-8 loginButton" text="Join now" />
        </div>
        <div className={styles.introImage}>
          <Image
            src={logo}
            alt="Tyee Guides Logo"
            style={{ width: "90%", maxWidth: "500px" }}
            className="mt-8"
          />
        </div>
        <h1 className="mt-8 text-5xl basis-full">Our Beliefs</h1>
        <div className="basis-80 mt-12 grow p-6 shadow-lg mr-4 rounded-md">
          <h1 className="text-3xl">Minimizing Stress</h1>
          <p className="mt-6 text-lg">
            We know that middle school can be very stressful. We want to make it
            easier for students to find information about Tyee.
          </p>
        </div>
        <div className="basis-80 mt-12 grow p-6 shadow-lg mr-4 rounded-md">
          <h1 className="text-3xl">Helping Others</h1>
          <p className="mt-6 text-lg">
            We want to create a community of students who help each other enjoy
            middle school. We believe that students when working together help
            everyone.
          </p>
        </div>
        <div className="basis-80 mt-12 grow p-6 shadow-lg rounded-md">
          <h1 className="text-3xl">Making Life Easier</h1>
          <p className="mt-6 text-lg ">
            There is no reason students to struggles to find information about
            Tyee. We want to make it easier for students to find information
            about Tyee, so they can spend more time enjoying middle school.
          </p>
        </div>
      </div>
    </>
  );
}
