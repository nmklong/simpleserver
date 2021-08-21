const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())
app.get('/getWelcomeText', (req, res) => {
    res.send({
        welcomeText: 'WELCOME, BACKEND CONNECTED'
    });
})

app.post('/createProduct', (req, res) => {
    store
        .createProduct({
            name: req.body.name,
            description: req.body.name,
            price: req.body.price
        })
        .then(() => res.sendStatus(200))
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
