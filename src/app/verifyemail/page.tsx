"use client";

import axios from "axios";
import Link from "next/link";
import React,{useState,useEffect} from "react";

export default function VerifyEmailPage(){
    const [token,setToken] = useState("");
    const [verified,setVerified] = useState(false);
    const [error,setError] = useState(false);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail",{token});
            setVerified(true);
        } catch (error:any) {
            setError(true);
            console.log(error.response.data);
        }
    }
    
    useEffect(() => {
        const urlToken = decodeURIComponent(window.location.search.split("=")[1] || "");
        setToken(urlToken);
    }, []);

    useEffect(()=>{
        if(token.length>0){
            verifyUserEmail();
        }
    },[token])

    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-950 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-900 dark:text-white p-8 rounded-2xl shadow-xl transition-all">
                <h1 className="text-3xl font-bold text-center text-gray-800 dark:text-white mb-4">Verify Email</h1>

                {token ? (
                    <p
                        className="text-center text-sm bg-orange-500 text-black font-semibold p-2 rounded-lg"
                        style={{
                            wordBreak: "break-all",
                            overflowWrap: "break-word",
                            maxWidth: "90%",
                            margin: "0 auto", // Center the paragraph
                        }}
                    >
                        Token: {token}
                    </p>
                ) : (
                    <p className="text-center text-red-500">No token provided.</p>
                )}

                {verified ? (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-green-600">✅ Email Verified Successfully!</h2>
                        <Link
                            href="/login"
                            className="mt-4 inline-block bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-all"
                        >
                            Proceed to Login
                        </Link>
                    </div>
                ) : error ? (
                    <div className="mt-6 text-center">
                        <h2 className="text-xl font-semibold text-red-600">❌ Verification Failed!</h2>
                        <p className="text-gray-500 dark:text-gray-300 mt-2">Invalid or expired token.</p>
                        <Link
                            href="/signup"
                            className="mt-4 inline-block bg-gray-700 hover:bg-gray-800 text-white font-bold py-2 px-6 rounded-lg transition-all"
                        >
                            Try Again
                        </Link>
                    </div>
                ) : (
                    <p className="text-gray-600 dark:text-gray-300 text-center mt-4">Verifying email...</p>
                )}
            </div>
        </div>
    )
}