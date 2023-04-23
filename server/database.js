const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const hashing = require("../script/hashing.js");

const app = express();
const db = new sqlite3.Database("./server/test.db");

function fermerLog() {
  // let pair = hashing.generateKeyPairRSA();
  // let public = pair.publicKey;
  //let private = pair.privateKey;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const loginPage = document.getElementById("wraper-login");
  const formDisplay = document.querySelector("form");
  formDisplay.style.display = "none";
  loginPage.style.display = "none";
  addUser("asdf", "123", "!23", "123");
}
/*
function createPrivateKey() {
  let pair = hashing.generateKeyPairRSA();
  let public = pair.publicKey;
  let private = pair.privateKey;
}
function getCredential() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  return username, password;
}
*/
function addUser(username, password, PrivateKey, PublicKey) {
  app.get("/usercreate", (req, res) => {
    db.run(
      "INSERT INTO Users(Name,Password,Publickey,PrivateKey) VALUES (?,?,?,?)",
      [username, password, PublicKey, PrivateKey],
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
}

app.get("/get", (req, res) => {
  db.all("SELECT * FROM EmailUser", (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send("Server error");
    } else {
      res.send(rows);
    }
  });
});

app.get("/dummycreate", (req, res) => {
  db.run(
    "INSERT INTO Users(Name,Password,Publickey,PrivateKey) VALUES (?,?,?,?)",
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

app.get("/usercreate", (req, res) => {
  db.run(
    "INSERT INTO Users(Name,Password,Publickey,PrivateKey) VALUES (?,?,?,?)",
    [username, password, Publickey, PrivateKey],
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
        `CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, Titre TEXT, Destinataire TEXT, Message TEXT );`,
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

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
