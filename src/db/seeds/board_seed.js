
exports.seed = async knex => {

    await knex('boards').del();

    await knex('boards').insert({
        id: 1,
        title: `board 1`,
        desc: `Description 1`,
    });

    await knex('boards').insert({
        id: 2,
        title: `board 2`,
        desc: `Description 2`,
    });

    return knex;
};
