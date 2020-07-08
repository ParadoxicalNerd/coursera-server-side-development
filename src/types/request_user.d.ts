// // declare global {
// //     namespace Express {
// //         interface Request {
// //             // Following properties are for the user model
// //             firstName?: string,
// //             lastName?: string,
// //             admin: boolean
// //         }
// //     }
// // }

// import { Express } from 'express-serve-static-core'
// declare module express-serve - static - core{
//     interface Request {
//         // Following properties are for the user model
//         interface User
//         firstName?: string,
//         lastName?: string,
//         admin: boolean
//     }
// }

class Context {
    firstName?: string
    lastName?: string
    admin: boolean
    username: string
    _id: object
}

declare namespace Express {
    interface Request {
        user: Context;
    }
}

