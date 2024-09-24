const express = require("express");
const mongoose = require("mongoose");
const stuffRoutes = require("./routes/stuff");
require("dotenv").config();

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => console.log("Connexion à MongoDB réussie"))
  .catch((error) => console.error("Erreur de connexion à MongoDB :", error));

const app = express();

// Middleware général appliqué à toutes les routes pour ajouter des headers aux requêtes
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});

app.use(express.json()); // Middleware pour parser les requêtes en JSON
app.use("/api/stuff", stuffRoutes); // Déclaration des routes

module.exports = app;
