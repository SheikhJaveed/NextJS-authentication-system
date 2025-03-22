import {connectToDB} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import { sendEmail } from "@/helpers/mailer"


connectToDB()

export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json()
        const {username,email,password} = reqBody
        console.log(reqBody);
        
        if(!username || !email || !password){
            return NextResponse.json({error:"Please fill all fields"},{status:400})
        }
        //check if user already exists
        const user = await User.findOne({email})

        if(user){
            return NextResponse.json({error:"User already exists"},{status:400})
        }

        //hash password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password,salt)

        const newUser = new User({
            username,
            email,
            password:hashedPassword
        })

        const savedUser = await newUser.save()

        //send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})
        
        return NextResponse.json({message:"User created successfully",savedUser},{status:201});

    }catch (error: unknown) {
    if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    
    return NextResponse.json({ error: "An unknown error occurred" }, { status: 500 });
}
}