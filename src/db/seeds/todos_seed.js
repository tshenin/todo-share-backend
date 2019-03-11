
exports.seed = async knex => {

    await knex('todos').del();
    await knex('todos').insert({
        id: 1,
        title: 'Todo 1',
        desc: 'Description one',
        board_id: 1,
    });
    await knex('todos').insert({
        id: 2,
        title: 'Todo 2',
        desc: 'Description two',
        board_id: 1,
    })
    await knex('todos').insert({
        id: 3,
        title: 'Todo 3',
        desc: 'Description three',
        board_id: 2,
    })
    await knex('todos').insert({
        id: 4,
        title: 'Todo 4',
        desc: 'Description four',
        board_id: 2,
    })
    return knex;
};
