const express = require('express');
const app = express();

app.get('/', (req, res) => {
    res.send('Welcome to my App')
})


const server = app.listen('3000', () => {
    let host = server.address().address;
    let port = server.address().port;

    console.log(`Node App is running on ${host}:${port}`);
})
