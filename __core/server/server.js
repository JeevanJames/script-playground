'use strict';

const process = require('process');

const chalk = require('chalk');
const express = require('express');
const open = require('open');

const app = express();

app.get('/', (req, res) => {
    res.sendFile('index.html', { root: './__core/server/' });
});
app.get('/index.html', (req, res) => {
    res.sendFile('index.html', { root: './__core/server/' });
});
app.get('/script.js', (req, res) => {
    res.sendFile('script.js', { root: './__core/server/' });
});
app.get('/index.js', (req, res) => {
    res.sendFile('index.js', { root: process.argv[2] });
});

const port = 1511;
const url = `http://localhost:${port}`;

open(url);
console.log(chalk`{blue Server running on ${url}. Press Shift+F5 in VSCode to stop}`);
app.listen(port);
