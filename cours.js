const departement =require ('./données_dep');
const express = require('express');
const { identifiant } = require('./données_dep');
var router = express.Router();

router.get('/', (req, res) =>{
    res.send(departement);

});


router.get('/cours', (req, res) =>{
    res.send(affiche_cours_dept())

});


router.get('/cours/:identifiant', (req, res) =>{

        let identifiant = req.params.identifiant;
        let resultat = info_cours(identifiant);
        if (resultat == null)
            res.status(404).send("Ce cours n'existe pas .");
        else
            res.send(info_cours(identifiant));

});

router.post('/cours', (req, res) =>{
    let nouveau_cours = {
            "identifiant":req.body.identifiant,
            "titre":req.body.titre,
            "professeur":req.body.professeur,
            "étudiants":[{
                "numero":req.body.numero,
                "nom":req.body.nom,
                "prenom":req.body.prenom,
                "note":req.body.note
            }],
        }
    var a = true

    for (let i = 0; i < departement.cours.length ; i++) {
        if (nouveau_cours.identifiant === departement.cours[i].identifiant) {
                a = false
            }
        }
        if (a === true ){
            departement.cours.push(nouveau_cours)}
        else
            res.status(409).send("L'étudiant fait déja partie du cours");
        
        res.send(departement.cours)

});2


module.exports = router;



function affiche_cours_dept() {
    var liste_cours = []
    for (let i in departement.cours) {
        delete (departement.cours[i].etudiants)
    }
    liste_cours .push(departement.cours)
    return (liste_cours)
}

function info_cours(identifiant){
    for (let i = 0 ; i < departement.cours.length; i++ ){
        if (departement.cours[i].identifiant == identifiant){
            return departement.cours[i]
        }
        

}}

