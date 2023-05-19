const express = require('express')
var cors = require('cors')
const app = express()
const port = process.env.PORT || 5000

app.use(cors())



app.get('/', (req, res) => {
  res.send("Hello Nayem")
})


app.listen(port, () => {
  console.log(`Action-wrold app listening on port ${port}`)
})
