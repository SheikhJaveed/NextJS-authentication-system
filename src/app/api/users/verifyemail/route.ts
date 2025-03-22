import { connectToDB } from "@/dbConfig/dbConfig";
import { NextRequest,NextResponse } from "next/server";
import User from "@/models/userModel";

connectToDB();

export async function POST(req: NextRequest) {
    try {
        const reqBody = await req.json(); 
        const {token} = reqBody;
        console.log(reqBody);
        console.log("Received token:",token);
        
        const user = await User.findOne({verifyToken:token,verifyTokenExpiry:{$gt:new Date()}})
        if(!user){
            return NextResponse.json({error:"Invalid or expired token"},{status:400});
        }
        console.log(user);
        console.log("Database token:", user.verifyToken); // Log database token
        console.log("Token expiry:", user.verifyTokenExpiry); //Log token expiry
    
        user.isVerfied = true; //Set the user as verified
        user.verifyToken = undefined;
        await user.save();
        
        return NextResponse.json({message:"Email verified successfully"},{status:200});
        
    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:400});
    }
}