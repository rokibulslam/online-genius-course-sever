const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");

const ObjectId = require("mongodb").ObjectId;

// Middleware
app.use(cors());
app.use(express.json());

// Connecting MongoDB database
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2efaz.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function run() {
    console.log('server connected successfully')
    try {
      await client.connect();
      const database = client.db("onlineCourses");
      const courseCollection = database.collection("courses");
      const orderCollection = database.collection("orders");

      // GET METHOD
      // GET ALL COURSES
      app.get("/courses", async (req, res) => {
        const cursor = courseCollection.find({});
        const total = await cursor.toArray();
        res.send(total);
      });
      // GET A COURSES BY ID
      app.get("/course/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await courseCollection.findOne(query);
        console.log(result);
        res.send(result);
      });
      // GET ALL ORDERS
      app.get("/orders", async (req, res) => {
        const cursor = orderCollection.find({});
        const orders = await cursor.toArray();
        res.json(orders);
      });

      // POST METHOD
      //   ADD AN APARTMENT APARTMENT COLLECTION
      app.post("/courses", async (req, res) => {
        const course = req.body;
        console.log(course);
        const result = await courseCollection.insertOne(course);
        res.json(result);
      });
      // POST AN ORDER  
      app.post("/orders", async (req, res) => {
        const apartment = req.body;
        const result = await orderCollection.insertOne(apartment);
        res.json(result);
      });
    } finally  {
        // await client.close()
    }
}
run().catch(console.dir);
// Checking server
app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`listening at port ${port}`);
});