
exports.seed = async knex => {

    await knex('boards').del();

    await knex('boards').insert({
        title: `board 1`,
        desc: `Description 1`,
    });

    await knex('boards').insert({
        title: `board 2`,
        desc: `Description 3`,
    });

    return knex;
};
