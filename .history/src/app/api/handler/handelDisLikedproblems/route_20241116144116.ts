// import { NextRequest, NextResponse } from 'next/server'
// import connectDB from "@/database/dbConfig";
// import { getUserById, updateUserById } from '@/models/userModel';


// connectDB();

// export const POST = async (req: NextRequest, res: NextResponse) => {
//     const data = await req.json();
//     const { disLike, index, user } = data;

//     try {

//         const updateObject: Record<string, any> = {};
//         updateObject[`problemList.${index}.dislike`] = disLike;
//         await updateUserById(user._id, updateObject);


//         const updatedUser = await getUserById(user._id);

//         const dislikedProblems = updatedUser.problemList.filter((problem: any) => problem.dislike === true)

//         await updateUserById(user._id, {totalDisLikes: dislikedProblems.length});
        

//         const response = NextResponse.json({
//             message: "DisLiked Successfully",
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
import { getUserById, updateUserById } from '@/models/userModel';

connectDB();

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { disLike, index, user } = data;

    try {
        // Prepare the update object for the disliked problem
        const updateObject: Record<string, any> = {};
        updateObject[`problemList.${index}.dislike] = disLike;

        // Update the user's problem list
        await updateUserById(user._id, updateObject);

        // Retrieve the updated user data
        const updatedUser = await getUserById(user._id);

        // Calculate the total disliked problems
        const dislikedProblems = updatedUser.problemList.filter((problem: any) => problem.dislike === true);

        // Update the total dislikes
        await updateUserById(user._id, { totalDisLikes: dislikedProblems.length });

        // Return the success response
        return NextResponse.json({
            message: "Disliked Successfully",
            success: true,
        });

    } catch (error) {
        console.error(error);
        
        // Return an error response
        return NextResponse.json(
            { message: "Something went wrong", success: false },
            { status: 500 }
        );
    }
};