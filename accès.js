const cours = require('./cours');
const express = require('express');
const app = express();

app.use(cours);

app.listen(3000);