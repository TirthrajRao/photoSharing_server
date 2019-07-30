## Table Of Contents

- [About-this-project](#About-this-project)
- [Directory-Structure](#Directory-Structure)
- [Getting-Started](#Getting-Started)
- [Version-Control](#Version-Control)
- [Running-The-Project](#Running-The-Project)
- [Dependancies](#Dependancies)

## About This Project

### What is PHOTOSHARING?

    * PHOTOSHARING is a Social-media Application.

    * In PHOTOSHARING User can Create an Account.They Maintain their Profile With Profile Photo and Other Details Also. They Can Add,Edit,Delete Post ,They Can Like and Comment on their Friends Post as well as own post and Download post image of their Friends posts.Search hashtag and user,Follow-unfollow user,Share post with other user.
 

## Directory Structure

```
+-- /app [Node.js backend using express,Mongoose]
  +-- /controller
    +-- [Express controllers for the REST API]
  +-- /model
    +-- [Mongoose model]
  +-- /middleware
    +-- [For jwt token verification and fileupload]
  +-- /service
    +-- [Diffrent general-purpose services/utils that can be used in controllers or other parts of the API]
  +-- /validation
    +-- [validation using joi]
  +-- /routes
    +-- [Routing of api to controller]
  +-- /uploads
     +--[uploaded images]
  +-- /cofig.js [Secrect key]
  +-- /app.js [The main enrty point where the app is started/intialized]


```

## Getting started

  1. Install a git client.

  2. Install an IDE(like visual studio code),visual studio is recommended,beacuse it has        great Commandline integration and javascript building/debugging features.

  3. Install Nodejs 8.10.0 

  4. Install mongodb 3.6.3

  5. Add NODE_PATH TO environment variables with values /node_modules.

  6. Enter the project folder and run the following command to get all right files in the right place
     `npm install`

  7. Start Mongodb and Node js via commandline in visual studio code.

  8. Open the project in visual studio code.

  9. The apllication can be accessed locally at conected device at localhost:8081.

## Version control

* we use git for version control

## Running the project

1. Navigate to your local project root directory in the command line of your choice.

2. Start the mongodb server.

3. Run node app.js or u can use nodemon if u have installed it.

4. Open u r connected deevice and u should see the photoSharing app run locally on localhost:8081

## Dependancies

* Open package.json to see all development and production dependencies or run npm ls in the   project root directory for all installed dependencies


## What is Node-Js?

* Node.js is an open source server environment.
* Node.js is free.
* Node.js runs on various platforms (Windows, Linux, Unix, Mac OS X, etc.).
* Node.js uses JavaScript on the server.

## Node-Js version

```json
{
 "version": "8.10.0"
}
```

## What Can Node-js do?

* Node.js can generate dynamic page content.
* Node.js can create, open, read, write, delete, and close files on the server.
* Node.js can collect form data.
* Node.js can add, delete, modify data in your database.
  
### `node app.js`

* Runs the app this sever `node app.js`


## What is express?

* Express provides a minimal interface to build our applications. It provides us the tools that are required to build our app. It is flexible as there are numerous modules available on npm, which can   be directly plugged into Express.

## Express Framework version

```json
{
    "express": "~4.16.1"
}
```

## What is Body-parser?

* body-parser extract the entire body portion of an incoming request stream and exposes it on req.body. The middleware was a part of Express.js earlier but now you have to install it separately. This body-parser module parses the JSON, buffer, string and URL encoded data submitted using HTTP POST request.

## Body-Parser version

```json
{
     "body-parser": "^1.19.0"
}
```

## What is cors?

* CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.

## Cors version Use

```json
{
     "cors": "^2.8.5"
}
```

## What is Mongoose and Mongodb?

* MongoDB is an open-source, document database designed for ease of development and scaling. This database is also used to store data.

* Mongoose is a client API for node.js which makes it easy to access our database from our Express application.

## Mongoose version Use

```json
{
   "mongoose": "^5.5.7",
   "mongod": "^3.6.3"
}
```

## What is joi?

* joi is use for validation.

## Joi version Use

```json
{
  "joi": "^14.3.1"
}
```