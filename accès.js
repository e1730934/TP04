<<<<<<< HEAD
const cours = require('./cours');
const express = require('express');
const app = express();

app.use(cours);

=======
const departement = require('./cours');
const express = require('express');
const app = express();

app.use('/', departement);

>>>>>>> febae47f0f4d4ab0bd8febc741634d7cdf668a69
app.listen(3000);