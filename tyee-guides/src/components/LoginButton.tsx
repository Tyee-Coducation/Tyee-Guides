"use client";

import { signIn } from "next-auth/react";

export default function LoginButton({ className, text }) {
  return (
    <>
      <button onClick={() => signIn()} className={className}>
        {text ?? "Login"}
      </button>
    </>
  );
}
