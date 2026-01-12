/* eslint-disable @typescript-eslint/no-explicit-any */
import {connect} from '@/dbConfig/dbConfig'
import { NextRequest,NextResponse } from 'next/server'
import User from '@/models/userModel'
import bcryptjs from 'bcryptjs'

connect()

export async function POST(request:NextRequest){
    try {
        const {token,password} = await request.json()
        if (!token || !password) {
            return NextResponse.json(
                { error: "Token and password are required" },
                { status: 400 }
            );
        }

        const user = await User.findOne({
            forgotPasswordToken:token,
            forgotPasswordExpire:{$gt:Date.now()}
        })
        if (!user) {
            return NextResponse.json(
                { error: "Invalid or expired token" },
                { status: 400 }
            );
        }

        const hashedPassword = await bcryptjs.hash(password,10);

        user.password = hashedPassword
        user.forgotPasswordToken = undefined
        user.forgotPasswordExpire = undefined

        await user.save()
        return NextResponse.json({
            message:'password reset successfully',
            success:true
        })
    } catch (error:any) {
        return NextResponse.json({
            error:error.message
        },{
            status:500
        })
    }
}