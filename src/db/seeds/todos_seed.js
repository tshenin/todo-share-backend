
exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('todos').del()
        .then(() => knex('todos').insert(
            {
                title: 'Todo 1',
                desc: 'Description one'
            },
        ))
        .then(() => knex('todos').insert(
            {
                title: 'Todo 2',
                desc: 'Description two'
            },
        ))
        .then(() => knex('todos').insert(
            {
                title: 'Todo 3',
                desc: 'Description three'
            },
        ))
};
