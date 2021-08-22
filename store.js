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

const getProducts = () => {
    return knex('product');
}

module.exports = {
    countProducts,
    createProduct,
    getProducts
}
