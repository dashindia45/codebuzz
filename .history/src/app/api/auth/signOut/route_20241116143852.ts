// import { NextResponse } from "next/server";

// export const GET = async (res: NextResponse) =>{
//     try {
        
//         const response = NextResponse.json({
//             message: "LogOut Successfully",
//             success: true
//         });

//         response.cookies.set(process.env.TOKEN_NAME!, "", {
//             httpOnly: true,
//             expires: new Date(0)
//         });

//         return response;

//     } catch (error) {
//         console.log(error);
//     }
// }
import { NextRequest, NextResponse } from "next/server";

export const GET = async (req: NextRequest) => {
    try {
        // Create a response
        const response = NextResponse.json({
            message: "LogOut Successfully",
            success: true,
        });

        // Set the cookie to expire
        response.cookies.set(process.env.TOKEN_NAME || "token", "", {
            httpOnly: true,
            expires: new Date(0),
        });

        return response;
    } catch (error) {
        console.error("Error in signOut route:", error);

        // Handle errors gracefully
        return NextResponse.json(
            { message: "Something went wrong", success: false },
            { status: 500 }
        );
    }
};