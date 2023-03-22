/* fonction qui va créer les popUp lors de l'envoit d'un courriel, ou de l'échec de celui-ci*/
function Spawn() {
  const popUpEnvoi = document.getElementById("wraper-popup-envoi");
  popUpEnvoi.style.display = "initial";
}

/* fonction qui va restaurer la page en retirant le popUp*/
function Restore() {
   let checkRespone = document.getElementById("envoi-message").textContent;
  let s = "Message envoyé avec succès!";
  if (checkRespone.length == s.length) {
    location.hash = "liste-couriel";
    location.reload();
  }
  const popUpEnvoi = document.getElementById("wraper-popup-envoi");
  popUpEnvoi.style.display = "none";
}
