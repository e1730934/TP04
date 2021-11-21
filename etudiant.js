const express = require('express');
const donneDepartement = require("./données_dep");
const router = express.Router();


// 7/10
router.get('/etudiants', function (req, res) {
    res.send(listeEtudiant());
});

//7/7
router.route(['/:identifiantCours/etudiants'])
    .get(function (req, res) {
        let cours = req.params.identifiantCours;
        let resultat = listeEtudiantParCours(cours);
        if (resultat == null)
            res.status(404).send("Le cours n'existe pas .");
        else if( resultat === ("Aucun cours n'est définie"))
            res.status(404).send("Aucun cours n'est définie");
        else
            res.send(listeEtudiantParCours(cours));
    })
    
    // 5.5/8
    .post(function (req, res) {
        if(donneDepartement.cours == null){
            res.status(404).send("Aucun cours n'est définie");
        }
        else{
        let cours = donneDepartement.cours;
        for (let i = 0; i < cours.length; i++) {
            if (cours[i].identifiant === '420-3D5') { // pourquoi tu as hardcodé la valeur '420-3D5', tu devrais utiliser la valeur en entrée -2
                let nouveauEtudiant =
                    {
                        "numero": req.body.numero,
                        "nom": req.body.nom,
                        "prenom": req.body.prenom,
                        "note": req.body.note
                    };
                for (let j = 0; j < cours[i].etudiants.length; j++) {
                    if (nouveauEtudiant.numero === (cours[i].etudiants[j]).numero) {
                        res.status(409).send("L'étudiant fait déja partie du cours");
                    }

                }
                cours[i].etudiants.push(nouveauEtudiant);
                res.send(nouveauEtudiant);

            }
        }
            res.send('Requête POST reçu'); // C'est quoi le but de cette ligne? // -0.5
        }
    });

router.route(['/:identifiantCours/etudiant/:numeroEtudiant'])
    //7/7
    .get(function (req, res){
        let cours = req.params.identifiantCours;
        let numEtudiant = req.params.numeroEtudiant;
        let info = infoEtudiant(cours, numEtudiant);
        if (info !== null)
            res.send(info);
        else
            res.status(404).send("L'étudiant n'existe pas dans le cours donnée.");
    })
    // 9/10
    .delete(function (req, res) {
        let cours = req.params.identifiantCours;
        let numEtudiant = req.params.numeroEtudiant;
        let info = infoEtudiant(cours, numEtudiant);
        if (info == null)
            res.status(404).send("L'étudiant n'existe pas dans le cours donnée.");
        else if (info === ("Aucun cours n'est définie"))
            res.status(404).send("Aucun cours n'est définie");
        else {
            let suppressionEtudiant = deleteEtudiant(cours, numEtudiant);
            // il faut retourner un objet, pas une chaine de caractère -1
            res.send(`Cours: ${donneDepartement.cours[suppressionEtudiant[1]].identifiant}, ${donneDepartement.cours[suppressionEtudiant[1]].titre} enseigné par ${donneDepartement.cours[suppressionEtudiant[1]].professeur}.\n${suppressionEtudiant[0]} `);
        }

    });

function listeEtudiant() {

    if(donneDepartement.cours == null){
        return ("Aucun cours n'est définie"); // Vous devez vous assurez de retourner les memes types. Ici tu retournes une chaine de caractere et plus bas, tu vas retourner un tableau
    }
    let cours = donneDepartement.cours;
    let lesEtudiants = [];
    for (let i = 0; i < cours.length; i++) {
        let coursSelectionner = cours[i];
        let listeEtudiantCours = coursSelectionner.etudiants;
        for (let j = 0; j < listeEtudiantCours.length; j++) {
            let etudiantSelectionner = Object.assign({}, listeEtudiantCours[j]);
            delete etudiantSelectionner.note; // C'est dangereux d'utiliser delete de cette façon puisque le delete est fait sur l'objet et que cette suppression est permanente 
            if (lesEtudiants.length === 0) {
                lesEtudiants.push(etudiantSelectionner);
            } else {
                for (let k = 0; k < lesEtudiants.length; k++) {
                    if (etudiantSelectionner.numero !== (lesEtudiants[k])[0]) { // C'est quoi la valeur de (lesEtudiants[k])[0]. lesEtudiants[k] retourne un objet etudiant, le fait de faire [0] retorne undefined
                        lesEtudiants.push(etudiantSelectionner);
                        break;
                    }
                }
            }
        }
    }
    return lesEtudiants;
}

function listeEtudiantParCours(coursSelectionner) {

    if(donneDepartement.cours == null){
        return ("Aucun cours n'est définie");
    }
    let cours = donneDepartement.cours;
    let lesEtudiants = [];
    let coursTrouver = false;
        for (let i = 0; i < cours.length; i++) {
        if (cours[i].identifiant === coursSelectionner) {
            coursTrouver = true;
            for (let j = 0; j < (cours[i].etudiants).length; j++) {
                lesEtudiants.push((cours[i]).etudiants[j]);
            }
        }
    }
    if (coursTrouver === false){
        return null;
    }
    return lesEtudiants;
}

function infoEtudiant(cours, numEtudiant) {
    if(donneDepartement.cours == null){
        return ("Aucun cours n'est définie");
    }
    for (let i = 0; i < donneDepartement.cours.length; i++) {
        if (donneDepartement.cours[i].identifiant === cours) {
            for (let j = 0; j < donneDepartement.cours[i].etudiants.length; j++) {
                let etudiantSelectionner = donneDepartement.cours[i].etudiants[j];
                if(etudiantSelectionner !== undefined)
                    if (etudiantSelectionner.numero === numEtudiant) {
                        return (donneDepartement.cours[i].etudiants[j]);
                    }
            }
        }

    }
    return null;
}

function deleteEtudiant(cours, numEtudiant) {
    for (let i = 0; i < donneDepartement.cours.length; i++) {
        if (donneDepartement.cours[i].identifiant === cours) {
            for (let j = 0; j < donneDepartement.cours[i].etudiants.length; j++) {
                let etudiantSelectionner = donneDepartement.cours[i].etudiants[j];
                if (etudiantSelectionner.numero === numEtudiant) {
                    let etudiantSupprimer = donneDepartement.cours[i].etudiants[j];
                    delete (donneDepartement.cours[i].etudiants[j]);
                    return ([`L'étudiant ${etudiantSupprimer.numero} - ${etudiantSupprimer.nom}, ${etudiantSupprimer.prenom} à été supprimé.`, i]);

                }
            }
        }

    }
}

module.exports=router;
