import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken'
connect()

export async function POST(request:NextRequest){
    try {
        const {email,password} = await request.json()

        const user = await User.findOne({email})
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:400})
        }

        const checkedPassword = await bcryptjs.compare(password,user.password)

        if(!checkedPassword){
            return NextResponse.json({error:"password doesn't matched"},{status:400})
        }

        const tokenData = {
            id:user._id,
            username:user.username,
            email:user.email
        }

        const token = await jwt.sign(tokenData,process.env.JWT_SECRET_KEY!,{expiresIn:"1d"})
        console.log("token",token )
        const response = NextResponse.json({
            message:"Login successfully",
            success:true,
        })
        response.cookies.set("token",token,{httpOnly:true,})
        return response;
         
    } catch (error:unkown) {
        return NextResponse.json({error:error.message},{status:500})
    }
}