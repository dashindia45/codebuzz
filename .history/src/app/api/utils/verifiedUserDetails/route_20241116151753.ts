// import connectDB from "@/database/dbConfig";
// import {getUserBySessionToken} from '@/models/userModel';
// import { NextResponse } from 'next/server'
// import type { NextRequest } from 'next/server'

// connectDB();

// export const GET = async (request: NextRequest) => {
//     try {

//         const token = request.cookies.get(process.env.TOKEN_NAME!)?.value || '';

//         const user = await getUserBySessionToken(token);

//         if (user) {
//             return NextResponse.json({user});
//         }
        
//     } catch (error) {
//         console.error(error);
//     }
    
// }

import connectDB from "@/database/dbConfig";
import { getUserBySessionToken } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

connectDB();

export const GET = async (request: NextRequest) => {
    try {
        const token = request.cookies.get(process.env.TOKEN_NAME!)?.value || "";
        if (!token) {
            return NextResponse.json(
                { error: "Token is missing or invalid." },
                { status: 401 }
            );
        }

        const user = await getUserBySessionToken(token);
        if (!user) {
            return NextResponse.json(
                { error: "User not found or session invalid." },
                { status: 404 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error("Error verifying user details:", error);
        return NextResponse.json(
            { error: "Internal Server Error" },
            { status: 500 }
        );
    }
};

