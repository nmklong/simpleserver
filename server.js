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
    console.log(req.body);
    store
        .createProduct({
            name: req.body.productName,
            description: req.body.productDescription,
            price: req.body.productPrice
        })
        .then(() => res.sendStatus(200))
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
