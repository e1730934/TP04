const departement =require ('./données_dep');
const express = require('express');

var router = express.Router();

// Pourquoi l'obje de depaertement se trouve ici?
router.get('/', (req, res) =>{
    res.send(departement);

});

router.use(express.json())
router.use(express.urlencoded({extended: true}))

router.route(['/cours'])
    // -3 pour la fonction afficher_cours_dept: 5/8
    .get (function (req, res){
        if(departement.cours){
            res.send(affiche_cours_dept(departement.cours))
        }
        else
            res.send('Ce departement est vide')

    })
    
// 7/10
    .post(function (req, res){
       
        let nouveau_cours = {

            "identifiant":req.body.identifiant,
            "titre":req.body.titre,
            "professeur":req.body.professeur,
            "etudiants":{ // req.body.numero, .nom, .prenom, .note ne devraient pas se trouver au même niveau que identifiant, titre et professeur 
                "numero":req.body.numero,
                "nom":req.body.nom,
                "prenom":req.body.prenom,
                "note":req.body.note
            
            }
        }
        let resultat = ajoutCours(departement.cours,nouveau_cours)
        if (!resultat){
            res.status(409).send("Le cours se trouve déjà dans la liste de cours ") // Encore une fois, assurez-vous que les objets de retour soient les mêmes. Ce n'est pas recommandé de retourner un string ici et plus bas vous retourner un objet
        }
        else
            return res.send (affiche_cours_dept (departement.cours)) // J'ai demandé de retourner le nouveau cours ajouté, pa la liste des listes de cours 
        
        });

//8/8
router.get('/cours/:identifiant', (req, res) =>{

        let identifiant = req.params.identifiant;
        let resultat = info_cours(departement.cours,identifiant);
        if (resultat == null)
            res.status(404).send("Ce cours n'existe pas .");// Vous devez vous assurez que l'objet de retour soit toujours pareil. Si dans le else vous retournez un cours, ici vous ne devez pas retournez une chaine de caractere, mis un objet vide
        else

            res.send(resultat );

});

//9/9
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

//7/7
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
        delete (liste[i].etudiants) // C'est dangereux d'utiliser delete puisque tu viens de supprimer étudiants de la liste. Donc pour les autres appels GET/SET/PUT/DELETE, l'objet étudiants n'est plus présent -2. 
    }
    liste_cours.push(liste) // ici vous avez ajouté le tableau liste à l'index 0 du tableau liste_cours. Donc à l'index 0, on va avoir le tableau liste. -1
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

