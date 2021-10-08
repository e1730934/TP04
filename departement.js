const express = require('express');
const donneDepartement = require("./données_dep");
const router = express.Router();



router.get('/departement',  function (req, res) {
    res.send(donneDepartement);
});

module.exports=router;
