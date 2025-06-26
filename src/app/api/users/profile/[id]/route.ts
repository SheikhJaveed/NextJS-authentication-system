import { NextResponse } from "next/server";
import { connectToDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";

connectToDB();

export async function GET(req: Request, context: { params: { id: string } }) {
    try {
        const { id } = context.params;
        console.log("Received request for user ID:", id);

        if (!id) {
            return NextResponse.json({ error: "Invalid ID" }, { status: 400 });
        }

        const user = await User.findById(id).select("-password");

        if (!user) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ user }, { status: 200 });
    } catch (error) {
        console.error("Error fetching user:", error);
        return NextResponse.json({ error: "Invalid user ID" }, { status: 400 });
    }
}
