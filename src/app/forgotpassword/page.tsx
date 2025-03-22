"use client";

import axios from "axios";
import { useState,useEffect } from "react";


export default function ForgotPasswordPage(){
    const [email,setEmail] = useState("");
    const [message,setMessage] = useState("");
    const [error,setError] = useState("");


    const handleForgotPassword = async ()=>{
        try {
            const res = await axios.post('/api/users/forgotpassword',{email});
            setMessage(res.data.message);
            setError("");
        } catch (error:any) {
            setError(error.response.data.error);
            setMessage("");
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-8 rounded-2xl shadow-xl transition-all">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Forgot Password</h1>
                
                {message && <p className="text-green-600 text-center font-semibold bg-green-100 dark:bg-green-800 p-2 rounded-lg">{message}</p>}
                {error && <p className="text-red-600 text-center font-semibold bg-red-100 dark:bg-red-800 p-2 rounded-lg">{error}</p>}

                <div className="mt-4">
                    <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium mb-2">Enter your email</label>
                    <input
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:text-white bg-gray-100 dark:bg-gray-800"
                        type="email"
                        id="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>

                <button
                    className="w-full mt-4 bg-green-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-all"
                    onClick={handleForgotPassword}
                >
                    Send Reset Password Link
                </button>
            </div>
        </div>
    )
    
}