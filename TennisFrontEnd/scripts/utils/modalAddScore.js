import { updateScoreCurrent } from "../pages/matchsPageAdmin.js";

//modal de navigation 
const modalClose = document.querySelector(".btn_close2");
const scoreModal = document.querySelector(".score_wrapper_add");




// updateScore.js
export function updateScore() {
  const scoreModal = document.querySelector(".score_wrapper_add");   
  scoreModal.style.display = "flex";
 
}
    // Close the modal when the user clicks the close button
modalClose.addEventListener('click', () => scoreModal.style.display = "none");
  

 // bouton 
 document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.score-button').forEach(button => {
        button.addEventListener('click', (event) => {
            const player = event.target.dataset.player;
            updateScoreCurrent(player);
        });
    });
});





