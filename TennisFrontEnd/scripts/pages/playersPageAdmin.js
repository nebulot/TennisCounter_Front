import { Player } from "../templates/PlayerCard.js";


let players = [];

document.addEventListener('DOMContentLoaded', () => {
  loadPlayers();
});

// Function to filter players based on the search query
const filteredPlayers = (players, searchBar) => {
  searchBar.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length >= 2) {
      const filteredResults = players.filter((player) => {
        return player.lastName.toLowerCase().startsWith(query) ||
          player.firstName.toLowerCase().startsWith(query);
      });
      displayPlayers(filteredResults);
      if (!filteredResults.length) {
        displayNoResultsMessage();
      }
    } else {
      displayPlayers(players);
    }
  });
};

// Function to display no results message
const displayNoResultsMessage = () => {
  const element = document.querySelector(".player__section");
  element.innerHTML = `<div class="no__results">
  <div class="img__no_results">
  <img  class= "image_stop" src="../src/assets/alerte.png" alt="personnage avec un stop pour signaler qu'aucun joueur n'a été trouvé">
  </div>
  <div class="info__no_results">
  <h1>0</h1>
  <h2>Aucun joueur ne correspond à votre critère…</br> Veuillez recommencer.</h2>
  </div>
  </div>`;
};



export async function loadPlayers() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  if (!username || !password) {
    console.error("No credentials found, please log in.");
    return;
  }

  try {
    const response = await fetch("http://localhost:8080/api/player", {
      method: "GET",
      mode: "cors",
      headers: {
        "accept": "application/json",
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
      }
    });

    if (response.ok) {
      players = await response.json();
      displayPlayers(players);
      // Attacher l'événement de recherche après le chargement des joueurs
      const searchBar = document.getElementById('search-bar');
      filteredPlayers(players, searchBar);
    } else {
      console.error("Failed to load players:", response.status);
    }
  } catch (err) {
    console.error("An error occurred when fetching players:", err);
  }
}



const displayPlayers = (players) => {

  const element = document.querySelector(".player__section");
  element.innerHTML = "";
  players.forEach((player) => {
    let playerModel = new Player(player);
    element.innerHTML += playerModel.createPlayerCard;
  });
};


//image encode 
function getBase64(file) {
  return new Promise((resolve, reject) => {
    if (!file) { 
      resolve(false);
      return; 
    } 
          
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });
}

async function fetchStaticImage(path) { 
  const response = await fetch(path); 
  const blob = await response.blob(); 
  return getBase64(blob); 
}


//Method Post "addPlayers"//
export async function addPlayers() {


  const lastName = document.getElementById('last').value;
  const firstName = document.getElementById('first').value;
  const birthdate = document.getElementById("birthdate").value;
  const weight = document.getElementById("weight").value;
  const height = document.getElementById("height").value;
  const image = document.getElementById("image").files[0];
  //const image64= await getBase64(image);
  const image64 = image ? await getBase64(image) : await fetchStaticImage("../src/assets/joueur.png");




  // Blocked Post addPlayers if input lastName, firstName, birthdate is empty
  if (!lastName || !firstName || !birthdate) {
    return;
  }

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  // Default options are marked with *
  fetch("http://localhost:8080/api/player", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "accept": "application/json",
      "Content-Type": "application/json ",
      "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    },
    body: JSON.stringify({
      lastName: lastName,
      firstName: firstName,
      birthdate: birthdate,
      height: height,
      weight: weight,
      image: image64,

    })
  }).then(async function (response) {
    console.log(players);
    console.log(getBase64(image));

    loadPlayers();

  }
  ).catch((err) => console.log("An error occurs when fetching players", err));
}


































