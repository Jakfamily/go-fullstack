
# Projet Backend - API REST avec Node.js, Express et MongoDB dans le cadre du cours "Passez au Full Stack avec Node.js, Express et MongoDB" d'OpenClassrooms.

## Description

Ce projet a été réalisé dans le cadre d'un apprentissage visant à revoir les concepts fondamentaux de la création d'applications web. Il comprend la création d'un serveur web simple avec Express, le développement d'une API REST, la mise en place d'un système d'authentification et la gestion des fichiers utilisateur.

## Objectifs d'apprentissage

À la fin de ce projet, vous serez capable de :

- Créer un serveur web simple avec Express.
- Développer une API REST avec Node.js, Express et MongoDB.
- Mettre en place un système d'authentification sur une application Express.
- Gérer des fichiers utilisateur sur une application Express.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [MongoDB](https://www.mongodb.com/try/download/community) (ou utiliser MongoDB Atlas pour une solution cloud)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/votre-utilisateur/nom-du-repo.git
   ```

2. Accédez au répertoire du projet :

   ```bash
   cd nom-du-repo
   ```

3. Installez les dépendances :

   ```bash
   npm install
   ```

4. Configurez votre base de données MongoDB dans le fichier `.env` (voir `.env.example` pour le format).

5. Démarrez le serveur :

   ```bash
   nodemon server
   ```

## Routes API

Voici quelques-unes des routes disponibles dans l'API :

- `POST /signup` : Inscription d'un nouvel utilisateur (géré par le frontend).
- `POST /login` : Authentification d'un utilisateur (géré par le frontend).
- `GET /` : Récupérer la liste de tous les objets (avec authentification).
- `POST /` : Créer un nouvel objet (avec authentification et téléversement de fichiers).
- `GET /:id` : Récupérer un objet spécifique par son ID (avec authentification).
- `PUT /:id` : Modifier un objet spécifique par son ID (avec authentification).
- `DELETE /:id` : Supprimer un objet spécifique par son ID (avec authentification).


## Utilisation

- Pour tester l'API, vous pouvez utiliser des outils comme [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).
- Assurez-vous d'inclure le jeton d'authentification dans les en-têtes de vos requêtes lorsque cela est nécessaire.

## Auteurs

- **Jean-Baptiste** - *Développeur* - [Votre profil LinkedIn]([https://www.linkedin.com/in/votreprofil](https://www.linkedin.com/in/faria-jean-baptiste/))

## License

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
