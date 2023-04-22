const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./test.db');

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

app.get('/create', (req, res) => {
    db.run('INSERT INTO EmailUser(User,Titre,Destinataire,Message) VALUES (?,?,?,?)',['para_a','para_b','para_c','para_d'], (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.send(rows);
      }
    });
  });

  app.get('/spawn', (req, res) => {
    db.run('CREATE TABLE EmailUser(id INTEGER PRIMARY KEY,User,Titre,Destinataire,Message)', (err, rows) => {
      if (err) {
        console.error(err);
        res.status(500).send('Server error');
      } else {
        res.send(rows);
      }
    });
  });

app.listen(3000, () => {
  console.log('Server started on port 3000');
});