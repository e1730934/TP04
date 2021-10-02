const express = require('express')
const departement = require("./données_dep");
const app = express()
const port = 3000

app.get('/departement', (req, res) => {
    res.send(departement)
})

app.listen(port, () => {
    console.log(`Le département roule est en ligne sur http://localhost:${port}/departement`)
})