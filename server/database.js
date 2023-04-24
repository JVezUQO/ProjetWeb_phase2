//Importation des constantes et des dépendances nécessaires
const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require('body-parser');
const path = require('path');
const { generateKeyPairRSA } = require('./hashing');

const app = express();
app.use(bodyParser.json()); // parse application/json requests
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded requests

//Va automatiquement créer la base de donné avec les tables qui sont nécessaires
const db = new sqlite3.Database("test.db");
db.serialize(() => {
  db.serialize(() => {
    db.run(
      `CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT, Publickey TEXT, Privatekey TEXT);`,
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Table User créer avec succès");
        }
      }
    )
  })
})
db.run(
  `CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, Titre TEXT, Destinataire TEXT, Message TEXT, Envoyeur TEXT );`,
  (err) => {
    if (err) {
      console.error(err.message);
    } else {
      console.log("Table email créer avec succès");
    }
  }
);


//Sensé permettre au localhost de ce fetch a lui même, énorme problème de sécurité si sa devait être host sur l'internet...
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //Cette ligne en particulière est dangereuse...
  res.header(
    "Access-Control-Allow-Methods",
    "PUT, GET, POST, DELETE, PATCH, OPTIONS"
  );
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Credentials", true);
  next();
});

// Définit le dossiers script et style comme dossier statique
app.use(express.static(path.join(__dirname, '..')));

// Serve static files from /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// Importe la liste de tout les usagers dans la database
app.get("/users", (req, res) => {
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send(rows);
    }
  });
});

// Créer un nouveau usager
app.post("/createuser", (req, res) => {
  const { name, password } = req.body;
  const { publicKey, privateKey } = generateKeyPairRSA();

  db.run(
    "INSERT INTO Users(Name,Password,Publickey,Privatekey) VALUES (?,?,?,?)",
    [name, password, publicKey, privateKey],
    (err, rows) => {
      if (err) {
        console.error(err + " Impossible de créer utilisateur");
        res.status(500).send();
      } else {
        res.send(rows);
      }
    }
  );
});

//Va créer un email avec les paramêtres qu'il recoit
app.post("/createemail", (req, res) => {
  const { titre, destinataire, message, envoyeur } = req.body;
  console.log(req.body);
  db.run(
    "INSERT INTO EmailUser(Titre,Destinataire,Message,Envoyeur) VALUES (?,?,?,?)",
    [titre, destinataire, message, envoyeur],
    (err, rows) => {
      if (err) {
        console.error(err + " Impossible de créer le email");
        res.status(500).send();
      } else {
        res.send(rows);
      }
    }
  );
});

// Charge une liste des couriels de tout les usagées
app.get("/emails", (req, res) => {
  db.all("SELECT * FROM EmailUser", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send(rows);
    }
  });
});



// Créer un ''dummy'' pour tester la base de données, à titre de test seulement
app.get("/dummycreate", (req, res) => {
  db.run(
    "INSERT INTO Users(Name,Password,Publickey,Privatekey) VALUES (?,?,?,?)",
    ["Dummy_User", "password", "1234567890", "qwerty"],
    (err, rows) => {
      if (err) {
        console.error(err + " Impossible de créer un utilisateur vide");
        res.status(500).send("");
      } else {
        res.send(rows);
      }
    }
  );
});

//Fonction qui créait initialment les tables de facon manuel. Cela est automatisé au lancement du programme
/*app.get("/spawn", (req, res) => {
  db.serialize(() => {
    db.serialize(() => {
      db.run(
        `CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT, Publickey TEXT, Privatekey TEXT);`,
        (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Table User créer avec succès");
          }
        }
      );
      db.run(
        `CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, Titre TEXT, Destinataire TEXT, Message TEXT, Envoyeur TEXT );`,
        (err) => {
          if (err) {
            console.error(err.message);
          } else {
            console.log("Table email créer avec succès");
          }
        }
      );
    });
  });
});
*/

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
