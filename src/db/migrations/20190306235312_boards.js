
exports.up = knex =>
    knex.schema.createTable('boards', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('desc');
        table.integer('todos').references('todos.id');
    });

exports.down = knex =>
    knex.schema.dropTable('boards');
