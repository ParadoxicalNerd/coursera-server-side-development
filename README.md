# coursera-server-side-development
I have made the following project as a part of the following course on Backend Developemnt: https://www.coursera.org/learn/server-side-nodejs/home/welcome
The project is a restarant menu app, where users can log in (authentication) using either their email ids or their google account, view dishes, add/edit comments. The app also has functionality for an admin user who can create dishes or make other users admin. There is also functionality to upload image files.

To use it, create a file called config.ts in src with the follwing contents (replace {} with appropriate info):

export default {
    url: {mongo db url},
    secretKey: {mongo db secret key},
    google: {
        clientID: {google client id},
        clientSecret: {google client secret}
    }
}