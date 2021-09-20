# GraphQL API

## Description

An API for accessing music events, times, stage locations, and artist details.

---

## Features

Available endpoints allow the user affordances for listing applications, stages, events, and their details; as well as a filter for finding events between given dates

---

## Install

    $ git clone https://github.com/Coffey-May/graphql-api
    $ cd graphQL-API
    $ yarn install or npm install

---

## Dependencies

---

## Use and Endpoints

#### 1.

List all of the apps. Query in the graphiql client for retrieving a list of all apps is as follows.

    {
        apps{
            name
            id
        }
    }

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

## Install

    $ git clone https://github.com/Coffey-May/graphql-api
    $ cd graphQL-API
    $ yarn install

## Configure app

Open `a/nice/path/to/a.file` then edit it with your settings. You will need:

- A setting;
- Another setting;
- One more setting;

## Running the project

    $ yarn start

## Simple build for production

    $ yarn build
