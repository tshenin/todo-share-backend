
exports.up = knex =>
    knex.schema.table('todos', table => {
        table.integer('board_id').references('id').inTable('boards');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.timestamp('updated_at').defaultTo(knex.fn.now());
    });

exports.down = knex =>
    knex.schema.table('todos', table => {
        table.dropColumn('board_id');
        table.dropColumn('created_at');
        table.dropColumn('updated_at');
    });
