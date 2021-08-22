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

app.get('/products', async (req, res) => {
    const currentPage = req.query.page ? req.query.page : 1;
    const pageSize = req.query.limit ? req.query.limit : 10;
    const sortBy = req.query.sort ? req.query.sort : 'id';

    const totalRowsCountResult = await store.countProducts();
    const totalRowsCount = totalRowsCountResult.total_count;
    const totalPages = Math.ceil(totalRowsCount/pageSize);

    store.getProducts().then(data => res.send({
        data,
        totalPages,
        currentPage,
        pageSize,
        sortBy
    }));
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
