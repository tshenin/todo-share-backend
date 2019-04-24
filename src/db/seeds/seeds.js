exports.seed = async knex => {
    await knex('todos').del();
    await knex('boards').del();
    await knex('users').del();

    // Create user
    await knex('users').insert({
        username: 'figaro',
        password: 'secretinfo'
    });
    await knex('users').insert({
        username: '123',
        password: '123123'
    });

    // create boards
    let users = await knex('users').select('*');
    users = Array.from(users);

    await knex('boards').insert({
        title: `Board 1`,
        desc: `Description 1`,
        user_id: users[0].id
    });
    await knex('boards').insert({
        title: `Board 2`,
        desc: `Description 2`,
        user_id: users[0].id
    });
    await knex('boards').insert({
        title: `Board 2`,
        desc: `Description 2`,
        user_id: users[1].id
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
    await knex('todos').insert({
        title: 'Todo 4',
        desc: 'Description four',
        board_id: boards[2].id
    })

    return knex;
};