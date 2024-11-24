# Projet de Test Technique pour Candidature en Alternance chez Les Bons Artisans

Ce projet est une application complète composée d'une API REST en Node.js/Express et d'une application Web en ReactJS. L'objectif est de gérer des produits dans une base de données MongoDB avec la possibilité de créer, récupérer, modifier ou supprimer ces produits.

## Contenu du projet

- **API REST (Backend)**  
  L'API est construite en **Node.js** avec **Express** et utilise **Mongoose** pour interagir avec la base de données **MongoDB**. Elle permet de gérer les produits avec les fonctionnalités suivantes :  
  - **Créer un produit**
  - **Récupérer les produits**
  - **Modifier un produit**
  - **Supprimer un produit**
  
  **Mongoose** est utilisé pour définir les schémas de données et faciliter les opérations avec MongoDB.  
  [Documentation Mongoose](https://mongoosejs.com/)

- **Application Web (Frontend)**  
  L'application est développée en **ReactJS** et permet à l'utilisateur de consulter, créer, modifier et supprimer des produits. Les produits sont affichés dans une liste et chaque produit peut être modifié via une vue choisie (par exemple, une page de modification ou un popup).  
  Le design est basé sur **Material UI** pour une interface moderne et réactive.  
  [Documentation Material UI](https://material-ui.com/)

- **WebSocket (Bonus)**  
  L'application utilise **Socket.io** pour implémenter une communication en temps réel entre le serveur et l'application. Cette fonctionnalité permet de garder la liste des produits à jour en temps réel sans avoir à recharger la page.  
  [Documentation Socket.io](https://socket.io/)

- **Redux (Bonus)**  
  L'application utilise **Redux** pour la gestion de l'état global de l'application, permettant de charger et gérer les produits de manière efficace à travers différentes vues.  
  [Documentation Redux](https://redux.js.org/)

## Fonctionnalités

1. **Gestion des Produits**  
   - Créer, modifier, supprimer et consulter des produits.
   - Liste des produits affichée avec des options d'édition et de suppression.
   - Interface utilisateur moderne avec Material UI.
  
2. **Communication en Temps Réel (WebSocket)**  
   - Mise à jour en temps réel de la liste des produits grâce à la technologie WebSocket.
   
3. **Gestion de l'État (Redux)**  
   - Utilisation de Redux pour la gestion de l'état de l'application, y compris le chargement et la gestion des produits.

## Prérequis

Avant de démarrer, assurez-vous d'avoir les éléments suivants installés sur votre machine :

- **Node.js** (version 14 ou supérieure)
- **MongoDB** localement ou une connexion à une base MongoDB distante (par exemple MongoDB Atlas)
- **npm** (ou **yarn**)

## Installation

1. Clonez ce dépôt :
   ```bash
   git clone [https://github.com/syphaxalili/products-page.git]
   cd products-page-main
   ```

2. Installez les dépendances pour le backend :
   ```bash
   cd backend
   npm install
   ```

3. Installez les dépendances pour le frontend :
   ```bash
   cd frontend
   npm install
   ```

## Configuration

1. **Configuration de la base de données (MongoDB)**  
   L'URL de connexion à MongoDB avec l'utilisateur de test est déjà intégrée dans le projet. Aucune configuration supplémentaire n'est nécessaire pour la base de données dans le fichier `.env`.

2. **Démarrer l'API (Backend)**  
   - Lancez le serveur API avec la commande suivante :
     ```bash
     cd backend
     npm run dev
     ```

3. **Démarrer l'application (Frontend)**  
   - Lancez l'application React avec la commande suivante :
     ```bash
     cd frontend
     npm run dev
     ```

   L'application sera accessible sur `[http://localhost:5173]`.

## Structure du projet

- **backend/** : Contient l'API REST (Node.js/Express avec Mongoose).
- **frontend/** : Contient l'application ReactJS.

## Linter

Le code du projet respecte les règles définies par **ESLint** pour garantir une bonne qualité de code. Vous pouvez l'installer directement via VSCode ou en exécutant la commande suivante :
```bash
npm run lint
```

## Auteurs

- **[Syphax ALILI]** - Développeur principal

## Licence

Ce projet est sous licence MIT - voir le fichier [LICENSE](LICENSE) pour plus de détails.
