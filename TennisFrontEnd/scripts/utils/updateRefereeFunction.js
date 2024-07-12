 function updateReferee(id, lastName, firstName, birthdate) {
    const formWrapper2 = document.querySelector(".form_wrapper_add");
    const btnRegisterReferee = document.querySelector("#btn_register_referee");
    formWrapper2.style.display = "flex";
    btnRegisterReferee.style.display = "none";
    // Remplir les champs du formulaire avec les données actuelles du joueur
    document.getElementById("id").value = id;
    document.getElementById("last").value = lastName;
    document.getElementById('first').value = firstName;
    document.getElementById('birthdate').value = birthdate;
   

    // Ajouter un écouteur d'événement au formulaire pour gérer la soumission
    //const form2 = document.querySelector("#formulaire");
    const btnUpdateReferee = document.querySelector('#btn_update_referee');
    btnUpdateReferee.style.display = "flex";
    btnUpdateReferee.addEventListener('click', function (e) {
        e.preventDefault(); // Empêcher le formulaire de se soumettre normalement
        // Obtenir les nouvelles valeurs des champs de formulaire
        const newLastName = document.getElementById('last').value;
        const newFirstName = document.getElementById('first').value;
        const newBirthdate = document.getElementById("birthdate").value; 
        // Appeler la fonction pour mettre à jour le joueur
        submitUpdatedReferee(id, newLastName, newFirstName, newBirthdate);
    });
}



//Method Put "uploadReferee"//
// Function to update player details

function submitUpdatedReferee(id, lastName, firstName, birthdate) {
    const username = localStorage.getItem('username');
    const password = localStorage.getItem('password');
   
    fetch(`http://localhost:8080/api/referee/${id}`, {
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
        }),
    })
        .then(async function (response) {
            if (response.ok) {
                // Mise à jour réussie
                console.log(response.status);
                window.location.reload();
            } else {
                console.log("Failed to update referee:", response.status);
            }
        })
        .catch((err) => console.log("An error occurs when updating the referee", err));
}



