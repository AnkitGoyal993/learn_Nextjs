"use client"

import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast' 

// import router from 'next/router'
export default function ProfilePage(){
    const router = useRouter()
    const onLogout = async()=>{
        try {
            const response = await axios.get("/api/users/logout")
            console.log("logout success",response.data)
            toast.success("Logout successfully")
            router.push("/login");
            
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error:any) {
            console.log("logout failed",error.message)
            toast.error(error.message)
        }
    }
    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <hr />
            <button onClick={onLogout} className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg px-4 mt-4">Logout</button>
        </div>
    )
}