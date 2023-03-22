/* Fonction qui s'occupe d'ouvrir le popUp */
function open_new() {
  let popUp = document.getElementById("wraper-popup-modifier-carnet");
  popUp.style.display = "block";
}

/* Fonction qui assure la modification du contact qui est sélectionné*/
function open_mod(index) {
  let carnetDAdresse = JSON.parse(localStorage.getItem("carnetDAdresse"))
    .valeur[index];

  document.getElementById("contact-name-field").value = carnetDAdresse.Name;
  document.getElementById("contact-public-key-field").value =
    carnetDAdresse.PublicKey;

  let popUp = document.getElementById("wraper-popup-modifier-carnet");
  popUp.style.display = "block";
}

/* fonction qui ferme le ''popUp'' de modification d'un contact */
function fermer() {
  let popUp = document.getElementById("wraper-popup-modifier-carnet");
  popUp.style.display = "none";

  document.getElementById("contact-name-field").value = "";
  document.getElementById("contact-public-key-field").value = "";
}

/* Fonction qui sauvegarde les contacts au localstorage*/
function sauvegarder() {
  let localStorageSize = 0;
  let carnetDAdresse = JSON.parse(localStorage.getItem("carnetDAdresse"));

  if (carnetDAdresse != null) {
    localStorageSize = carnetDAdresse.valeur.length;
  }

  let dict_contact = {
    Name: document.getElementById("contact-name-field").value,
    PublicKey: document.getElementById("contact-public-key-field").value,
  };

  if (localStorageSize == 0) {
    localStorage.setItem(
      "carnetDAdresse",
      '{"valeur":[' + JSON.stringify(dict_contact) + "]}"
    );
  } else {
    let r = false;
    /*Vérifier qu'il n'y a pas de contact dupliqué*/
    for (let i = 0; i < localStorageSize; i++) {
      if (
        carnetDAdresse.valeur[i].Name == dict_contact.Name ||
        carnetDAdresse.valeur[i].PublicKey == dict_contact.PublicKey
      ) {
        carnetDAdresse.valeur[i].Name = dict_contact.Name;
        carnetDAdresse.valeur[i].PublicKey = dict_contact.PublicKey;
        localStorage.setItem("carnetDAdresse", JSON.stringify(carnetDAdresse));
        r = true;
      }
    }
    if (r == false) {
      carnetDAdresse.valeur[localStorageSize] = dict_contact;
      localStorage.setItem("carnetDAdresse", JSON.stringify(carnetDAdresse));
    }
  }
  refreshList();
  fermer();
}
