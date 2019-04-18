
exports.up = knex =>
    knex.schema.table('boards', table => {
        table.integer('user_id')
            .notNullable()
            .references('id')
            .inTable('users')
            .onDelete('cascade');
    });

exports.down = knex =>
    knex.schema.table('boards', table => {
        table.dropColumn('user_id');
    });
