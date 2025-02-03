"use client";

import { signIn } from "next-auth/react";

export default function LoginPage() {
  const handleAuth0SignIn = () => {
    signIn("auth0", { callbackUrl: "/" });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Login with Auth0</h1>

      <button onClick={handleAuth0SignIn} className="bg-blue-500 text-white py-2 px-4 rounded-lg">
        Login with Auth0
      </button>
    </div>
  );
}