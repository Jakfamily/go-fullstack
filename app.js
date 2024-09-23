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
  const stuff = [
    {
      _id: "oeihfzeoi",
      title: "Mon premier objet",
      description: "Les infos de mon premier objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 4900,
      userId: "qsomihvqios",
    },
    {
      _id: "oeihfzeomoihi",
      title: "Mon deuxième objet",
      description: "Les infos de mon deuxième objet",
      imageUrl:
        "https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg",
      price: 2900,
      userId: "qsomihvqios",
    },
  ];
  res.status(200).json(stuff);
});
module.exports = app; // Exportation de l'application pour l'utiliser dans d'autres fichiers
