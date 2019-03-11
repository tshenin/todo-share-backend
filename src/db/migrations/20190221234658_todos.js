
exports.up = knex =>
    knex.schema.createTable('todos', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('desc').notNullable();
    });

exports.down = knex =>
    knex.schema.dropTable('todos');
