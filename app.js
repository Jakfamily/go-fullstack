require("dotenv").config();
const express = require("express"); // Importation du module Express
const mongoose = require("mongoose"); // Importation du module Mongoose
const uri = process.env.MONGODB_URI; // Récupération de l'URI de connexion à la base de données MongoDB
// Connexion à la base de données MongoDB avec Mongoose
mongoose
  .connect(uri)
  .then(() => {
    console.log("Connexion à MongoDB réussie");
  })
  .catch((error) => {
    console.error("Erreur de connexion à MongoDB :", error);
  });

const Thing = require("./models/thing");

const app = express();

app.use(express.json()); // Transformation du corps de la requête en objet JS utilisableb

// Middleware général appliqué à toutes les routes pour ajouter des headers aux requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*"); // Accès à l'API depuis n'importe quelle origine
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  ); // Ajout des headers mentionnés aux requêtes envoyées vers l'API
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  ); // Envoi de requêtes avec les méthodes mentionnées
  next();
});

app.post("/api/stuff", (req, res, next) => {
  delete req.body._id; // Suppression de l'id envoyé par le front-end, car il est généré automatiquement par MongoDB
  const thing = new Thing({
    ...req.body, // Récupération de tous les champs de la requête via le spread operator
  });
  thing
    .save() // Enregistrement de l'objet dans la base de données
    .then(() => res.status(201).json({ message: "Objet enregistré !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
});

// Middleware pour répondre aux requêtes faites à /api/stuff
app.get("/api/stuff", (req, res, next) => {
  Thing.find() // Récupération de tous les objets dans la base de données
    .then((things) => res.status(200).json(things)) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
});
module.exports = app; // Exportation de l'application pour l'utiliser dans d'autres fichiers

app.get("/api/stuff/:id", (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Récupération de l'objet correspondant à l'id fourni
    .then((thing) => res.status(200).json(thing)) // Réponse de réussite
    .catch((error) => res.status(404).json({ error })); // Réponse d'erreur
});

app.put("/api/stuff/:id", (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mise à jour de l'objet correspondant à l'id fourni
    .then(() => res.status(200).json({ message: "Objet modifié !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
});

app.delete("/api/stuff/:id", (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id }) // Suppression de l'objet correspondant à l'id fourni
    .then(() => res.status(200).json({ message: "Objet supprimé !" })) // Réponse de réussite
    .catch((error) => res.status(400).json({ error })); // Réponse d'erreur
});
