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

app.post('/products', (req, res) => {
    console.log(req.body);
    store.createProduct({
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }).then((data) => {
        if (data.length > 0) {
            res.send(data[0]);
        }
    })
})

app.get('/products', (req, res) => {
    store.getProducts().then(data => res.send(data));
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
