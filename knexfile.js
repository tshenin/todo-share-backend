const path = require('path');
const BASE_PATH = path.join(__dirname, 'src', 'db')

require('dotenv').config();

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
        connection: 'postgres://localhost:5432/todo-share-dev',
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    },
    production: {
        client: 'pg',
        connection: {
            port: process.env.DB_PORT,
            host: process.env.DB_HOST,
            database: process.env.DB_NAME,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
        },
        migrations: {
            directory: path.join(BASE_PATH, 'migrations')
        },
        seeds: {
            directory: path.join(BASE_PATH, 'seeds')
        }
    }
};
