"use strict";

var cours = require('./cours');

var express = require('express');

var app = express();
app.use(cours);
app.listen(3000);