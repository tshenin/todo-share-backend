
exports.up = knex =>
    knex.schema.createTable('users', table => {
        table.increments();
        table.string('username').unique().notNullable();
        table.string('password').notNullable();
    });

exports.down = knex =>
    knex.schema.dropTable('users');
