/* eslint-disable @typescript-eslint/no-explicit-any */

"use client"

import { useState } from "react";
import axios from 'axios'
export default function ForgotPasswordPage(){

    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const handleSubmit = async () => {
        try {
            const response = await axios.post('/api/users/forgot-password',{email})
            console.log("Password change successfully")
            setMessage("Request for forgot passwrod is accepted")
        } catch (error:any) {
            console.log("password forgot failed ",error.message);
            setMessage("request for password forgot is failed")
        }
    };
    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <h1 className="text-2xl font-bold">Forgot Password</h1>

        <input
            type="email"
            placeholder="Enter your email"
            className="border p-2 rounded w-64"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
        />

        <button
            onClick={handleSubmit}
            className="bg-black text-white px-4 py-2 rounded hover:cursor-pointer"
        >
            Send Reset Link
        </button>

        {message && <p>{message}</p>}
        </div>
    )
}