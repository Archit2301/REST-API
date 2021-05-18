_______________________________________________________________________________

REST API Using Express

An API to provide a way to administer a school database that contains information about users and
courses. 

_______________________________________________________________________________

--Description

This is an application where users can interact with the database to create new course, update or
delete them. The user will be required to login using the correct username and password.


--Skills and Techniques
JavaScript, npm, Node.js, Express, SQLite. SQL ORM, Sequelize, REST API,
REST API Validation and Authentication, Data Relationship with SQL and Sequelize. 


--Process

Sequelize, sqlite3, bcryptjs, basic-auth and express dependecies are installed.

config/config.js file contains JSON to point to fsjstd-restapi.db database.

User Model created with firstName, lastName, emailAddress and password as attributes. The 
password is hashed and stored as encrypted.

Course Model created with title, description, estimatedTime and materialsNeeded. 

There is one-to-one association between Course and User and one-to-many association between
User and Course. 


--Steps to use this app

Step 1: Download the project zip file from the github repo.

Step 2: Unzip and extract the file contents.

Step 3: Open the project folder in an editor.

Step 4: Run the terminal and enter the command npm install.

Step 5: After installing all the project dependencies, run the command npm start. 

Step 6: Open any web browser and type http://localhost:5000 in the url.

Step 7: Use Postman or any relevant app to test the routes and status codes.