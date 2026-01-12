/* eslint-disable @typescript-eslint/no-explicit-any */

import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import { sendEmail } from '@/helpers/mailer'

connect()

export async function POST(request:NextRequest){
    try {
        const {email} = await request.json();
        if(!email){
            return NextResponse.json({error:"Email is required"},{status:400})
        }

        const user = await User.findOne({email});
        console.log("inside of frogot password")
        if(!user){
            return NextResponse.json({error:"User does not exists"},{status:404})
        }
        
        await sendEmail({email:user.email,emailType:'FORGOT',userId:user._id})
        return NextResponse.json({
            message:"password reset email sent",
            success:true
        })
    } catch (error:any) {
        return NextResponse.json(
        { error: error.message },
        { status: 500 }
        );
    }
}