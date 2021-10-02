const express = require('express')
const app = express()
const departement = require("./données_dep");
const port = 3000
app.use(express.urlencoded({ extended: true }));


app.get('/etudiants', (req, res) => {
    res.send(listeEtudiant())
})
app.route(['/:identifiantCours/etudiants'])
    .get( (req, res) => {
       cours = req.params.identifiantCours;
       res.send(listeEtudiantParCours(cours))
})

    .post(function (req, res) {
        let cours = departement.cours
        for (let i = 0; i < cours.length; i++) {
            if(cours[i].identifiant === '420-3D5'){
                let nouveauEtudiant =
                    {
                        "numero": req.body.numero,
                        "nom": req.body.nom,
                        "prenom": req.body.prenom,
                        "note": req.body.note
                    }
                for (let j = 0; j < cours[i].etudiants.length; j++) {
                    if(nouveauEtudiant.numero === (cours[i].etudiants[j]).numero) {
                        res.status(409).send("L'étudiant fait déja partie du cours")
                    }

                }
                cours[i].etudiants.push(nouveauEtudiant)
                res.send(nouveauEtudiant)

            }
        }
    res.send('Requête POST reçu');
});

app.route(['/:identifiantCours/:numeroEtudiant'])
     .get( (req, res) => {
         cours = req.params.identifiantCours;
         numEtudiant = req.params.numeroEtudiant;
         let info = infoEtudiant(cours, numEtudiant)
         if (info !== null)
             res.send(info)
         else
             res.status(404).send("L'étudiant n'existe pas dans le cours donnée.")
     })



app.listen(port, () => {
    console.log(`La liste de tout les étudiants peuvent être retrouvé sur http://localhost:${port}/etudiants`)
    console.log(`La liste de tout les étudiants du cours 420-3D5 peuvent être retrouvé sur http://localhost:${port}/420-3D5/etudiants`)
    console.log(`Les informations de l'étudiant provenant d'un cours peuvent être retrouvé sur http://localhost:${port}/:identifiantCours/:numeroEtudiant`)
})

function listeEtudiant(){
    let lesEtudiants = []
    let cours = departement.cours
    for (let i = 0; i < cours.length; i++) {
        let coursSelectionner = cours[i]
        let listeEtudiantCours = coursSelectionner.etudiants
        for (let j = 0; j < listeEtudiantCours.length; j++) {
            let etudiantSelectionner = Object.assign({},listeEtudiantCours[j])
            delete etudiantSelectionner.note
            if(lesEtudiants.length===0){
                lesEtudiants.push(etudiantSelectionner)
            }
            else {
                for (let k = 0; k < lesEtudiants.length; k++) {
                    if (etudiantSelectionner.numero !== (lesEtudiants[k])[0]) {
                        lesEtudiants.push(etudiantSelectionner)
                        break
                    }
                }
            }
        }
    }
    return lesEtudiants
}
function listeEtudiantParCours(coursSelectionner){
    let lesEtudiants = []
    let cours = departement.cours
    for (let i = 0; i < cours.length; i++) {
        if(cours[i].identifiant === coursSelectionner){
            for (let j = 0; j < (cours[i].etudiants).length; j++) {
            lesEtudiants.push((cours[i]).etudiants[j])
            }
        }
    }
    return lesEtudiants
}
function infoEtudiant(cours, numEtudiant){
    for (let i = 0; i <departement.cours.length ; i++) {
        if(departement.cours[i].identifiant === cours){
            for (let j = 0; j < departement.cours[i].etudiants.length ; j++) {
                let etudiantSelectionner = departement.cours[i].etudiants[j]
                if(etudiantSelectionner.numero === numEtudiant){
                    return(departement.cours[i].etudiants[j])
                }
            }
        }

    }
    return null

}