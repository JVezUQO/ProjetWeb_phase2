const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./server/test.db');

let username;
let password;
let Publickey;
let PrivateKey;

app.get('/get', (req, res) => {
  db.all('SELECT * FROM EmailUser', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send(rows);
    }
  });
});

app.get('/dummycreate', (req, res) => {
    db.run('INSERT INTO Users(Name,Password,Publickey,PrivateKey) VALUES (?,?,?,?)',['Dummy_User','password','1234567890','qwerty'], (err, rows) => {
      if (err) {
        console.error(err + ' Impossible de créer un utilisateur vide');
        res.status(500).send('');
      } else {
        res.send(rows);
      }
    });
  });

  app.get('/usercreate', (req, res) => {
    db.run('INSERT INTO Users(Name,Password,Publickey,PrivateKey) VALUES (?,?,?,?)',[username,password,Publickey,PrivateKey], (err, rows) => {
      if (err) {
        console.error(err + ' Impossible de créer un utilisateur vide');
        res.status(500).send('');
      } else {
        res.send(rows);
      }
    });
  });


  app.get('/spawn', (req, res) => {
  db.serialize(() => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, Name TEXT, Password TEXT, Publickey TEXT, Privatekey TEXT);`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table User créer avec succès');
        }
      });
      db.run(`CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, Titre TEXT, Destinataire TEXT, Message TEXT );`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table email créer avec succès');
        }
      });
    })})});
  
  
  
  
  
  
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});