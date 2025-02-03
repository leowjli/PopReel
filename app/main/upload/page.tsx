"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const UploadVideo = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);
    const [uploadSuccess, setUploadSuccess] = useState(false);

    const handleUpload = async () => {
        if (!file) {
            return alert("Please select a file");
        }

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            const data = await response.json();

            if (response.ok) {
                console.log("Upload Success:", data);
                setUploadSuccess(true);
                
                setTimeout(() => {
                    router.push("/");
                }, 2000);
            } else {
                console.error("Upload Failed:", data.error);
                alert(`Upload Failed: ${data.error}`);
            }
        } catch (error) {
            console.error("Upload Error:", error);
            alert("An error occurred while uploading.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center w-full min-h-screen">
            <input
                className="m-6"
                type="file"
                accept="video/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button
                className="bg-blue-500 text-white px-6 py-2 rounded-lg mt-4"
                onClick={handleUpload}
                disabled={loading || !session}
            >
                {loading ? "Uploading..." : "Upload Video"}
            </button>

            {uploadSuccess && (
                <p className="text-green-500 mt-4">
                    Upload successful! Redirecting...
                </p>
            )}
        </div>
    );
};

export default UploadVideo;