const express = require('express');

const app = express();
const globalConfig = require('../../config/global');

app.use((req, res, next) => {
    // add global variables to the local scope for the views.
    res.locals = {
        global: globalConfig
    };
    next();
});

module.exports = app;
