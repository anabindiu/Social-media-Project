# Social-media-Project

Getting started 
------------------
To get the frotend running locally:
- Clone this repo 
- 'npm install' to install all required dependencies
- cd into Front_End and 'npm start' to start the local server (this project uses create-react-app)
- cd into api and 'node index.js' to start the API

Local web server will use port 3000. 

Making requests to the backend API
--------------------
Go into the api folder and inside the config file, change the host to the IP address present on your device. To check the ip address, go under command line prompt and type ipconfig. Copy the IPv4 address present in the command line and change the address under host to the new IPv4 address on your device. 

Functionaility overview 
----------------------
The application we created is a website that allows users to store their schedules, notes and task lists and create a way in which the user can solve compatibility and inconvenient issues by not separating these features among different applications. It uses a custom API for all requests, including authentication.

**General functionaility: **
- Authenticate users (login/signup pages + logout button on settings page)
- Create a personal task list with Title/Description/Location/Completion Status/Deadline
- Create a personal schedule with different Calendar Names where you can add events with Location/Description/Title/Start_date/End_date/Theme into each Calendar Name
- Create notes with Date/Title/Content
- Have a profile with Profile picture/Name/Birthday/Password/Username/Email. The profile is synced with the sign up/login page and saves the information from the login page to the profile page.
- Have settings with Notification/Country/Theme/Language/Time/Send report.
- Have a monthly statistics where we keep track of the amount of features we've added per month.
- Add friends/search friends.
- All features and pages are linked to the database such that every user will only be allowed to view/edit the information they've added. This information is saved and stored in local storage for each user.

**The general page breakdown looks like this:**
-Welcome page (URL: /welcome)
  - Link to sign up page
  - Link to login page
- Log in page (URL: /login)
  - Enter email/password
- Sign up page (URL: /signup)
  - Create a Name/Username/Email/Birthday/Password
- Profile (URL: /profile)
  - Have a Profile pic/Name/Email/Birthday/Password/Username
  - Edit Profile 
- Task List (URL: /tasklist)
  - Add task 
  - Edit task and its attributes
  - Complete task
  - Delete task
- Schedule (URL: /schedule)
  - Create event 
  - Delete event
  - Create a schedule
  - Add event to schedule
  - Remove event from schedule
- Notes (URL: /notes)
  - Add new note
  - Delete note
  - Edit note
- Settings (URL: /settings)
  - Notification/Country/Theme/Language/Time
  - Send report
- Friends (URL: /friends)
  - Add new friend
  - Search friends
- Statistics (URL: /statistics)
  - Show statistics for each month and every year
