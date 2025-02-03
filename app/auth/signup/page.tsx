"use client";

import { signIn } from "next-auth/react";

export default function SignupPage() {
  const handleAuth0SignUp = () => {
    signIn("auth0", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Sign Up / Sign In with Auth0</h1>

      <button
        onClick={handleAuth0SignUp}
        className="bg-blue-500 text-white py-2 px-4 rounded-lg"
      >
        Sign Up / Log In with Auth0
      </button>
    </div>
  );
}
