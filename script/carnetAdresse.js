/* Fonction qui définit lorsque l'on sélectionne un contact */
function updateList(selected) {
  myElement = document.getElementById("carnet-adresse-list");

  for (const child of myElement.children[0].children) {
    if (child === selected) {
      if (child.className === "selected") {
        child.className = "";
      } else {
        child.className = "selected";
      }
    } else {
      child.className = "";
    }
  }
}
/* Fonction qui va rafraishir les contacts */
function refreshList() {
  let carnetDAdresse = JSON.parse(localStorage.getItem("carnetDAdresse"));
  let autoCompletContent = document.getElementById("carnet-adresse-search-bar")
    .children[0].value;

  if (carnetDAdresse != null) {
    myElement = document.getElementById("carnet-adresse-list");
    myElement = myElement.children[0];
    myElement.textContent = "";

    for (let i = 0; i < carnetDAdresse.valeur.length; i++) {
      const node = document.createElement("li");

      if (carnetDAdresse["valeur"][i].Name.search(autoCompletContent) != -1) {
        node.innerHTML = carnetDAdresse["valeur"][i].Name;
        node.setAttribute("onclick", "updateList(this)");
        node.setAttribute("ondblclick", "open_mod(" + i + ")");
        myElement.appendChild(node);
      }
    }
  }
}
/* Fonction permettant d'afficher le menu pour modifier un contact lorsque l'on le double clique */
function triggerMod() {
  myElement = document.getElementsByClassName("selected")[0];
  let event = new MouseEvent("dblclick", {
    view: window,
    bubbles: true,
    cancelable: true,
  });
  myElement.dispatchEvent(event);
}

/* Fonction permettant de retirer un contact et de le retirer du localstorage*/
function remove() {
  myElement = document.getElementsByClassName("selected")[0];
  const index = parseInt(
    String(myElement.attributes.ondblclick.textContent)
      .replace("open_mod(", "")
      .replace(")", "")
  );

  
  let carnetDAdresse = JSON.parse(localStorage.getItem("carnetDAdresse"));

  carnetDAdresse.valeur.splice(index, 1);

  localStorage.setItem("carnetDAdresse", JSON.stringify(carnetDAdresse));
  refreshList();
}
/* Fonction qui permet de charger un contact dans le menu composer */
function contactImportLoad(){
  let selected = document.getElementsByClassName("selected")
  contact =selected[0].textContent
  showComposer(contact)
}
