const knex = require('knex')(require('./knexfile'))

export const createProduct = ({name, description, price}) => {
    console.log(`Adding product: 
        Name: ${name} 
        Description: ${description}
        Price: ${price}
    `)
    return Promise.resolve()
}
