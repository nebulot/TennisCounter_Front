import { addMatchs } from "../pages/matchsPageAdmin.js";




// Gestion de l'ouverture/fermeture de la modal
const formWrapper4 = document.querySelector(".form_wrapper_add");
const btnSignup4 = document.querySelectorAll(".btn_sign");
const modalClose4 = document.querySelector(".btn_close_sign");


// Validation du formulaire
const form4 = document.querySelector("#formulaire3");


btnSignup4.forEach(btn => { 
    btn.addEventListener('click', () => {
        formWrapper4.style.display = "flex";       
        form4.reset();
    });
});

modalClose4.addEventListener('click', () => formWrapper4.style.display = "none");

function validate(e) {
    e.preventDefault();
    // Logique de validation du formulaire
};

document.getElementById('btn_register_match').addEventListener('click', function () {
    form4.addEventListener('submit', e => validate(e));   
    formWrapper4.style.display = "none";
    addMatchs();
});


