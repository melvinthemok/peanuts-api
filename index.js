var express = require('express')
var bodyParser = require('body-parser')
var cors = require('cors')
var app = express()

var peanuts = [
  { name: 'salted', cost: 2.5 },
  { name: 'dry roasted', cost: 3.5 }
]
app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))

// READ: GET
app.get('/peanuts', function (req, res) {
  res.json(peanuts)
})
app.get('/peanuts/:id', function (req, res) {
  var foundPeanut = peanuts[req.params.id]
  res.json(foundPeanut)
})

// CREATE: POST
app.post('/peanuts', function (req, res) {
  var newPeanut = {
    name: req.body.name,
    cost: req.body.cost
  }
  res.json(newPeanut)
})

// DELETE
app.delete('/peanuts/:id', function (req, res) {
  peanuts.splice(req.params.id,1)
  res.json({message: 'success'})
})


// UPDATE
app.put('/peanuts/:id', function (req, res) {
  var foundPeanut = peanuts[req.params.id]
  if (foundPeanut){
    if (req.body.name) foundPeanut.name = req.body.name
    if (req.body.cost) foundPeanut.cost = req.body.cost
  }
  res.json(foundPeanut)
})

app.listen(3000, () => {
  console.log('Server Listening on port 3000')
})
