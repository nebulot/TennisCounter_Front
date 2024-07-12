import { checkInputValue } from "./function.js";

// Sélectionnez les éléments du DOM
const formWrapper = document.querySelector(".form_wrapper");
const btnSignup = document.querySelectorAll(".btn_signup");
const modalClose = document.querySelector(".btn_close");
const btnNav = document.querySelector('#btn_hamb');
const form = document.querySelector('#form');
const usernameField = document.querySelector('#username');
const passwordField = document.querySelector('#password');
const logoutButton = document.getElementById('logoutButton'); // Bouton de déconnexion

// Messages d'erreur
const message = {
    password: 'Minimum 2 caractères, maximum 15 caractères. Les chiffres et caractères spéciaux différents de - ne sont pas autorisés',
    username: 'Veuillez renseigner un identifiant valide',    
};

// Expressions régulières pour la validation
const regexUsername = /^[A-Za-z]+(((\'|\-|\.)?([A-Za-z])+))?$/;
const regexPassword = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{12,}$/;

// Toggle navbar
btnNav.addEventListener('click', () => document.querySelector('.list').classList.toggle('menu_toggle'));

// Ouverture de la modal
btnSignup.forEach(btn => { btn.addEventListener('click', () => formWrapper.style.display = "flex") });
modalClose.addEventListener('click', () => formWrapper.style.display = "none");

// Validation du formulaire
function validate(e) {
    e.preventDefault();
    
    // Vérifiez si toutes les conditions sont valides    
    const isUsernameValid = checkInputValue(regexUsername, usernameField, message.username);
    const isPasswordValid = checkInputValue(regexPassword, passwordField, message.password);

    // Si toutes les conditions sont valides
    if (isUsernameValid && isPasswordValid) {
        formWrapper.style.display = 'none';
        login(); // Fonction de connexion
    } 
}

// Soumettre le formulaire
form.addEventListener('submit', e => validate(e));

// Vérification des champs username et password en temps réel
passwordField.addEventListener('input', () => checkInputValue(regexPassword, passwordField, message.password)); 
usernameField.addEventListener('input', () => checkInputValue(regexUsername, usernameField, message.username));

// Gestion de la déconnexion
logoutButton.addEventListener('click', logout);

function logout() {
    // Effacez les identifiants stockés dans le localStorage
    localStorage.removeItem('username');
    localStorage.removeItem('password');

    // Par exemple, redirigez l'utilisateur vers l'écran de connexion
    window.location.reload(); // Rechargez la page pour revenir à l'écran de connexion
}