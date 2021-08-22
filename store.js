const knex = require('knex')(require('./knexfile'))

const createProduct = ({name, description, price}) => {
    console.log(`
    Adding product: 
        - Name: ${name} 
        - Description: ${description}
        - Price: ${price}
    `);

    return knex('product').insert({
        name,
        description,
        price
    }).then(insertedIds => {
        if (insertedIds.length > 0) {
            return knex('product').where('id', insertedIds[0]);
        }
    });
};

const countProducts = () => {
    return knex('product').count('id AS total_count').first();
}

const getProducts = ({limit, offset, orderBy}) => {
    return knex('product').limit(limit).offset(offset).orderBy(orderBy[0], orderBy[1]);
}

module.exports = {
    countProducts,
    createProduct,
    getProducts
}
