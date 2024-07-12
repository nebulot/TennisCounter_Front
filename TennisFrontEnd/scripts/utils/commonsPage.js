 function loadPlayers() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');
  


  fetch('http://localhost:8080/api/player', {
    headers: {
      "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(players => {
    const player1Dropdown = document.getElementById('player1');
    const player2Dropdown = document.getElementById('player2');

    players.forEach(player => {
      const option = document.createElement('option');
      option.value = player.id;
      option.textContent = `${player.firstName} ${player.lastName}`;
      player1Dropdown.appendChild(option);
      player2Dropdown.appendChild(option.cloneNode(true));
    });
  })
  .catch(error => console.error("An error occurred while fetching players:", error));
}

 function loadReferees() {
  const username = localStorage.getItem('username');
  const password = localStorage.getItem('password');

  fetch('http://localhost:8080/api/referee', {
    headers: {
      "Authorization": `Basic ${btoa(`${username}:${password}`)}`
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(referees => {
    const refereeDropdown = document.getElementById('referee');
    refereeDropdown.innerHTML = ''; // Clear previous options if any
    referees.forEach(referee => {
      const option = document.createElement('option');
      option.value = referee.id;
      option.textContent = referee.firstName + ' ' + referee.lastName;
      refereeDropdown.appendChild(option);
    });
  })
  .catch(error => console.error("An error occurred while fetching referees:", error));
}

  