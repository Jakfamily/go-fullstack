/*
Ce middleware permet de gérer les fichiers entrants dans les requêtes HTTP.
sa methose diskstorage() configure le chemin et le nom de fichier pour enregistrer les images.
sa methode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.
*/

const multer = require("multer");

const MIME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(" ").join("_"); // Remplace les espaces par des underscores
    const extension = MIME_TYPES[file.mimetype]; // Récupère l'extension du fichier
    callback(null, name + Date.now() + "." + extension); // Crée un nom de fichier unique
  },
});

module.exports = multer({ storage: storage }).single("image");
