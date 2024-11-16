// import { NextRequest, NextResponse } from 'next/server'
// import connectDB from "@/database/dbConfig";
// import { updateUserById } from '@/models/userModel';


// connectDB();

// export const POST = async (req: NextRequest, res: NextResponse) => {
//     const data = await req.json();
//     const { favorite, index, user } = data;

//     try {
//         const updateObject: Record<string, any> = {};
//         updateObject[`problemList.${index}.favorite`] = favorite;



//         await updateUserById(user._id, updateObject);

//         const response = NextResponse.json({
//             message: "favorite Successfully",
//             success: true,
//         })

//         return response

//     } catch (error) {
//         console.log(error);
//         return error;
//     }
// }


import { NextRequest, NextResponse } from 'next/server'
import connectDB from "@/database/dbConfig";
import { updateUserById } from '@/models/userModel';

connectDB();

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { favorite, index, user } = data;

    try {
        // Prepare the update object for the favorite problem
        const updateObject: Record<string, any> = {};
        updateObject[`problemList.${index}.favorite] = favorite;

        // Update the user's problem list with the new favorite status
        await updateUserById(user._id, updateObject);

        // Return a success response
        return NextResponse.json({
            message: "Favorite updated successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);

        // Return an error response with status 500
        return NextResponse.json(
            { message: "Something went wrong", success: false },
            { status: 500 }
        );
    }
};