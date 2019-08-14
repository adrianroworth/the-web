const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// be able to serve static files.
app.use(express.static('./src/static'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('./routes'));

module.exports = app;
