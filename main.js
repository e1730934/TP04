const departement = require('./departement.js');
const express = require('express');
const app = express();

app.use(departement);

app.listen(3000, () => {
    console.log(`Le département roule est en ligne sur http://localhost:3000/departement`);
});

// app.listen(3000);
