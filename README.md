# **GraphQL API**

# Description

An API for accessing music events, times, stage locations, and artist details.

---

## Features

> Available endpoints allow the user affordances for listing applications, stages, events, and their details; as well as a filter for finding events between given dates

---

# Install

    $ git clone https://github.com/Coffey-May/graphql-api
    $ cd graphQL-API
    $ yarn install
     or npm install

---

## Dependencies

    npm install express nodemon graphql graphql-express mongoose

---

## Use and Endpoints

### Query all apps

- The below example will query for a list of all apps:

```
    {
        apps{
            name
            id
        }
    }
```

- The resultant data will read:

```
    {
    "data": {
        "apps": [
        {
            "name": "HipHopFest 2020",
            "id": "6146511b48929a60151fbdfb"
        },
        {
            "name": "Classical Music Showcase",
            "id": "61466fc9bf635833f413eb45"
        }
        ]
    }
    }
```

### Query Cheat-sheet

> Within the folder structure of the project one can find a `testQueries.txt` file, which acts as a cheat sheet to copy and paste testable queries that meet the needs of the application within in the graphiql client.

#### Caveats

> Time format will be input as type: ISO, max-length 10 charachters; when utilizing the `eventsBetweenDates` query. However, when creating a new event `addEvent` or updating an event `updateEvent`, time formaat will be input as type Int.

---

## Requirements

For development, you will need Node.js and a node global package, Yarn, installed in your environement.

### Node

- #### Node installation on Windows

  Just go on [official Node.js website](https://nodejs.org/) and download the installer.
  Also, be sure to have `git` available in your PATH, `npm` might need it (You can find git [here](https://git-scm.com/)).

- #### Node installation on Ubuntu

  You can install nodejs and npm easily with apt install, just run the following commands.

      $ sudo apt install nodejs
      $ sudo apt install npm

- #### Other Operating Systems
  You can find more information about the installation on the [official Node.js website](https://nodejs.org/) and the [official NPM website](https://npmjs.org/).

If the installation was successful, you should be able to run the following command.

    $ node --version
    v8.11.3

    $ npm --version
    6.1.0

If you need to update `npm`, you can make it using `npm`! Cool right? After running the following command, just open again the command line and be happy.

    $ npm install npm -g

###

### Yarn installation

After installing node, this project will need yarn too, so just run the following command.

      $ npm install -g yarn

---

## Configure app

Create a .env file and apply your own environment variables

- A URL_CONNECTION variable, or your PORT of choice.
- A DB_CONNECTION variable for accessing 3rd party database ,i.e., MongoDb.

## Running the project

    $ npx nodemon app.js
