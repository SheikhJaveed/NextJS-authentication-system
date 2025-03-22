"use client";

import axios from "axios";
import { useState,useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ResetPasswordPage(){
    const [token,setToken] = useState("");
    const [newPassword,setNewPassword] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");

    const router = useRouter();

    //set token from url
    useEffect(() => {
        const urlToken = decodeURIComponent(window.location.search.split("=")[1] || ""); //token from url
        setToken(urlToken);
    },[])

    const resetPassword = async ()=>{
        try {
            const res = await axios.post('/api/users/resetpassword',{token,newPassword});
            setMessage(res.data.message);
            setError("");
            setTimeout(()=>router.push("/login"),3000);
        } catch (error:any) {
            setError(error.response.data.error);
            setMessage("");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-8 rounded-2xl shadow-xl">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-6">
                    Reset Password
                </h1>

                {message && <p className="text-green-500 text-center mb-4">{message}</p>}
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}

                <input 
                    className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                    type="password"
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                />

                <button 
                    className="w-full mt-4  bg-green-600 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg transition-all"
                    onClick={resetPassword}
                >
                    Reset Password
                </button>
            </div>
        </div>
    )
    
}