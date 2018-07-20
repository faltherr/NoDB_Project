const express = require ('express')
const bodyParser = require ('body-parser')

// Data
const trailsData = require ('./trailsData')

//Controller
const trailController = require('./controller/trailController')

const app = express()

app.use(bodyParser.json())

app.get('/api/trails', trailController.readTrails)
app.post('/api/trails', trailController.createTrails)
app.put('/api/trails/:id', trailController.updateTrails)
app.delete('/api/trails/:id', trailController.deleteTrails)

const port1 = 8001;
app.listen(port1, () =>{
    console.log("listening on port:", port1)
} )