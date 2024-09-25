const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1]; // Récupération du token dans le header Authorization
    const decodedToken = jwt.verify(token, "RANDOM_TOKEN_SECRET"); // Décodage du token
    const userId = decodedToken.userId; // Extraction de l'ID utilisateur de notre token

    // Attacher l'ID utilisateur à req.auth pour l'utiliser dans d'autres parties de l'application
    req.auth = { userId };

    if (req.body.userId && req.body.userId !== userId) {
      throw "User ID non valable !";
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: "Requête non authentifiée !",
    });
  }
};
