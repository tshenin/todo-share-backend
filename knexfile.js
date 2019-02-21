const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'db')

module.exports = {
    test: {
        client: 'pg',
        connection: 'postgres://localhost:5432/todo-share-test',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    development: {
        client: 'pg',
        connection: 'postgres://localhost:5432/todo-share',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};
