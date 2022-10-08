const pgPromise = require('pg-promise')

const config = {
    host: 'dpg-ccqvqraen0hs2ssc0ff0-a.oregon-postgres.render.com',
    port: '5432',

    database: 'libreria',
    user: 'datrujillo',
    password: 'zvMXN3IKkZuNfobpISaumVOgl7Qmn7DS',
    ssl: true
}

const configLocal = {
    host: 'localhost',
    port: '5432',

    database: 'libreria',
    user: 'postgres',
    password: '200113'
}

const pgp = pgPromise({})
const db = pgp(config)

exports.db = db