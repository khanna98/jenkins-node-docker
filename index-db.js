const express = require('express');
const app = express();
const mysql = require('mysql');

// MySQL Code
const sqlConn = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
})

sqlConn.connect(function(err) {
    if (err) {
        console.log('Error connecting to db: ', err);
        return;
    }

    console.log('Connection to DB established.');
    sqlConn.query(
        'CREATE TABLE IF NOT EXISTS visits (id INT NOT NULL PRIMART KEY AUTO_INCREMENT, ts BIGINT)',
        function(err) {
            if (err) throw err;
        }
    );
});

// Request Handling
app.get('/', (req, res) => {
    // Create a table if it does not exists
    sqlConn.query(
        'INSERT INTO visits (ts) values (?)', Date.now(),
        function(err, dbRes) {
            if (err) throw err;

            res.send('Hello World ! You are visitor number' + dbRes.insertId);
        }
    );
});

// Server
const server = app.listen(3000, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log('App is running on http://%s:%s', host, port);
})

