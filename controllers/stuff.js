// liens entre la logique metier et les routes  de lapi
const Thing = require("../models/thing");

exports.createThing = (req, res, next) => {
  delete req.body._id; // Suppression de l'id envoyé par le front-end, car il est généré automatiquement par MongoDB
  const thing = new Thing({
    ...req.body, // Récupération de tous les champs de la requête via le spread operator
  });
  thing
    .save() // Enregistrement de l'objet dans la base de données
    .then(() => res.status(201).json({ message: "Objet enregistré !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mise à jour de l'objet correspondant à l'id fourni
    .then(() => res.status(200).json({ message: "Objet modifié !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
};

exports.deleteThing = (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) // Suppression de l'objet correspondant à l'id fourni
    .then(() => res.status(200).json({ message: "Objet supprimé !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Récupération de l'objet correspondant à l'id fourni
    .then((thing) => res.status(200).json(thing)) // Réponse de réussite
    .catch((error) => res.status(404).json({ error })); // Réponse d'erreur
};

exports.getAllThings = (req, res, next) => {
  Thing.find() // Récupération de tous les objets dans la base de données
    .then((things) => res.status(200).json(things)) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
};
