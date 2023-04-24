const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const bodyParser = require('body-parser');
const path = require('path');
const { generateKeyPairRSA } = require('./hashing');

const app = express();
app.use(bodyParser.json()); // parse application/json requests
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded requests

//Va automatiquement créer la base de donné avec les tables qui sont nécessaires

const db = new sqlite3.Database("./server/test.db");
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
  })})
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

<<<<<<< HEAD
// Définit le dossiers script et style comme dossier statique
app.use(express.static(path.join(__dirname, '..')));

// Serve static files from /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'index.html'));
});

// get the list of users
app.get("/users", (req, res) => {
=======
//Commande qui va obtenir la liste de tout les users dans la table Users
app.get("/getUsers", (req, res) => {
>>>>>>> df675a11165914861c9cb575073630ab9384860c
  db.all("SELECT * FROM Users", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send(rows);
    }
  });
});

<<<<<<< HEAD
// create a new user
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

// get the list of emails
app.get("/emails", (req, res) => {
=======
//Commande qui va obtenir des emails de tout les users dans la table EmailUser
app.get("/getEmail", (req, res) => {
>>>>>>> df675a11165914861c9cb575073630ab9384860c
  db.all("SELECT * FROM EmailUser", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send(rows);
    }
  });
});

<<<<<<< HEAD


// create a dummy user
=======
//Va créer un user ''dummy'' avec des valeurs fixes 
>>>>>>> df675a11165914861c9cb575073630ab9384860c
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

<<<<<<< HEAD
// create the tables
app.get("/spawn", (req, res) => {
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


// start the server
=======
//Va créer un user avec les paramêtres qu'il recoit
app.post("/user", (req, res) => {
  const { name, password, publickey, privatekey } = req.body;
  console.log(req.body);
  db.run(
    "INSERT INTO Users(Name,Password,Publickey,Privatekey) VALUES (?,?,?,?)",
    [name, password, publickey, privatekey],
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


//Ouvre le serveur au port 3000 pour /couter les commandes
>>>>>>> df675a11165914861c9cb575073630ab9384860c
app.listen(3000, () => {
  console.log("Server started on port 3000");
});
