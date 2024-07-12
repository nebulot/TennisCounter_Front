import { checkInputValue } from "../utils/function.js";
import { addReferees } from "../pages/refereesPageAdmin.js";


// Modal Navigation
const formWrapper3 = document.querySelector(".form_wrapper_add");
const btnSignup3 = document.querySelectorAll(".btn_sign");
const btnUpdateReferee = document.querySelector("#btn_update_referee");
const modalClose3 = document.querySelector(".btn_close_sign");

// Form
const form3 = document.querySelector("#formulaire2");
const lastField = document.querySelector('#last');
const firstField = document.querySelector("#first");
const birthdateField = document.querySelector("#birthdate");

// Open / Close Modal Form
btnSignup3.forEach(btn => {
    btn.addEventListener('click', () => {
        formWrapper3.style.display = "flex";
        btnUpdateReferee.style.display = "none";
        form3.reset();
    });
});

modalClose3.addEventListener('click', () => formWrapper3.style.display = "none");

// Message error
const message = {
    last: 'Minimum 2 caractères',
    first: 'Minimum 2 caractères',
    birthdate: `Veuillez sélectionner une date valide`,
};

// Regex
const regexFirst = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/;
const regexLast = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/;
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
        formWrapper3.style.display = 'none';
        form3.reset();
    }
};

// Event listener for input change - first field
firstField.addEventListener('input', (e) => {
    e.preventDefault();
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


//send form
document.getElementById('btn_register_referee').addEventListener('click', function () {
    form3.addEventListener('submit', e => validate(e));
    btnUpdateReferee.style.display = "none";
    addReferees();
});
























