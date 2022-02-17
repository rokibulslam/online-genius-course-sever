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

      // GET METHOD
      // GET ALL APARTMENTS
      app.get("/courses", async (req, res) => {
        const cursor = courseCollection.find({});
        const total = await cursor.toArray();
        res.send(total);
      });

      // POST METHOD
      //   ADD AN APARTMENT APARTMENT COLLECTION
      app.post("/courses", async (req, res) => {
        const course = req.body;
        console.log(course);
        const result = await apartmentCollection.insertOne(course);
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