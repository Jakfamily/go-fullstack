const mongoose = require("mongoose"); // Import de mongoose pour la connexion à la base de données MongoDB

const thingSchema = mongoose.Schema({
  // Création d'un schéma de données pour les objets de la base de données
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

module.exports = mongoose.model("Thing", thingSchema); // Export du schéma sous forme de modèle
