const maria = require('mysql');

const conn = maria.createConnection({
    host : '127.0.0.1',
    port : 3307,
    user:'root',
    password:'kmkm0315',
    database: 'financial_calendar'
});

module.exports = conn;