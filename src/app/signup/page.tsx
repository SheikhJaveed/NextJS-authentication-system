"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SignUpPage() {
    const router = useRouter();
    const [user,setUser] = React.useState({
        email: "",
        password: "",
        username:""
    })
    const [buttonDisabled,setButtonDisabled] = React.useState(false) //disable button if any of the fields are empty
    const [loading,setLoading] = React.useState(false)
    const onSignUp = async () => {
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user);
            console.log("Signup success",response.data);
            router.push("/login")
            
        } catch (error:any){
            console.log("Signup failed",error.message)
            toast.error(error.message)
            
        }finally{
            setLoading(false)
        }
    }

    useEffect(() => {
        if(user.email.length>0 && user.password.length>0 && user.username.length>0){
            setButtonDisabled(false)  
        }else{
            setButtonDisabled(true) 
        }
    },[user])
    
    return(
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-blue-950 p-4">
    <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-lg dark:bg-black dark:text-white">
        <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-6">
            {loading ? "Processing..." : "Sign Up"}
        </h1>
        <div className="space-y-4">
            <div>
                <label htmlFor="username" className="block text-gray-700 dark:text-gray-300">Username</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    id="username"
                    type="text"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                    placeholder="Enter your username"
                />
            </div>
            <div>
                <label htmlFor="email" className="block text-gray-700 dark:text-gray-300">Email</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    id="email"
                    type="email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-gray-700 dark:text-gray-300">Password</label>
                <input 
                    className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-black dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                    id="password"
                    type="password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                    placeholder="Enter your password"
                />
            </div>
            <button 
                onClick={onSignUp} 
                className={`w-full p-2 text-white rounded-lg transition duration-300 ${buttonDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-green-500 hover:bg-indigo-500"}`}
                disabled={buttonDisabled}
            >
                {buttonDisabled ? "Complete all fields" : "Sign Up"}
            </button>
            <p className="text-center text-gray-600 dark:text-gray-400">
                Already have an account? 
                <Link href="/login" className="text-blue-500 hover:underline ml-1">Login</Link>
            </p>
        </div>
    </div>
</div>

    )
}