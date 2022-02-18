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
      const reviewCollection = database.collection("reviews");
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
      // GET SPECIFIC USERS ORDER BY EMAIL
      app.get("/orders/:email", async (req, res) => {
        const email = req.params.email;
        const query = {
          email: email,
        };
        const result = await orderCollection.find(query).toArray();
        res.json(result);
      });
      // GET ALL REVIEWS
      app.get("/reviews", async (req, res) => {
        const cursor = reviewCollection.find({});
        const reviews = await cursor.toArray();
        res.send(reviews);
      });
      // ----------**-----------
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
      // ADD REVIEW
      app.post("/review", async (req, res) => {
        const review = req.body;
        const result = await reviewCollection.insertOne(review);
        res.json(result);
      });

      // ----------**-----------
      // UPDATE METHOD
      // UPDATE ORDER'S STATUS BY ID
      app.put("/order/status/:id", async (req, res) => {
        const id = req.params.id;
        const updateInfo = req.body;
        const result = await orderCollection.updateOne(
          { _id: ObjectId(id) },
          { $set: { status: updateInfo.status } }
        );
        res.send(result);
      });

      // ----------**-----------
      // DELETE METHOD
      //   DELETE A COURSE FROM COLLECTION
      app.delete("/course/delete/:id", async (req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const result = await courseCollection.deleteOne(query);
        res.json(result);
      });
      // DELETE AN ORDER
      app.delete("/order/delete/:id", async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: ObjectId(id) };
        const result = await orderCollection.deleteOne(query);
        console.log(result);
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