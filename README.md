# Build a REST API using Node.js, Express and MongoDB

In this tutorial, we'll create a REST API using Node.js and Express. This API will expose a set of GET and POST endpoints to allow getting user data out, and sending data in.

We'll use a `MongoDB` database to store this data

Our task is to create a trip cost calculator app.

This will help in (PWA or mobile app for example) adding expenses you make. When tip ends, you archive it and it becomes part of the history - which you can navigate and see how much you spent in the past.

Note: This is not the Front-end App, but just the API.

Let's now dissect this into details, and translate it into a series of API endpoints (A unique URL we will call to create an operation). Like adding a new trip with its name.

At the beginning there's no trip stored, and we need to add one. I imagine the app will ask the user for the name, and there will be a "Create trip" button. When clicked, the app will send the name to us, to the `/trip` endpoint with the `POST HTTP` method.

We'll have the first endpoint, which will accept a `name` property.

```POST/trip {name}```

Another endpoint will list the trips and it's ```GET/trips```

By default, it will return the trips ordered by creation date.

When the user wants to add a new expense, the app will invoke the `/expense` endpoint with the *POST* method, with some parameters that describe the expense.

```POST /expense { trip, date, amount, category, description }```

* `trip` is the ID of the currently selected trip.

* `category` is the same of the category of the expense.

We'll provide a list of categories to choose from, which is static: `travel, food, accommodation, fun.`

When we want to retrieve a trip expenses, we call the `/expenses` endpoint with the GET method:

`GET /expenses { trip }` passing the `trip` identifier.

## Let's Start the project

### Setup Package

Initialize `package.json` && install `mongodb express.`

Create `server.js` file now , where we'll store our API code, and start requiring `Express` and `MongoDB.` Finally the `listen()` method on app the server.

## Adding Trips

We offer the client a way to add trip using the `POST /trip` endpoint.

Next we build the MongoDB server URL. Running the project locally the URL is like:

```const url = "mongodb://localhost:27017"```

because 27017 is the default port.

Next, let's connect to the database using `connect()` and while we are here lets's get a reference to the *trips and expenses* collections.

Now we can go back to our endpoint. This endpoint expects 1 parameter; `name`, which represents how we call our `trip`. For example, Sweden 2018 or Yosemite August 2018.

We expect data coming as JSON using the `Content-Type: application/json` middleware:

```app.use(express.json())```

We can now access the data by referencing it from `Request.body`

Once we have the name, we can use the `trips.insertOne()` method to add the trip to the database

We handle the error, if present in the `err` variable, otherwise we send a 200 response (successful) to the client, adding an `ok: true` message in the JSON response:

* Note: if you get an error like "could not read properly" `insertOne of undefined`, make sure `trips` is successfully set in `mongo.connect()`. Add a console.log(trips) before calling `insertOne()` to make sure if it contains the collection object.

We handle the error, if present in the `err` variable, otherwise we send a 200 response (successful) to the client, adding an `ok: true` message in the JSON response:

That's it!

Now we restart the Node application and tun it again. You can test this endpoint using Insomnia application, a great way to test adn interact with REST endpoints.

## List Trips
The list of trips nis returned by the `GET /trips endpoint`. It accepts no parameters:

We already initialized the `trips` collection, so we can directly access that to get the list.

We use the `trips.find()` method, which result we must convert to an array using `toArray()`:

Then we can handle the `err` and `items` results:

## Add an expense

We previously go the list of trips . Every trip has an associated `_id` property which is added by MongoDB directly when it's added:

``` "trips": [
        {
            "_id": "5bsd03aed64fb0cd04e15728",
            "name": "Yellowstone 2018"
        },
        {
            "_id": "5bsd03c212d45cdb5ccec636",
            "name": "Sweden 2017"
        },{
            "_id": "5bsd04ccf4f42dc3685890f6",
            "name": "First trip"
        }
    ]
}
```

We'll use this `_id` to register a new expense.

If you'll remember, the endpoint to add a new expense is this:

```POST /expense { trip, date, amount, category, description }```

`trip` in this case will be the `_id` of one of the trips we previously registered. Imagine that in the app. the user will add one trip, and will remain the current trip until a new one is added (or selected).

Let's go ahead and implement our stub:

Like when adding a trip, we're a going to use the insertOne() method, this time on the expenses collection.

We get 5 parameters from the request body:

* `trip`
* `date` the date, in ISO 8601 format `(eg. 2018-07-12T07:22:13)`, in the GMT timezone
* `amount` an integer with the amount
* *category* which is one from `travel, food, accommodation, fun`
* `description` a description for the expense, so we'll remember about it later

## List All Expenses

The last piece of the puzzle is getting the expenses.

We need to fill the `/expenses` endpoint stub, the last one missing:

The endpoint accepts the `trip` parameter, which is the `_id` property of a trip stored in the database.
