// import { NextRequest, NextResponse } from 'next/server';
// import { PythonShell } from 'python-shell';

// export const POST = async (req: NextRequest, res: NextResponse) => {
//     const data = await req.json();

//     const { code } = data;
//     // console.log(code);

//     try {
//         const message = await PythonShell.runString(code)
//         const response = NextResponse.json({
//             data: message,
//             message: "Compilation Finished",
//             success: true,
//         })

//         return response;

//     } catch (error: any) {
//         const response = NextResponse.json({
//             data: null,
//             message: 'Error during compilation',
//             success: false,
//             status: error.status,
//             error: error.message,
//         });

//         return response;
//     }



// }
import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import fs from 'fs';
import path from 'path';

export const POST = async (req: NextRequest) => {
    const data = await req.json();
    const { code } = data;

    // File paths for temporary C++ file and executable
    const cppFilePath = path.join(process.cwd(), 'temp.cpp');
    const executablePath = path.join(process.cwd(), 'temp.exe');

    try {
        // Write the C++ code to a temporary file
        fs.writeFileSync(cppFilePath, code);

        // Compile the C++ code
        const compileCommand = `gcc ${cppFilePath} -o ${executablePath}`;
        await new Promise((resolve, reject) => {
            exec(compileCommand, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                } else {
                    resolve(stdout);
                }
            });
        });

        // Run the compiled executable
        const runCommand = executablePath;
        const output = await new Promise((resolve, reject) => {
            exec(runCommand, (error, stdout, stderr) => {
                if (error) {
                    reject(new Error(stderr || error.message));
                } else {
                    resolve(stdout);
                }
            });
        });

        // Clean up temporary files
        fs.unlinkSync(cppFilePath);
        fs.unlinkSync(executablePath);

        // Return the output
        return NextResponse.json({
            data: output,
            message: "Execution successful",
            success: true,
        });

    } catch (error) {
        // Clean up files in case of an error
        if (fs.existsSync(cppFilePath)) fs.unlinkSync(cppFilePath);
        if (fs.existsSync(executablePath)) fs.unlinkSync(executablePath);

        return NextResponse.json({
            data: null,
            message: 'Error during execution',
            success: false,
            // error: error.message,
        });
    }
};

