const hashing = require("./hashing.js");
let x = false;
function createKey() {
  let pair = hashing.generateKeyPairRSA();
  let public = pair.publicKey;
  let private = pair.privateKey;
  return public, private;
}
function verifierUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetchUsers(username, password);
}
/*
  if (x == true) {
    fermerLog();
  } else {
    alert("Password error, try again");
  }

  if (true) {
    /*password === db.username.password
    if (true) {
      fermerLog();
    } else {
      //message d'erreur
      console.log(false);
    }
  } else {
    creer un nouvel utilisateur dans db
     {
      username:
      password:
      publicKey:
      privateKey:
      email: []
      contact:
    }
    
    console.log("nouvel utilisateur");

    createKey();
    fermerLog();
  }
}
*/
function fermerLog(x) {
  if (x == true) {
    const loginPage = document.getElementById("wraper-login");
    const formDisplay = document.querySelector("form");
    formDisplay.style.display = "none";
    loginPage.style.display = "none";
  } else {
    alert("Wrong password");
  }
}

function fetchUsers(username, password) {
  fetch("http://localhost:3000/getUsers")
    .then((response) => response.text())
    .then((data) =>
      JSON.parse(data).forEach((name) => {
        if (username === name.Name && password === name.Password) {
          fermerLog(true);
        }
      })
    )
    .catch((error) => console.error(error));
}
