//import { loadPlayers } from "../pages/playersPageAdmin.js";

// Function to handle login
async function login() {
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  const loginBtn = document.getElementById("loginButton");  
  const loginOut = document.getElementById("logoutButton");
  loginBtn.classList.add("hide");
  loginBtn.classList.remove("show");
  loginOut.classList.add("show");
  loginOut.classList.remove("hide");

  
  // Block the login if username or password is empty
  if (!username || !password) {
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/login", {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${encodeCredentials(username, password)}`
      },
      body: JSON.stringify({
        username: username,
        password: password
      })
    });

    if (response.status === 200) {
      // Stocker les identifiants dans le localStorage après une connexion réussie
      localStorage.setItem('username', username);
      localStorage.setItem('password', password);
      console.log("Login successful");
      //loadPlayers();
      
    } else {
      console.log("Login failed");
    }
  } catch (err) {
    console.log("An error occurred during login", err);
  }
}

// Fonction pour encoder les informations d'identification en base64
function encodeCredentials(username, password) {
  return btoa(`${username}:${password}`);
}
