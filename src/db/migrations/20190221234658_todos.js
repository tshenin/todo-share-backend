
exports.up = (knex, Promise) => {
    return knex.schema.createTable('todos', table => {
        table.increments();
        table.string('title').notNullable();
        table.string('desc').notNullable();
    });
};

exports.down = (knex, Promise) => {
    return knex.schema.dropTable('todos');
};
