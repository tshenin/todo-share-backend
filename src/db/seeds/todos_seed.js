
exports.seed = async knex => {

    await knex('todos').del();
    await knex('todos').insert({
        title: 'Todo 1',
        desc: 'Description one',
    });
    await knex('todos').insert({
        title: 'Todo 2',
        desc: 'Description two',
        board_id: 1,
    })
    await knex('todos').insert({
        title: 'Todo 3',
        desc: 'Description three',
    })
    await knex('todos').insert({
        title: 'Todo 4',
        desc: 'Description four',
    })
    return knex;
};
