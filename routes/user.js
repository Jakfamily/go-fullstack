const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);

//routes post utiliser car le formulaire de connexion et d'inscription envoie des données sensibles

module.exports = router;
