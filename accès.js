const departement = require('./cours');
const express = require('express');
const app = express();

app.use('/', departement);

app.listen(3000);