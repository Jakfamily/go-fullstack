const express = require("express"); // Importation du module Express

const app = express();

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

// Middleware général appliqué à toutes les routes pour ajouter des headers aux requêtes
app.use("/api/stuff", (req, res, next) => {
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
