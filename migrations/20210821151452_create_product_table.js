exports.up = function (knex) {
    return knex.schema.createTable('product', function (t) {
        t.increments('id').primary()
        t.string('name').notNullable()
        t.string('description').notNullable()
        t.float('price').notNullable()
    })
};

exports.down = function (knex) {
    return knex.schema.dropTableIfExists('product')
};
