# MongoDB streams
## Table of Contents
- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Setup](#setup)
- [References](#references)

## Introduction
Since *MongoDB 3.6* change streams are supported. These change streams enable applications to stream real-time data changes.

They can come in handy if you want to listen to changes in data in a collection and relay (or consume) them instantly in your live application. Have the following setup to be able to test the code snippets in this repo.

## Prerequisites
Ensure you have the following installed before attempting to run this project locally.

Having higher versions that the ones required here would be an added advantage.

- [MongoDB -v 3.6](https://docs.mongodb.com/manual/installation/)
- [Node -v 8.0.0](https://nodejs.org/en/download/)
- [Yarn -v 1.17.3](https://classic.yarnpkg.com/en/docs/getting-started)


**Running MongoDB**

Create a `.env` file in the root of this project and add the following:
```sh
# NOTE: r1 is the name you choose to give to your replica set (as shown below).
MONGODB_URI='mongodb://localhost/?replSet=r1'
```

Ensure MongoDB is running on your PC:

Open a terminal and type: `mongo` to confirm whether it's running or not.

Check this [tutorial](https://www.freecodecamp.org/news/learn-mongodb-a4ce205e7739/) to learn more about MongoDB.

Start your DB in a Replica Mode:
```sh
# you can manually pass the DB path here or not
# Give your replica set a name: `r1`
mongod --dbpath /data/db --replSet r1
```

**Create a replica set**

Once you have the DB running on a Replica Mode, open a new terminal and run Mongo Shell:
```sh
# type the following and press ENTER
mongo

# initialize DB replica set mode
rs.initiate()
```

After running `rs.initiate()` your DB will officially launch in a replica mode. You should be able to see a shell starting with: `r1:SECONDARY`. Press ENTER and you're going to see: `r1:PRIMARY`.


## Setup
After cloning the repo to your machine, install dependencies with: `yarn install`

Open a new terminal and run: `node lib/index.js`

You won't see any DB logs just yet. Navigate back to the Mongo Shell and insert arbitrary data to the `demo` collection on our `test` DB:
```sh
# inserting data into MONGODB
# check the running
db

# then use `test` db
use test

# insert data
db.demo.insert({ name: 'Harrison' })
```

Go back to the terminal running: `node lib/index.js` and behold!

Drop me an [email](kamauharrison87@gmail.com) if you don't see anything or check out the screencast under [assets](assets/mongo-change-streams-demo.mov). You may need to download it for now.

## References
[Introduction to MongoDB Change streams](https://www.mongodb.com/blog/post/an-introduction-to-change-streams)