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

module.exports = {
    createProduct
}
