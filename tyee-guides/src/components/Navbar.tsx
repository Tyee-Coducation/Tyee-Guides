"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { getSession, signIn, signOut, useSession } from "next-auth/react";
import logo from "@public/logo.png";

export default function Navbar() {
  const { data: session } = useSession();
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };
  return (
    <>
      <nav className="bg-white shadow-lg p-4 flex items-center nav">
        <Image src={logo} alt="The Tyee" width={50} height={50} />
        <h1 className="ml-2 text-lg">Tyee Guides</h1>
        <Link href="/about" className="navItem desktop">
          About
        </Link>
        <Link href="/classesInfo" className="navItem desktop">
          Classes Info
        </Link>
        <Link href="/calendar" className="navItem desktop">
          Calendar
        </Link>
        {!session ? (
          <>
            <button
              onClick={() => signIn()}
              className="ml-auto mr-4 login desktop"
            >
              Login
            </button>
            <button onClick={() => signIn()} className="mr-4 signup desktop">
              Signup
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => signOut()}
              className="ml-auto mr-4 login desktop"
            >
              Logout
            </button>
          </>
        )}
        <button onClick={toggleMenu} className="ml-auto mr-4 menu mobile">
          <div className="menu-line"></div>
          <div className="menu-line"></div>
          <div className="menu-line"></div>
        </button>
      </nav>
    </>
  );
}
