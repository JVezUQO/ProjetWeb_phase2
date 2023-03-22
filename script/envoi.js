/*Fonction qui va permettre d'envoyer un courriel au localstorage, elle va enregistrer les données des champs de texts et les sauvegarder en localStorage */

function send() {
  let erreur = "";
  let titre_txt = document.getElementById("title-id").value;
  let receiver_txt = document.getElementById("destinataire-id").value;
  let content_txt = document.getElementById("content-id").value;

  if (titre_txt.length == 0) {
    erreur += "<br>&emsp;&emsp;&emsp;&emsp; - un titre ";
  }
  if (receiver_txt.length == 0) {
    erreur += "<br>&emsp;&emsp;&emsp;&emsp; - un destinataire ";
  }

  if (content_txt.length == 0) {
    erreur += "<br>&emsp;&emsp;&emsp;&emsp; - un message ";
  }

  if (titre_txt.length && receiver_txt.length && content_txt.length != 0) {
    document.getElementById("title-id").value = "";
    document.getElementById("destinataire-id").value = "";
    document.getElementById("content-id").value = "";

    let email = {};
    email.titre = titre_txt;
    email.destinataire = receiver_txt;
    email.contenu = content_txt;
    let emailstr = JSON.stringify(email);
    let value = localStorage.nombre;

    localStorage.setItem(value, emailstr);
    value++;
    localStorage.nombre = value;
    let displaytest = JSON.parse(localStorage.getItem(1));
    let texteErreur = document.getElementById("envoi-message");
    let msgerreur = (texteErreur.innerHTML = "Message envoyé avec succès!");
    Spawn();
    loadnew();
  } else {
    let texteErreur = document.getElementById("envoi-message");
    let msgerreur = (texteErreur.innerHTML = "Ajoutez : " + erreur);
    Spawn();
  }
}
/* fonction permetant de créer la ''card'' du nouveau courriel */
function loadnew() {
  const nombre = localStorage.nombre;
  let emailload = JSON.parse(localStorage.getItem(nombre - 1));
  const card = userCardTemplate.content.cloneNode(true).children[0];
  const header = card.querySelector("[data-header]");
  const body = card.querySelector("[data-body]");
  const content = card.querySelector("[data-content]");
  header.textContent = emailload.titre;
  body.textContent = emailload.destinataire;
  content.textContent = emailload.contenu;
  userCardContainer.append(card);
  return {
    name: header.textContent,
    email: body.textContent,
    content: content.textContent,
    element: card,
  };
}
