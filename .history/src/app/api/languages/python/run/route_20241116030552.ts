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

  const filePath = path.join(__dirname, 'temp.cpp');
  const outputPath = path.join(__dirname, 'temp.out');
  
  // Step 1: Write C++ code to a temporary file
  fs.writeFileSync(filePath, code);

  return new Promise((resolve) => {
    // Step 2: Compile the C++ code
    exec(`g++ ${filePath} -o ${outputPath}`, (compileErr, compileStdout, compileStderr) => {
      if (compileErr || compileStderr) {
        const response = NextResponse.json({
          data: null,
          message: 'Error during compilation',
          success: false,
          error: compileStderr 
        //   || compileErr.message,
        });
        return resolve(response);
      }

      // Step 3: Run the compiled C++ program
      exec(outputPath, (runErr, runStdout, runStderr) => {
        if (runErr || runStderr) {
          const response = NextResponse.json({
            data: null,
            message: 'Error during execution',
            success: false,
            error: runStderr 
            // || runErr.message,
          });
          return resolve(response);
        }

        // Step 4: Return the output of the C++ program
        const response = NextResponse.json({
          data: runStdout,
          message: 'Compilation and execution finished',
          success: true,
        });
        return resolve(response);
      });
    });
  });
};
