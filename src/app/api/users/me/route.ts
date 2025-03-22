import { NextRequest, NextResponse } from "next/server";
import  jwt  from "jsonwebtoken";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectToDB();

export  async function GET( request:NextRequest){
    try {
        const token = request.cookies.get("token")?.value || "";

        if(!token){
            return NextResponse.json({error:"Unauthorized"},{status:401})
        }

        //verify and decode JWT
        const secretKey = process.env.TOKEN_SECRET!;
        const decodedToken = jwt.verify(token,secretKey) as {id:string,username:string,email:string};
        console.log(decodedToken);
        
        //find user by id
        const user = await User.findById(decodedToken.id).select("-password");

        if(!user){
            return NextResponse.json({error:"User not found"},{status:404})
        }

        return NextResponse.json({user},{status:200})

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:401});
    }
}