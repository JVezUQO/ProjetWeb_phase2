//Fonction qui va vérifier si le user est créer et va le vérifier avec le input de l'usager
function verifierUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch('http://localhost:3000/createuser', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      name: username,
      password: password,
    })
  })
    .then(response => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error('Error: ' + response.status);
      }
    })
    .then(data => console.log(data))
    .catch(error => console.error(error));

  fetchUsers(username, password);
}

//Ferme le 'overlay' de login de la page index.html
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

//Cette fonction va vérifier si un compte existe déja, s'il existe il va comparé si le mot de passe est bon , si le mot de passe et usager et bon, nous allons pouvoir nous connecté
//Si le username existe, mais le mot de passe est éroné on en sera averti et si l'usager est nouveau, il sera crée.
function fetchUsers(username, password) {
  fetch("http://localhost:3000/users")
    .then((response) => response.text())
    .then((data) =>
      JSON.parse(data).forEach((name) => {
        if (username === name.Name && password === name.Password) {
          fermerLog(true);
          return;
        }
        if (username === name.Name && password !== name.Password) {
          alert("wrong password");
        }
        if (JSON.parse(data)[JSON.parse(data).length - 1].Name === name.Name) {
          addUser();
        }
      })
    )

    .catch((error) => console.error(error));
}

//Fonction qui va créer un usager s'il n'existe pas déja
function addUser() {
  const data = {
    Name: username,
    Password: password,
    Publickey: "mypublickey",
    Privatekey: "myprivatekey",
  };

  const queryString = Object.keys(data)
    .map((key) => key + "=" + data[key])
    .join("&");
  console.log(queryString);

  fetch("http://localhost:3000/usercreate")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      console.log("User created successfully!");
    })
    .catch((error) => {
      console.error("There was a problem creating the user:", error);
    });
}

