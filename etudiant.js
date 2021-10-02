const express = require('express')
const app = express()
const departement = require("./données_dep");
const port = 3000



app.get('/etudiants', (req, res) => {
    res.send(listeEtudiant())
})

app.get(['/420-3D5/etudiants','/:identifiantCours/etudiants'], (req, res) => {
    res.send(listeEtudiantParCours())
})


app.listen(port, () => {
    console.log(`La liste de tout les étudiants peuvent être retrouvé sur http://localhost:${port}/etudiants`)
    console.log(`La liste de tout les étudiants du cours 420-3D5 peuvent être retrouvé sur http://localhost:${port}/420-3D5/etudiants ou alors sur http://localhost:${port}/:identifiantCours/etudiants`)
})

function listeEtudiant(){
    let lesEtudiants = []
    let cours = departement.cours
    for (let i = 0; i < cours.length; i++) {
        let coursSelectionner = cours[i]
        let listeEtudiantCours = coursSelectionner.etudiants
        for (let j = 0; j < listeEtudiantCours.length; j++) {
            let etudiantSelectionner = Object.assign({},listeEtudiantCours[j])
            console.log(typeof(etudiantSelectionner))
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
function listeEtudiantParCours(coursSelectionner= '420-3D5'){
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