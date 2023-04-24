// logs in/ signs up the user
function verifierUser() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetchUsers(username, password);
}

// closes the login page
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

// logs in/ signs up the user
function fetchUsers(username, password) {
  fetch("http://localhost:3000/users")
    .then((response) => response.text())
    .then((data) => JSON.parse(data))
    .then((data) =>
      data.forEach((user) => {
        if (username === user.Name && password === user.Password) {
          fermerLog(true);
          return;
        }
        if (username === user.Name && password !== user.Password) {
          alert("wrong password");
        }
        if (data[data.length - 1].Name === user.Name) {
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
                fermerLog(true);
              } else {
                throw new Error('Error: ' + response.status);
              }
            })
            .catch(error => console.error(error));
        }
      })
    )

    .catch((error) => console.error(error));
}
