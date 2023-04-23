const hashing = require("./hashing.js");
function createKey() {
  let pair = hashing.generateKeyPairRSA();
  let public = pair.publicKey;
  let private = pair.privateKey;
  return public, private;
}
function verifierUser() {
  const user = getCredential.username();
  const pass = getCredential.password();
  /*if db includes username*/
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
