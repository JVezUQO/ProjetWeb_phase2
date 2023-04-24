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
          addUser(username,password);
        }
      })
    )

    .catch((error) => console.error(error));
}

function addUser(username,password) {
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

