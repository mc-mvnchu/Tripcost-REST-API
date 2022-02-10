// Requiring Express and MongoDB
//  Storing our API code too
const express = require("express");
const mongo = require("mongodb").MongoClient;
const url = "mongodb://localhost:27017";

// Initialize the express app
const app = express();
app.use(express.json());
// Adding the stubs for the API endpoint we support
app.post("/trip", (req, res) => {
    const name = req.body.name;
    trips.insertOne({ name: name }, (err, result) => {
        if (err) {
            console.error(err);
            res.status(500).json({ err: err })
            return
        }
        console.log(result)
        res.status(200).json({
            ok: true
        });
    });
});
app.get("/trips", (req, res) => {
    // List trips
    trips.find().toArray((err, items) => {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err })
            return
        }
        res.status(200).json({ trips: items })
    })
});
app.post("/expense", (req, res) => {
    // List Expenses
    expenses.insertOne(
        {
            trip: req.body.trip,
            date: req.body.date,
            amount: req.body.amount,
            category: req.body.category,
            description: req.body.description,
        },
        (err, result) => {
            if (err) {
                console.err(err)
                res.status(500).json({ err: err })
                return
            }
            res.status(200).json({ ok: true })
        }
    )
});
app.get("/expenses", (req, res) => {
    // List all expenses
    expenses.find({ trip: req.body.trip }).toArray((err, items) =>  {
        if (err) {
            console.error(err)
            res.status(500).json({ err: err})
            return
        }
        res.status(200).json({ expenses: items })
    })
});

// Listening `listen()` method on `app` to start the server
app.listen(3000, () => console.log("Server ready"));

// !Adding Trips
let db, trips, expenses;

mongo.connect(
    url,
    {
        useNewUrlParser: true,
        useUnifiedTechnology: true,
    },
    (err, client) => {
        if (err) {
            console.error(err)
            return
        }
        db = client.db("tripcost");
        trips = db.collection("trips");
        expenses = db.collection("expenses");
    }
);

