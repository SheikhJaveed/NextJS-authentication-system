import { NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectToDB();

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        console.log("Received request for user ID:", params.id);
        
        if (!params.id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }
        const user = await User.findById(params.id).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
}
