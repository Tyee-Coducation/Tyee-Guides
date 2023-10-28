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
        {showMenu && (
          <div className="dropdown">
            <Link href="/about" className="dropdown-item">
              About
            </Link>
            <Link href="/classesInfo" className="dropdown-item">
              Classes Info
            </Link>
            <Link href="/calendar" className="dropdown-item">
              Calendar
            </Link>
            <Link href="/faq" className="dropdown-item">
              Tyee FAQ
            </Link>

            {!session ? (
              <>
                <button onClick={() => signIn()} className="dropdown-item">
                  Login
                </button>
                <button onClick={() => signIn()} className="dropdown-item">
                  Signup
                </button>
              </>
            ) : (
              <>
                <button onClick={() => signOut()} className="dropdown-item">
                  Logout
                </button>
              </>
            )}
          </div>
        )}
        <Link href="/about" className="flex items-center">
          <Image src={logo} alt="The Tyee" width={50} height={50} />
          <h1 className="ml-2 text-lg">Tyee Guides</h1>
        </Link>
        <Link href="/classesInfo" className="navItem desktop">
          Classes Info
        </Link>
        <Link href="/calendar" className="navItem desktop">
          Calendar
        </Link>
        <Link href="/faq" className="navItem desktop">
          Tyee FAQ
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

