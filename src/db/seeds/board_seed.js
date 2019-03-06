
exports.seed = async (knex, Promise) => {
    // Deletes ALL existing entries
    const todos = await knex('todos').select('*');

    await knex('boards').del();

    todos.forEach((item, index) => {
        // todo 
    });

    await knex('boards').insert({
        title: 'board 1',
        desc: 'Description one',
        todos: [1]
    });
    await knex('boards').insert({
        title: 'board 2',
        desc: 'Description two',
        todos: [2]
    })
    await knex('boards').insert({
        title: 'board 3',
        desc: 'Description three',
        todos: [3]
    })
    await knex('boards').insert({
        title: 'board 4',
        desc: 'Description four',
        todos: [4, 5]
    })
    return knex;
};
