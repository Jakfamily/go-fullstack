//logique routing
const express = require("express");
const router = express.Router();

const stuffctrl = require("../controllers/stuff");

router.get("/", stuffctrl.getAllThings);
router.post("/", stuffctrl.createThing);
router.get("/:id", stuffctrl.getOneThing);
router.put("/:id", stuffctrl.modifyThing);
router.delete("/:id", stuffctrl.deleteThing);

module.exports = router;
