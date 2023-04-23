const express = require('express');
const sqlite3 = require('sqlite3').verbose();

const app = express();
const db = new sqlite3.Database('./server/test.db');

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});


app.get('/getUsers', (req, res) => {
  db.all('SELECT * FROM Users', (err, rows) => {
    if (err) {
      console.error(err);
      res.status(500).send('Server error');
    } else {
      res.send(rows);
    }
  });
});

app.get('/getEmail', (req, res) => {
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
    db.run('INSERT INTO Users(Name,Password,Publickey,Privatekey) VALUES (?,?,?,?)',['Dummy_User','password','1234567890','qwerty'], (err, rows) => {
      if (err) {
        console.error(err + ' Impossible de créer un utilisateur vide');
        res.status(500).send('');
      } else {
        res.send(rows);
      }
    });
  });

  app.get('/usercreate', (req, res) => {
    const {Name,Password,Publickey,Privatekey} = req.query;
    db.run('INSERT INTO Users(Name,Password,Publickey,Privatekey) VALUES (?,?,?,?)',
    [Name,Password,Publickey,Privatekey], (err, rows) => {
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
      db.run(`CREATE TABLE IF NOT EXISTS EmailUser (id INTEGER PRIMARY KEY AUTOINCREMENT, Titre TEXT, Destinataire TEXT, Message TEXT, Envoyeur TEXT );`, (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log('Table email créer avec succès');
        }
      });
    })})});
  
  
  
  function nameCheck(nom){ //prob not good
    db.all('SELECT * FROM USERS', (err , rows) => { 
      if (err) {
      console.error(err.message);
    } else {
      console.log('Vérifications en cours...');

      rows.forEach(row => {
        if (row.columnName == nom) {
          console.log('Usager existant, connection en cours', row);
          return true;
         }else{return false;}

  })}})}
  

 
  
  

app.listen(3000, () => {
  console.log('Server started on port 3000');
});


