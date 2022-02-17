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