const departement = require('./departement.js');
const etudiant = require('./etudiant');
const express = require('express');
const app = express();
const port = 3000;
app.use(express.urlencoded({extended: true}));

app.use(departement);
app.use(etudiant);

app.listen(port, () => {
    console.log(`Le département roule est en ligne sur http://localhost:${port}/departement`);
    console.log(`La liste de tout les étudiants peuvent être retrouvé sur http://localhost:${port}/etudiants`);
    console.log(`La liste de tout les étudiants du cours 420-3D5 peuvent être retrouvé sur http://localhost:${port}/420-3D5/etudiants`);
    console.log(`Les informations de l'étudiant provenant d'un cours peuvent être retrouvé sur http://localhost:${port}/:identifiantCours/:numeroEtudiant (exemple: http://localhost:3000/420-3D5/etudiant/234234234)`);
});
