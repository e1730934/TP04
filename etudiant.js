const express = require('express');
const donneDepartement = require("./données_dep");
const router = express.Router();



router.get('/etudiants', function (req, res) {
    res.send(listeEtudiant());
});

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

    .post(function (req, res) {
        if(donneDepartement.cours == null){
            res.status(404).send("Aucun cours n'est définie");
        }
        else{
        let cours = donneDepartement.cours;
        for (let i = 0; i < cours.length; i++) {
            if (cours[i].identifiant === '420-3D5') {
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
            res.send('Requête POST reçu');
        }
    });

router.route(['/:identifiantCours/etudiant/:numeroEtudiant'])

    .get(function (req, res){
        let cours = req.params.identifiantCours;
        let numEtudiant = req.params.numeroEtudiant;
        let info = infoEtudiant(cours, numEtudiant);
        if (info !== null)
            res.send(info);
        else
            res.status(404).send("L'étudiant n'existe pas dans le cours donnée.");
    })
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
            res.send(`Cours: ${donneDepartement.cours[suppressionEtudiant[1]].identifiant}, ${donneDepartement.cours[suppressionEtudiant[1]].titre} enseigné par ${donneDepartement.cours[suppressionEtudiant[1]].professeur}.\n${suppressionEtudiant[0]} `);
        }

    });

function listeEtudiant() {

    if(donneDepartement.cours == null){
        return ("Aucun cours n'est définie");
    }
    let cours = donneDepartement.cours;
    let lesEtudiants = [];
    for (let i = 0; i < cours.length; i++) {
        let coursSelectionner = cours[i];
        let listeEtudiantCours = coursSelectionner.etudiants;
        for (let j = 0; j < listeEtudiantCours.length; j++) {
            let etudiantSelectionner = Object.assign({}, listeEtudiantCours[j]);
            delete etudiantSelectionner.note;
            if (lesEtudiants.length === 0) {
                lesEtudiants.push(etudiantSelectionner);
            } else {
                for (let k = 0; k < lesEtudiants.length; k++) {
                    if (etudiantSelectionner.numero !== (lesEtudiants[k])[0]) {
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