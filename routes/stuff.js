//logique routing
const express = require("express");
const router = express.Router();

const auth = require("../middleware/auth");
const multer = require("../middleware/multer-config");

const stuffctrl = require("../controllers/stuff");

router.get("/", auth, stuffctrl.getAllThings);
router.post("/", auth, multer, stuffctrl.createThing);
router.get("/:id", auth, stuffctrl.getOneThing);
router.put("/:id", auth, stuffctrl.modifyThing);
router.delete("/:id", auth, stuffctrl.deleteThing);

module.exports = router;
