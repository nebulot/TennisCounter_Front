import { Match } from "../templates/MatchCard.js";

import { Score } from '../templates/ScoreCard.js';
import { updateScore } from '../utils/modalAddScore.js';

window.updateScore = updateScoreCurrent;



//methode loadMatch
 async function loadMatch(){
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  // Default options are marked with *
  fetch("http://localhost:8080/api/match", {

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

    const matchs = await response.json();

    //console.log(json);
    console.log(matchs);
    displayMatch(matchs);
  }
  ).catch((err) => console.log("An error occurs when fetching players", err));
  //const json = await response.json();
  //console.log(json);
}
const displayMatch = async (matchs) => {

  const element = document.querySelector(".match__section");
  element.innerHTML = "";
  matchs.forEach((match) => {
    let matchModel = new Match(match);
    element.innerHTML += matchModel.createMatchCard;
  });
};


/* methode post */
  export async function addMatchs() {
    const player1Id = document.getElementById('player1').value;
    const player2Id = document.getElementById('player2').value;
    const refereeId = document.getElementById('referee').value;
    const dateBegin = document.getElementById('dateBegin').value;

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    fetch("http://localhost:8080/api/match", {
        method: "POST",
        mode: "cors",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`
        },
        body: JSON.stringify({
            player1Id: player1Id,
            player2Id: player2Id,
            refereeId: refereeId,
            dateBegin: dateBegin
            
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to create match: ' + response.statusText);
        }
        console.log('Match created successfully.');
        // Réinitialiser les données du formulaire après la création du match
        //resetMatchData();
        loadMatch('admin');
       
    })
    .catch(error => console.error('An error occurred while creating match:', error));
    console.log(dateBegin);
}

export async function updateScoreMatchCurrent(data) {
  const scoreSection = document.getElementById('score__section');
  const scoreCard = new Score(data);
  scoreSection.innerHTML = scoreCard.createScoreCard();
}

//Create new api witch match new point

export async function updateScoreCurrent(player) {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
fetch(`http://localhost:8080/api/match/score`, {
    method: "POST",
    mode: "cors",
    headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    },
    body: JSON.stringify({ player: player })
})
.then(response => {
    if (!response.ok) {
        throw new Error('Failed to update score: ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    console.log('Score updated successfully.', data);
    updateScoreMatchCurrent(data);
    updateScore();
})
.catch(error => console.error('An error occurred while updating score:', error));
}



loadPlayers();
loadReferees();
loadMatch();