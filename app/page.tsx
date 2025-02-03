"use client";

import Navbar from "./components/Navbar";
import FeedPage from "./main/feed/page";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <Navbar />
      <div className="w-full h-full justify-items-center p-4 mt-8">
        <h1 className="text-3xl font-bold text-center mb-4">Welcome to Pop Reel</h1>

        {/* Upload Button */}
        <div className="text-center mb-4">
          <Link href="/main/upload">
            <button className="bg-green-500 text-white py-2 px-4 rounded-lg">
              Upload Video
            </button>
          </Link>
        </div>

        {/* Display FeedPage Component */}
        <FeedPage />
      </div>
    </div>
  );
}
