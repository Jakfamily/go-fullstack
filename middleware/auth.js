const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupération du token dans le header Authorization de la requête entrante
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Décodage du token grâce à la fonction verify de jsonwebtoken
    const userId = decodedToken.userId; // Extraction de l'ID utilisateur de notre token
    if (req.body.userId && req.body.userId !== userId) {
      // Si la demande contient un ID utilisateur, on le compare à celui extrait du token
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error,
    });
  }
};
