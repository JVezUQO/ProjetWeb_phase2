const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./server/test.db');

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
    db.run('INSERT INTO EmailUser(Titre,Destinataire,Message) VALUES (?,?,?)',['para_a','para_b','para_c'], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('');
      } else {
        res.send(rows);
      }
    });
  });

  app.get('/spawn', (req, res) => {
  db.serialize(() => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS Users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, password TEXT, publickey TEXT, privatekey TEXT);`, (err) => {
        if (err) {
          console.error(err.message + 'Table User déja crée');
        } else {
          console.log('Table User créer avec succès');
        }
      });
      db.run(`CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, destinataire TEXT, contenu TEXT );`, (err) => {
        if (err) {
          console.error(err.message + 'Table EmailUser déja crée ');
        } else {
          console.log('Table email créer avec succès');
        }
      });
    })})});
  
  
  
  
  
  
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});