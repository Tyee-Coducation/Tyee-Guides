"use client"

import { signIn } from "next-auth/react";

export default function LoginButton({className: className}) {
    return (
      <>
        <button onClick={() => signIn()} className={className}>
          Login
        </button>
      </>
    );
}
