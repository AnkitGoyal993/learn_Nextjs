import {connect} from '@/dbConfig/dbConfig'
import User from '@/models/userModel'
import { NextRequest,NextResponse } from 'next/server'
import bcryptjs from 'bcryptjs'
import { sendEmail } from '@/helpers/mailer'


connect()
export async function POST(request:NextRequest){
    try {
        const {username,email,password} = await request.json()
         
        // check if useralready exists
        const user = await User.findOne({email})
        if(user){
            return NextResponse.json({error:"user already exists"},{status:400})
        }
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        }) 
        const savedUser = await newUser.save()
        console.log(savedUser)
        
        // send verification email

        await sendEmail({email,emailType:'VERIFY',userId:savedUser._id})

        return NextResponse.json({
            message:"user created successfully",
            success:true,
            savedUser,
        })
        
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}