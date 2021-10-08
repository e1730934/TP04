const departement =require ('./données_dep');
const express = require('express');
const { cours } = require('./données_dep');

var router = express.Router();

router.get('/', (req, res) =>{
    res.send(departement);

});

router.use(express.urlencoded({ extended: true }));

router.route(['/cours'])
    .get (function (req, res){
        if(departement.cours){
            res.send(affiche_cours_dept())
        }
        res.end('Ce departement est vide')

    })

    .post(function (req, res){
       
        let nouveau_cours = {
            "identifiant":req.body.identifiant,
            "titre":req.body.titre,
            "professeur":req.body.professeur,
            "etudiants":[{
                "numero":req.body.numero,
                "nom":req.body.nom,
                "prenom":req.body.prenom,
                "note":req.body.note
            
            }]
        }
        let resultat = ajoutCours(departement.cours,nouveau_cours)
            if (resultat = null )   
                res.status(409).send("Le cours se trouve déjà dans la liste de cours ")
            else
                return res.send(departement.cours)
    
    });


router.get('/cours/:identifiant', (req, res) =>{

        let identifiant = req.params.identifiant;
        let resultat = info_cours(identifiant);
        if (resultat == null)
            res.status(404).send("Ce cours n'existe pas .");
        else

            res.send(resultat );

});


router.patch('/cours/:identifiant', (req, res) => {
    let listecours = departement.cours
    const cours = listecours.find(listecours => listecours.identifiant === parseInt(req.params.identifiant));
    if (!cours) 
        return res.status(404).send({ message: 'Not Found' })
    else {
        let resultat = modifier_cours(req.params.identifiant,req.body.professeur)
        if (resultat !== 1) {
         res.status(405).send("Impossible de modifier cet élément")
        }
        else {
            cours.professeur = req.body.professeur
            cours.titre = req.body.titre
            res.send(info_cours(req.params.identifiant))
        }
    }
});

router.delete('/cours/:identifiant', (req, res) => {

    var effaceIndex = departement.cours.findIndex(cours=> cours.titre == req.body.titre
        || cours.id === parseInt(req.body.id));
    if (effaceIndex !== -1) {
        res.send(departement.cours.splice(effaceIndex, 1));
    } else{
        return res.status(404).send({ message: 'Not Found' });
    }
});



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

function ajoutCours(liste,Cours){

    var cours_selectionner = true

    for (let i = 0; i < liste.length ; i++) {
        if (cours.identifiant === liste.cours[i].identifiant) {
            cours_selectionner = false
        }
    }
    if (cours_selectionner !== true ) liste.cours.push(cours)

}

function modifier_cours(identifiant,propriété){
    let élément_non_modifiable = parseInt(cours.identifiant)
    let élémentmodifiable = parseInt(cours.propriété)
    for (let i = 0 ; i < departement.cours.length; i++ ){
        if (departement.cours[i].identifiant == identifiant ) {
            if (élément_non_modifiable !== élémentmodifiable)
                a = 1
        }
    }
    return a

module.exports = router;

