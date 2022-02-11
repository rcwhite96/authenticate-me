## Intro

Hello! Welcome to YarnNotes, a clone of Evernote to keep track of all your fiber arts project and ideas. Continue reading to see how to access the live site, or clone it locally.

## Live Site

https://yarnnotes.herokuapp.com/

# Technologies Used

<img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge"/> <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white"/> <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white"/> <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white"/> <img src="https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white"/>

## Features

https://github.com/rcwhite96/yarnnotes/wiki/MVP-Features-List

## Database Schema

https://github.com/rcwhite96/yarnnotes/wiki/Database-Schema

## Setting Up Local Use

1. Clone the repo from GitHub.

2. Open the root folder in VSCode.

3. Run NPM install in the frontend and backend directories to install all dependencies.

4. Create a .env, and copy the .env.example file into it.

5. Create a user in Postgres with the username and password set in your .env file, with CREATEDB.

6. To create your database, run the command: npx dotenv sequelize db:create.

7. To migrate the database, run the command: npx dotenv sequelize db:migrate.

8. To seed the database, run the command: npx dotenv sequelize db:seed:all

9. Open a second terminal. In one, go into the backend directory and run npm start. In the other, go into the frontend directory and run npm start. This should start up both servers and open the app in your browser.

## Future Features

- Users can view a single note.
- Users can add photos/files to their own notes.
- Options for more crafts: cross-stitch, embroidery, weaving, etc.
