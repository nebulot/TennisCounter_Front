import { checkInputValue } from "../utils/function.js";
import {addPlayers} from "../pages/playersPageAdmin.js";


// Modal Navigation
const formWrapper2 = document.querySelector(".form_wrapper_add");
const btnSignup2 = document.querySelectorAll(".btn_sign");
const btnUpdatePlayer = document.querySelector("#btn_update_player");
const modalClose2 = document.querySelector(".btn_close_sign");

// Form
const form2 = document.querySelector("#formulaire");
const lastField = document.querySelector('#last');
const firstField = document.querySelector("#first");
const birthdateField = document.querySelector("#birthdate");



// Open / Close Modal Form
btnSignup2.forEach(btn => {
    btn.addEventListener('click', () => {
        formWrapper2.style.display = "flex";
        btnUpdatePlayer.style.display = "none"; 
        form2.reset();
    });
});

modalClose2.addEventListener('click', () => formWrapper2.style.display = "none");

// Message error
const message = {
    last: 'Minimum 2 caractères',
    first: 'Minimum 2 caractères',
    birthdate: `Veuillez sélectionner une date valide`,
};

// Regex
const regexFirst = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/;
const regexLast =  /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/;

//Expression régulière pour les dates au format "jj/mm/aaaa"
const regexBirthdate = /^((\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1]))/;
     
// Validate form
function validate(e) {
    e.preventDefault();

   //Check if all conditions are valid   
    const isFirstValid = checkInputValue(regexFirst, firstField, message.first);
    const isLastValid = checkInputValue(regexLast, lastField, message.last);
    const isBirthdateValid = checkInputValue(regexBirthdate, birthdateField, message.birthdate);


    // If all conditions are valid 
    if (isFirstValid && isLastValid && isBirthdateValid) {
        formWrapper2.style.display = 'none';        
        form2.reset();
    } 
};

// Event listener for input change - first field
firstField.addEventListener('input', () => {
    checkInputValue(regexFirst, firstField, message.first);
});

// Event listener for input change - last field
lastField.addEventListener('input', () => {
    checkInputValue(regexLast, lastField, message.last);
});

// Event listener for input change - birthdate field
birthdateField.addEventListener('input', () => {
    checkInputValue(regexBirthdate, birthdateField, message.birthdate);
});

//send fORM 

document.getElementById('btn_register_player').addEventListener('click', function() {
    form2.addEventListener('submit', e => validate(e));
    btnUpdatePlayer.style.display = "none";
    addPlayers();          
  });

 




































