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

  app.get('/create12', (req, res) => {
  db.serialize(() => {
    db.serialize(() => {
      db.run(`CREATE TABLE IF NOT EXISTS table00 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table 1 created successfully');
        }
      });
      db.run(`CREATE TABLE IF NOT EXISTS table99 (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT);`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table 2 created successfully');
        }
      });
    })})});
  
  
  
  
  
  
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});