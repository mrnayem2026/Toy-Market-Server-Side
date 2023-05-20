const express = require('express')
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();
var cors = require('cors')


const app = express()
const port = process.env.PORT || 5000

//midelwar
app.use(cors())
app.use(express.json())


const shopCategory = require('./data/shopCategory.json');



const uri = `mongodb+srv://${process.env.DB_NAME}:${process.env.DB_PASS}@mrn.gtqnz.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Create a Toys Database and a collection 
    const toysCollection = client.db('ToyDB').collection('Toys');

    // Add a Toy in server side and Database 
    app.post("/toys", async (req, res) => {
      const newToy = req.body;
      const result = toysCollection.insertOne(newToy);
      res.send(result);
    })

    // get all  Toys from database
    app.get('/toys', async (req, res) => {
      const corsor = toysCollection.find();
      const result = await corsor.toArray();
      res.send(result)
    })

      // get specific toy from database by id 
      app.get('/toys/:id', async (req, res) => {
        const id = req.params.id;
        console.log(id);
        const query = { _id: new ObjectId(id) }
        const result = toysCollection.findOne(query);
        res.send(result);
      })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send(shopCategory)
})


app.listen(port, () => {
  console.log(`Action-wrold app listening on port ${port}`)
})
