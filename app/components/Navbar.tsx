"use client";

import { signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

  return (
    <nav className="w-full bg-gray-900 text-white p-4">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <Link href="/" className="text-2xl font-bold">
          PopReel
        </Link>

        <div className="flex items-center gap-6">
          <AuthContent />
        </div>
      </div>
    </nav>
  );
}

function AuthContent() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return session ? (
    <div className="flex items-center gap-4">
      <p>Welcome, {session.user?.name}</p>
      <button
        onClick={() => signOut({ callbackUrl: "/" })}
        className="bg-red-500 px-4 py-2 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  ) : (
    <Link href="/auth/login">
      <button className="bg-blue-500 px-4 py-2 rounded-lg">
        Sign In
      </button>
    </Link>
  );
}