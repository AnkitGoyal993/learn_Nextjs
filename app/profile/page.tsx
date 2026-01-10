"use client"

import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast' 

// import router from 'next/router'
export default function ProfilePage(){
    const router = useRouter()
    const [data,setData] = React.useState("nothing")
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

    const getUserDetails = async()=>{
        const res = await axios.get('/api/users/me')
        console.log(res.data);
        setData(res.data.data._id);
    }
    return (
        <div className=" flex flex-col items-center justify-center min-h-screen py-2">
            <h1>Profile</h1>
            <hr />
            <p>Profile Page</p>
            <h2 className='padding rounded bg-green-500 p-1'>{data === 'nothing'?"Nothing":<Link href={`/profile/${data}`}>{data}</Link>}</h2>
            <hr />
            <button onClick={onLogout} className=" bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 rounded-lg px-4 mt-4">Logout</button>
            <button onClick={getUserDetails} className=" bg-green-500 hover:bg-green-600 text-white font-bold py-2 rounded-lg px-4 mt-4">Get User Details</button>
        </div>
    )
}