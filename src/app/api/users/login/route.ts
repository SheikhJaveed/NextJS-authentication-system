import {connectToDB} from "@/dbConfig/dbConfig"
import User from "@/models/userModel"
import { NextRequest,NextResponse } from "next/server"
import bcryptjs from "bcryptjs"
import jwt from "jsonwebtoken"

connectToDB()

export async  function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,password} = reqBody;
        if(!email || !password){
            return NextResponse.json({error:"Please fill all fields"},{status:400})
        }
        const user = await User.findOne({email});
        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        //check if password is correct
        const validPassword = await bcryptjs.compare(password,user.password);
        if(!validPassword){
            return NextResponse.json({error:"Invalid password"},{status:400})
        }
        
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!,{"expiresIn":"1d"});

        const response = NextResponse.json({
            message:"Login successful",
            token
        },{status:200})
        
        response.cookies.set("token",token,{
            httpOnly: true
        })
        return response;
        
    }catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}