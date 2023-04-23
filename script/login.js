const hashing = require("./hashing.js");
function createKey() {
  let pair = hashing.generateKeyPairRSA();
  let public = pair.publicKey;
  let private = pair.privateKey;
  return public, private;
}
function verifierUser() {
 
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  
  fetchUsers();

  
  if (true) {
    /*password === db.username.password*/
    if (true) {
      fermerLog();
    } else {
      //message d'erreur
      console.log(false);
    }
  } else {
    /*creer un nouvel utilisateur dans db
     {
      username:
      password:
      publicKey:
      privateKey:
      email: []
      contact:
    }
    */

    
    createKey();
    fermerLog();
  }
}

function fermerLog() {
  const loginPage = document.getElementById("wraper-login");
  const formDisplay = document.querySelector("form");
  formDisplay.style.display = "none";
  loginPage.style.display = "none";
}



function fetchUsers() {
  fetch("http://localhost:3000/getUsers")
    .then(response => response.text())
    .then(data => console.log(data))
    .catch(error => console.error(error));
}