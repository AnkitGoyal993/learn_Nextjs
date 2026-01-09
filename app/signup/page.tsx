"use client"
import Link from 'next/link'
import React from 'react'
import {useRouter} from 'next/navigation'
import axios from 'axios'
import {toast} from 'react-hot-toast'

export default function SignUp(){
    const router = useRouter();
    const [user,setUser] = React.useState({
        email:"",
        password:"",
        username:""
    })

    const [buttonDisabled,setButtonDisabled] = React.useState(false);
    const [loading,setLoading] = React.useState(false);
    const onSignUp = async() =>{
        try {
            setLoading(true)
            const response = await axios.post("/api/users/signup",user)
            console.log("signup success",response.data)
            router.push("/login");
        } catch (error:any) {
            console.log("Signup failed",error.message)
            toast.error(error.message)
        }finally{
            setLoading(false);
        }
    }

    React.useEffect(()=>{
        if(user.email.length>0 && user.username.length>0 && user.password.length>0){
            setButtonDisabled(false);
        
        }else{
            setButtonDisabled(true);
        }
    },[user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className=' text-2xl font-bold text-shadow-cyan-300'>{loading?"Processing":"Signup"}</h1>
            <hr />
            <label htmlFor="username">username</label>
            <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black' type="text" id='username' value={user.username} onChange={(e)=> setUser({...user,username:e.target.value})} placeholder='username' />
            <label htmlFor="email">email</label>
            <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black' type="text" id='email' value={user.email} onChange={(e)=> setUser({...user,email:e.target.value})} placeholder='email' />
            <label htmlFor="password">password</label>
            <input className='p-2 border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 bg-white text-black' type="password" id='password' value={user.password} onChange={(e)=> setUser({...user,password:e.target.value})} placeholder='password' />
            <button onClick={onSignUp} className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 '>{buttonDisabled?"NO Signup":"Signup"}</button>
            <Link href="/login">Visit login here</Link>
        </div>
    )
}