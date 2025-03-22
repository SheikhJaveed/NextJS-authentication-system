"use client";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProfilePage() {
    const router = useRouter();
    const params = useParams();
    const userId = params?.id as string;

    const [user, setUser] = useState<{ _id: string; username: string; email: string } | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get(`/api/users/profile/${userId}`, { withCredentials: true });
                setUser(res.data.user);
            } catch (error: any) {
                console.error(error);
                toast.error("User not found");
                router.push("/login"); // Redirect if user not found
            }
        };

        if (userId) {
            fetchUser();
        }
    }, [userId]);

    const logout = async () => {
        try {
            await axios.get("/api/users/logout", { withCredentials: true });
            toast.success("Logout successful");
            router.push("/login");
        } catch (error: any) {
            console.error(error);
            toast.error("Logout failed");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1 className="text-2xl font-bold">Profile</h1>

            {user ? (
                <div className="bg-white shadow-md rounded-lg p-6 mt-4 w-96 border border-gray-200">
                    <p className="text-lg"><strong>ID:</strong> {user._id}</p>
                    <p className="text-lg"><strong>Username:</strong> {user.username}</p>
                    <p className="text-lg"><strong>Email:</strong> {user.email}</p>
                </div>
            ) : (
                <p className="mt-4 text-gray-500">Loading user details...</p>
            )}

            <button 
                onClick={logout}
                className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
                Logout
            </button>
        </div>
    );
}
