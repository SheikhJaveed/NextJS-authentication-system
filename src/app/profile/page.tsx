"use client";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useEffect,useState } from "react";

export default function ProfilePage(){
    const router = useRouter();
    const [user,setUser] = useState<({_id:string;username:string;email:string;})| null>(null); //Inside the < >, we define the type of user

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await axios.get("/api/users/me",{withCredentials:true});
                console.log("User data",res.data);
                setUser(res.data.user);
            } catch (error:any) {
                console.log(error);
                toast.error(error.message);
                router.push("/login");
                
            }
        };
        fetchUser();
    },[])
    const logout = async () => {
        try {
            await axios.get("/api/users/logout",{withCredentials:true}); 
            toast.success("Logout successful");
            console.log("Logout successful");

            router.push("/login");
        } catch (error:any) {
            console.log(error);
            toast.error(error.message);
        }
    }
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-8 rounded-2xl shadow-xl transition-all">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Profile</h1>
                <h2 className="text-lg text-center text-gray-600 dark:text-gray-300 mb-6">User Details</h2>

                {user ? (
                    <div className="flex flex-col items-center space-y-4">
                        <div className="w-24 h-24 bg-blue-600 text-white rounded-full flex items-center justify-center text-3xl font-bold shadow-lg">
                            {user.username.charAt(0).toUpperCase()}
                        </div>
                        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white">{user.username}</h2>
                        <p className="text-gray-600 dark:text-gray-300">{user.email}</p>

                        <button
                            onClick={logout}
                            className="mt-6 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all shadow-lg w-full"
                        >
                            Logout
                        </button>
                    </div>
                ) : (
                    <p className="text-gray-500 dark:text-gray-400 text-lg text-center">Loading user details...</p>
                )}
            </div>
        </div>
    )
}