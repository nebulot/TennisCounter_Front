function deletePlayer(id) {

    const deleteButtons = document.querySelectorAll(".btn_delete");
    deleteButtons.forEach(button => {
        button.addEventListener("click", function(e) {
            e.preventDefault();
            const playerId = this.getAttribute("data-id");
            deletePlayerCard(playerId);
            // delete createPlayersCard (id)
            this.parentElement.parentElement.remove(); 
            
        });
    });
}


async function deletePlayerCard(id) {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');

    fetch(`http://localhost:8080/api/player/${id}`, {
        method: "DELETE",
        mode: "cors",
        headers: {
            "Accept": "application/json",
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`
        }
    })
        .then(async function (response) {
            
            console.log(response.status);           
         
        })
        .catch((err) => console.log("An error occurs when deleting the player", err));

        // Call deletePlayer function after loading referees
document.addEventListener('DOMContentLoaded', () => {
    loadReferees();
    deletePlayer();
});
}













