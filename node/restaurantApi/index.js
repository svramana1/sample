const express = require('express')
const mongo = require('mongodb');
const MongoClient = mongo.MongoClient;
const PORT=4000


const app = express()
const MONGO_URL = 'mongodb://127.0.0.1:27017';
let db;


const locations = [
    {
        "location_id": 1,
        "location_name": "Ashok Vihar Phase 3, New Delhi",
        "state_id": 1,
        "state": "Delhi",
        "country_name": "India"
    },
    {
        "location_id": 4,
        "location_name": "Bibvewadi, Pune",
        "state_id": 2,
        "state": "Maharashtra",
        "country_name": "India"
    },
    {
        "location_id": 8,
        "location_name": "Jeevan Bhima Nagar, Bangalore",
        "state_id": 3,
        "state": "Karnataka",
        "country_name": "India"
    },
    {
        "location_id": 13,
        "location_name": "Sector 40, Chandigarh",
        "state_id": 4,
        "state": "Punjab",
        "country_name": "India"
    }
]





app.get('/',  (req, res) => {
  res.send('Hello World')
})

app.get('/locations', (req, res) => {
    db.collection("locations").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})

//get mealtype
app.get('/quickSearch', (req, res) => {
    db.collection("mealType").find().toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })

})




app.get('/restaurants', (req, res) => {
    let query = {}
    let stateId = +req.query.state_id
    let mealId = +req.query.mealId
    if (stateId) {
        query = { state_id: stateId }
    }
    else if (mealId) {
        query = { "mealTypes.mealtype_id": mealId }
    }

    db.collection("restaurants").find(query).toArray((err, result) => {
        if (err) throw err;
        res.send(result)
    })
 
})



//mongo con

MongoClient.connect(MONGO_URL, (err, client) => {
    console.log("MongoDB is connected")
    if (err) console.log("Error while connecting to Mongo")
    db = client.db("mern-intern")
    app.listen(PORT, () => console.log("Server connected on the PORT", PORT))
})