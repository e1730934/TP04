const express = require('express')
const app = express()
const departement = require("./données_dep");
const port = 3000

app.get('/etudiants', (req, res) => {
    res.send(listeEtudiant())
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}/etudiants`)
})

function listeEtudiant(){
    let lesEtudiants = []
    let cours = departement.cours
    for (let i = 0; i < cours.length; i++) {
        let coursSelectionner = cours[i]
        let listeEtudiantCours = coursSelectionner.etudiants
        for (let j = 0; j < listeEtudiantCours.length; j++) {
            let etudiantSelectionner = listeEtudiantCours[j]
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

            console.log(etudiantSelectionner)
        }
        // console.log(listeEtudiantCours)
    }
    return lesEtudiants
    // console.log(cours)
}
listeEtudiant()