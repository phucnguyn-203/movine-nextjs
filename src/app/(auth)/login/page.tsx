"use client";

import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LoginPage() {
    const router = useRouter();
    const provider = new GoogleAuthProvider();

    const handleGoogleLogin = async () => {
        try {
            await signInWithPopup(auth, provider);
            toast.success("Successfully logged in!");
            router.push("/");
        } catch (error) {
            toast.error("Failed to login. Please try again.");
            console.error("Login error:", error);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black">
            <div className="max-w-md w-full space-y-8 p-8 bg-gray-900 rounded-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
                        Sign in to your account
                    </h2>
                </div>
                <div>
                    <button
                        onClick={handleGoogleLogin}
                        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Sign in with Google
                    </button>
                </div>
            </div>
        </div>
    );
}
