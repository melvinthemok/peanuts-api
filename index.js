const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const app = express()
const port = process.env.PORT || 3000

// If we represent our peanuts as an object then we can use ids as the keys to look up the correct peanut later
const peanuts = {
  1: { name: 'salted', cost: 2.5, id: 1 },
  2: { name: 'dry roasted', cost: 3.5, id: 2 }
}
// we can create a variable to track the next id to allocate to a new peanut
var nextID = 3

// app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

app.get('/', function (req, res) {
  res.send('You can find Peanuts at <a href="/peanuts">/peanuts</a>')
})

// READ: GET ALL
app.get('/peanuts', function (req, res) {
  // convert object to an array
  var peanutsArr = Object.keys(peanuts).map(function (key) {return peanuts[key]})
  res.json(peanutsArr)
})
// READ: GET ONE
app.get('/peanuts/:id', function (req, res) {
  var foundPeanut = peanuts[req.params.id]
  res.json(foundPeanut)
})

// CREATE
app.post('/peanuts', function (req, res) {
  var newPeanut = {
    name: req.body.name,
    cost: req.body.cost,
    id: nextID
  }
  // save the peanut into the object and increment the id for next time
  peanuts[nextID] = (newPeanut)
  nextID++
  res.json(newPeanut)
})

// DELETE
app.delete('/peanuts/:id', function (req, res) {
  // remove the peanut from the object
  delete peanuts[req.params.id]
  res.json({message: 'success'})
})

// UPDATE
app.put('/peanuts/:id', function (req, res) {
  var foundPeanut = peanuts[req.params.id]
  if (foundPeanut) {
    if (req.body.name) foundPeanut.name = req.body.name
    if (req.body.cost) foundPeanut.cost = req.body.cost
  }
  res.json(foundPeanut)
})

app.listen(port, () => {
  console.log(`Server Listening on port ${port}`)
})
