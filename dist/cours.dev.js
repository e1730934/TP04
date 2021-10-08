"use strict";

var departement = require('./données_dep');

var express = require('express');

var router = express.Router();
router.get('/', function (req, res) {
  res.send(departement);
});
router.use(express.urlencoded({
  extended: true
}));
router.route(['/cours']).get(function (req, res) {
  if (departement.cours) {
    res.send(affiche_cours_dept());
  }

  res.end('Ce departement est vide');
}).post(function (req, res) {
  var nouveau_cours = {
    "identifiant": req.body.identifiant,
    "titre": req.body.titre,
    "professeur": req.body.professeur,
    "etudiants": [{
      "numero": req.body.numero,
      "nom": req.body.nom,
      "prenom": req.body.prenom,
      "note": req.body.note
    }]
  };
  var resultat = ajoutCours(departement.cours, nouveau_cours);
  if (resultat = null) res.status(409).send("Le cours se trouve déjà dans la liste de cours ");else return res.send(departement.cours);
});
router.get('/cours/:identifiant', function (req, res) {
  var identifiant = req.params.identifiant;
  var resultat = info_cours(identifiant);
  if (resultat == null) res.status(404).send("Ce cours n'existe pas .");else res.send(resultat);
});
router.patch('/', function (req, res) {
  var identifiant = req.params.identifiant;
  var resultat = modifier(req.params.identifiant, req.body.professeur);

  if (resultat !== 1) {
    res.status(405).send("Impossible de modifier cet élément");
  } else {
    departement.cours;
    res.send();
  }
});

function affiche_cours_dept() {
  var liste_cours = [];

  for (var i in departement.cours) {
    delete departement.cours[i].etudiants;
  }

  liste_cours.push(departement.cours);
  return liste_cours;
}

function info_cours(identifiant) {
  for (var i = 0; i < departement.cours.length; i++) {
    if (departement.cours[i].identifiant == identifiant) {
      return departement.cours[i];
    }
  }
}

function ajoutCours(liste, Cours) {
  var cours_selectionner = true;

  for (var i = 0; i < liste.length; i++) {
    if (cours.identifiant === liste.cours[i].identifiant) {
      cours_selectionner = false;
    }
  }

  if (cours_selectionner !== true) liste.cours.push(cours);
}

function modifier(identifiant, propriété) {
  var élément_non_modifiable = parseInt(cours.identifiant);
  var élémentmodifiable = parseInt(cours.propriété);
  if (x == y) return 0;else return 1;
}

module.exports = router;