/* Si cela est la première fois que l'on charge la page, nous allons créer le localstorage qui contiendra et contera les émails*/
if (localStorage.nombre == null) {
  localStorage.nombre = 0;
  let emailist = [];
  localStorage.email = emailist;
}

/* Fonction qui va alterner entre le carnet d'adresse et le compositeur */
function showCarnetAdresse() {
  carnet = document.getElementById("carnet-adresse");
  composer = document.getElementById("composer-couriel");

  carnet.style.display = "grid";
  composer.style.display = "none";
}
/* Fonction qui va alterner entre le carnet d'adresse et le compositeur aussi, celle-ci va aussi prendre en compte l'ajout d'un contact */
function showComposer(name) {
  carnet = document.getElementById("carnet-adresse");
  composer = document.getElementById("composer-couriel");
  button = document.getElementById("envoitbutton");

  carnet.style.display = "none";
  composer.style.display = "grid";
  buttonenvoi.style.display = "initial";

  if (typeof name === 'undefined' ){name = ""}
  //else{name = document.getElementById("destinataire-id").value + name}
  document.getElementById("destinataire-id").value = name
  let test = name
  document.getElementById("title-id").value = "";
  document.getElementById("destinataire-id").value = test;
  document.getElementById("content-id").value = "";

  texttitre = document.getElementById("title-id");
  textdest = document.getElementById("destinataire-id");
  textcontenu = document.getElementById("content-id");

  texttitre.readOnly = false;
  textdest.readOnly = false;
  textcontenu.readOnly = false;
}

