const hashing = require("./hashing.js");
function createKey() {
  let pair = hashing.generateKeyPairRSA();
  let public = pair.publicKey;
  let private = pair.privateKey;
  return public, private;
}
function verifierUser() {
  const user = getCredential.username()
  const pass = getCredential.password()
  
  
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

function getCredential(){
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  return username, password;
}