

function updatePlayer(id, lastName, firstName, birthdate, height, weight) {

    const formWrapper2 = document.querySelector(".form_wrapper_add");
    const btnRegisterPlayer = document.querySelector("#btn_register_player");
    formWrapper2.style.display = "flex";
    btnRegisterPlayer.style.display = "none";
    // Remplir les champs du formulaire avec les données actuelles du joueur
    document.getElementById("id").value = id;
    document.getElementById("last").value = lastName;
    document.getElementById('first').value = firstName;
    document.getElementById('birthdate').value = birthdate;
    document.getElementById('weight').value = weight;
    document.getElementById('height').value = height;
    

    // Ajouter un écouteur d'événement au formulaire pour gérer la soumission
    //const form2 = document.querySelector("#formulaire");
    const btnUpdatePlayer = document.querySelector('#btn_update_player');
    btnUpdatePlayer.style.display = "flex";
    btnUpdatePlayer.addEventListener('click', function (e) {
        e.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        // Obtenir les nouvelles valeurs des champs de formulaire

        const newLastName = document.getElementById('last').value;
        const newFirstName = document.getElementById('first').value;
        const newBirthdate = document.getElementById("birthdate").value;
        const newWeight = document.getElementById("weight").value;
        const newHeight = document.getElementById("height").value;
        // Appeler la fonction pour mettre à jour le joueur
        submitUpdatedPlayer(id, newLastName, newFirstName, newBirthdate, newHeight, newWeight);
    });
}

//Method Put "uploadPlayer"//
// Function to update player details

function submitUpdatedPlayer(id, lastName, firstName, birthdate, height, weight) {

    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');


    fetch(`http://localhost:8080/api/player/${id}`, {
        method: "PUT",
        mode: "cors",
        headers: {
            "accept": "application/json",
            "Content-Type": "application/json",
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`
        },
        body: JSON.stringify({
            id: id,
            lastName: lastName,
            firstName: firstName,
            birthdate: birthdate,
            height: height,
            weight: weight,
        }),
    })
        .then(async function (response) {
            if (response.ok) {
                // Mise à jour réussie
                console.log(response.status);
                window.location.reload();
            } else {
                console.log("Failed to update player:", response.status);
            }
        })
        .catch((err) => console.log("An error occurs when updating the player", err));
}


