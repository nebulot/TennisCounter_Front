import { Referee } from "../templates/RefereeCard.js";


let referees = [];

document.addEventListener('DOMContentLoaded', () => {
  loadReferees();
});

// Function to filter referees based on the search query
const filteredReferees = (referees, searchBar) => {
  searchBar.addEventListener("keyup", (e) => {
    const query = e.target.value.toLowerCase();
    if (query.length >= 2) {
      const filteredResults = referees.filter((referee) => {
        return referee.lastName.toLowerCase().startsWith(query) || 
               referee.firstName.toLowerCase().startsWith(query);
      });
      displayData(filteredResults);
      if (!filteredResults.length) {
        displayNoResultsMessage();
      }
    } else {
      displayData(referees);
    }
  });
};

// Function to display no results message
const displayNoResultsMessage = () => {
  const element = document.querySelector(".referee__section");
  element.innerHTML = `<div class="no__results">
  <div class="img__no_results">
  <img  class= "image_stop" src="../src/assets/alerte.png" alt="personnage avec un stop pour signaler qu'aucun arbitre n'a été trouvé">
  </div>
  <div class="info__no_results">
  <h1>0</h1>
  <h2>Aucun arbitre ne correspond à votre critère…</br> Veuillez recommencer.</h2>
  </div>
  </div>`;
};


//Method Get "loadPlayers"//

export async function loadReferees() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  if (!username || !password) {
    console.error("No credentials found, please log in.");
    return;
  }
  // Default options are marked with *
  fetch("http://localhost:8080/api/referee", {

    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    //cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    //credentials: "same-origin", // include, *same-origin, omit

    headers: {
      "accept": "application/json",
      "Authorization": `Basic ${btoa(`${username}:${password}`)}`

    }
  }).then(async function (response) {
    console.log(response.status);

    const referees = await response.json();

    //console.log(json);
    console.log(referees);
    displayData(referees);
    // Attacher l'événement de recherche après le chargement des arbitres
    const searchBar = document.getElementById('search-bar');
    filteredReferees(referees, searchBar);
  }
  ).catch((err) => console.log("An error occurs when fetching referee", err));
  //const json = await response.json();
  //console.log(json);
}



//card player with information , card by referee ("for each")
const displayData = async (referees) => {

  const element = document.querySelector(".referee__section");
  element.innerHTML = "";
  referees.forEach((referee) => {
    let refereeModel = new Referee(referee);
    element.innerHTML += refereeModel.createRefereeCard;
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

//Method Post "addReferees"//
export async function addReferees() {
  const lastName = document.getElementById('last').value;
  const firstName = document.getElementById('first').value;
  const birthdate = document.getElementById("birthdate").value;
  const image = document.getElementById("image").files[0]; 
  //const image64= await getBase64(image);
  const image64 = image ? await getBase64(image) : await fetchStaticImage("../src/assets/arbitre.png");

   // Blocked Post addPlayers if input lastName, firstName, birthdate is empty
   if (!lastName || !firstName || !birthdate) {   
    return;
  }

  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  
  // Default options are marked with *
  fetch("http://localhost:8080/api/referee", {


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
      // your expected POST request payload goes here
      lastName: lastName,
      firstName: firstName,
      birthdate: birthdate,
      image : image64,
    })
  }).then(async function (response) {
    console.log(response.status);

    const referees = await response.json();

    //console.log(json);
    console.log(referees);
    loadReferees();

  }
  ).catch((err) => console.log("An error occurs when fetching referee", err));

  //const json = await response.json();
  //console.log(json);
}

