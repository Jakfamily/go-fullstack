// liens entre la logique metier et les routes  de lapi
const Thing = require("../models/thing");
const fs = require("fs");

exports.createThing = (req, res, next) => {
  const thingObject = JSON.parse(req.body.thing); // Extraction de l'objet JSON de la requête
  delete thingObject._id;
  delete thingObject._userId;

  const thing = new Thing({
    ...thingObject,
    userId: req.auth.userId, // Récupération de l'ID utilisateur dans le token
    imageUrl: `${req.protocol}://${req.get("host")}/images/${
      req.file.filename
    }`,
  });

  thing
    .save()
    .then(() => res.status(201).json({ message: "Objet enregistré !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.modifyThing = (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // Mise à jour de l'objet correspondant à l'id fourni
    .then(() => res.status(200).json({ message: "Objet modifié !" }))
    .catch((error) => res.status(400).json({ error }));
};

exports.deleteThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then((thing) => {
      if (thing.userId != req.auth.userId) {
        res.status(401).json({ message: "Not authorized" });
      } else {
        const filename = thing.imageUrl.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          Thing.deleteOne({ _id: req.params.id })
            .then(() => {
              res.status(200).json({ message: "Objet supprimé !" });
            })
            .catch((error) => res.status(401).json({ error }));
        });
      }
    })
    .catch((error) => {
      res.status(500).json({ error });
    });
};

exports.getOneThing = (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) // Récupération de l'objet correspondant à l'id fourni
    .then((thing) => res.status(200).json(thing))
    .catch((error) => res.status(404).json({ error }));
};

exports.getAllThings = (req, res, next) => {
  Thing.find() // Récupération de tous les objets dans la base de données
    .then((things) => res.status(200).json(things))
    .catch((error) => res.status(400).json({ error }));
};
