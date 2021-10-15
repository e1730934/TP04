const departement =require ('./données_dep');
const express = require('express');

var router = express.Router();

router.get('/', (req, res) =>{
    res.send(departement);

});

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.route(['/cours'])
    .get (function (req, res){
        if(departement.cours){
            res.send(affiche_cours_dept(departement.cours))
        }
        else
            res.send('Ce departement est vide')

    })

    .post(function (req, res){
       
        let nouveau_cours = {

            "identifiant":req.body.identifiant,
            "titre":req.body.titre,
            "professeur":req.body.professeur,
            "etudiants":{
                "numero":req.body.numero,
                "nom":req.body.nom,
                "prenom":req.body.prenom,
                "note":req.body.note
            
            }
        }
        let resultat = ajoutCours(departement.cours,nouveau_cours)
        if (!resultat){
            res.status(409).send("Le cours se trouve déjà dans la liste de cours ")
        }
        else
            return res.send (affiche_cours_dept (departement.cours))
        
        });


router.get('/cours/:identifiant', (req, res) =>{

        let identifiant = req.params.identifiant;
        let resultat = info_cours(departement.cours,identifiant);
        if (resultat == null)
            res.status(404).send("Ce cours n'existe pas .");
        else

            res.send(resultat );

});


router.patch('/cours/:identifiant', (req, res) => {
    let listecours = departement.cours
    var indexCours = listecours.findIndex(cours => cours.identifiant === req.params.identifiant);
    var {identifiant, titre, professeur, etudiants } = req.body
    if (indexCours === -1) {
        return res.status(404).send({ message: 'Not Found' });
    }
    if (identifiant) 
          res.status(409).send("impossible de modifier l'identifiant d'un cours")
    else{
        if (titre) listecours[indexCours].titre = titre
        if (professeur) listecours[indexCours].professeur = professeur
        if (etudiants) listecours[indexCours].etudiants = etudiants
        }
    res.send(info_cours(listecours,req.params.identifiant))
    
});

router.delete('/cours/:identifiant', (req, res) => {
    let listecours = departement.cours
    var effaceIndex = listecours.findIndex(cours => cours.identifiant === req.params.identifiant)
    if (effaceIndex === -1) {
        return res.status(404).send({ message: 'Not Found' });
    } else{
        res.send(departement.cours.splice(effaceIndex, 1));
    }
});



function affiche_cours_dept(liste) {
    var liste_cours = []
    for (let i in liste) {
        delete (liste[i].etudiants)
    }
    liste_cours.push(liste)
    return (liste_cours)
}

function info_cours(listeCours,identifiant){
    for (let i = 0 ; i < listeCours.length; i++ ){
        if (listeCours[i].identifiant === identifiant){
            return listeCours[i]
        }
        

}}

function ajoutCours(liste,cours){

    var cours_selectionner = true

    for (let i = 0; i < liste.length ; i++) {
        if (cours.identifiant === liste[i].identifiant) {
            cours_selectionner = false
            return cours_selectionner
        
        }
    }
    if (cours_selectionner === true ){
         liste.push(cours)
         return cours_selectionner
    }

}


module.exports = router;

