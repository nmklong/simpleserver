const express = require('express')
const bodyParser = require('body-parser')
const store = require('./store')

const app = express()
app.use(express.static('public'))
app.use(bodyParser.json())

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

app.put('/products', (req, res) => {
    store.updateProduct({
        id: req.body.id,
        name: req.body.name,
        description: req.body.description,
        price: req.body.price
    }).then(data => {
        if (data.length > 0) {
            res.send(data[0]);
        }
    })
})

app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    store.deleteProduct(id).then(data => res.sendStatus(200));
})

app.get('/products', async (req, res) => {
    const currentPage = req.query.page ? req.query.page : 1;
    const pageSize = req.query.limit ? req.query.limit : 10;
    const sortBy = req.query.sort ? req.query.sort : '-id';

    const totalRowsCountResult = await store.countProducts();
    const totalRowsCount = totalRowsCountResult.total_count;
    const totalPages = Math.ceil(totalRowsCount/pageSize);

    const getOrderBy = rawSortBy => {
        if (rawSortBy.indexOf('-') < 0) {
            return [rawSortBy, 'ASC'];
        }

        return [rawSortBy.replace('-', ''), 'DESC'];
    }

    store.getProducts({
        limit: pageSize,
        offset: pageSize * (currentPage - 1),
        orderBy: getOrderBy(sortBy)
    }).then(data => res.send({
        data,
        totalPages,
        currentPage,
        pageSize,
        sortBy
    }));
})

app.get('/products/:id', async (req, res) => {
    const id = req.params.id;
    store.getProduct(id).then(data => res.send(data));
})

app.listen(7555, () => {
    console.log('Server running on http://localhost:7555')
})
