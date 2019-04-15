
exports.seed = async knex => {
    await knex('users').del();
    await knex('users').insert({
        username: 'figaro',
        password: 'secretinfo'
    })
    return knex;
};
