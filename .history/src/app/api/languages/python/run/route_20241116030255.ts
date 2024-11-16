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

const { exec } = require('child_process');
const path = require('path');
const fs = require('fs');

app.post('/api/languages/cpp/run', (req, res) => {
  const { code } = req.body;
  const filePath = path.join(__dirname, 'temp.cpp');
  
  // Write C++ code to a file
  fs.writeFileSync(filePath, code);

  // Compile the C++ code
  exec(`g++ ${filePath} -o ${path.join(__dirname, 'temp.out')}`, (compileErr, compileStdout, compileStderr) => {
    if (compileErr || compileStderr) {
      return res.status(500).json({
        success: false,
        message: 'Error compiling C++ code',
        error: compileStderr || compileErr,
      });
    }

    // Run the compiled program
    exec(`${path.join(__dirname, 'temp.out')}`, (runErr, runStdout, runStderr) => {
      if (runErr || runStderr) {
        return res.status(500).json({
          success: false,
          message: 'Error running C++ code',
          error: runStderr || runErr,
        });
      }

      res.json({
        success: true,
        message: 'Code executed successfully',
        data: runStdout,
      });
    });
  });
});
z