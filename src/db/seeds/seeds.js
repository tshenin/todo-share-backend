exports.seed = async knex => {
    await knex('todos').del();
    await knex('boards').del();
    await knex('users').del();

    // Create user
    await knex('users').insert({
        username: 'figaro',
        password: 'secretinfo'
    });

    // create boards
    let user = await knex('users').select('*');
    user = Array.from(user)[0];

    await knex('boards').insert({
        title: `Board 1`,
        desc: `Description 1`,
        user_id: user.id
    });
    await knex('boards').insert({
        title: `Board 2`,
        desc: `Description 2`,
        user_id: user.id,
    });

    // create todos
    let boards = await knex('boards').select('*');
    boards = Array.from(boards);
    await knex('todos').insert({
        title: 'Todo 1',
        desc: 'Description one',
        board_id: boards[0].id
    });
    await knex('todos').insert({
        title: 'Todo 2',
        desc: 'Description two',
        board_id: boards[0].id
    })
    await knex('todos').insert({
        title: 'Todo 3',
        desc: 'Description three',
        board_id: boards[1].id
    })

    return knex;
};