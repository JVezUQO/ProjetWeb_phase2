function verifierUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetchUsers(username, password);
}

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

function addUser() {}
