const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

//midelwar
app.use(cors())

const shopCategory = require('./data/shopCategory.json');

app.get('/', (req, res) => {
  res.send(shopCategory)
})


app.listen(port, () => {
  console.log(`Action-wrold app listening on port ${port}`)
})
