var express = require('express')
var bodyParser = require('body-parser')
var app = express()
var peanuts = [
  { name: 'salted', cost: 2.5 },
  { name: 'dry roasted', cost: 3.5 }
]
app.use(bodyParser.urlencoded({extended: true}))

app.get('/peanuts', function (req, res) {
  res.json(peanuts)
})

app.listen(3000, () => {
  console.log('Server Listening on port 3000')
})
