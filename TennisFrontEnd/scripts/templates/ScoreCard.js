export class Score {
  constructor(score) {   
    this.scoreJoueur1 = score.scoreJoueur1 || {}; // Par défaut, initialisez à un objet vide
    this.scoreJoueur2 = score.scoreJoueur2 || {}; // Par défaut, initialisez à un objet vide
  }



  createScoreCard() {

    return `
      <div class="score__card">
        
      <div class="score__player">
          <h2 class="score__name">Joueur 1</h2>
          <h2 class="score__name">Joueur 2</h2>
          </div>

<div class="score__player">
<div class="score__player1">
          <h2 class="score__point">${this.scoreJoueur1.setGagnes} - ${this.scoreJoueur1.jeuxGagnes} - ${this.scoreJoueur1.formattedPointsGagnes}</h2>
          <p>${this.scoreJoueur1.advantageOrEquality}</p>
        </div>
        
          <div class="score__player2">
          <h2 class="score__point">${this.scoreJoueur2.setGagnes} - ${this.scoreJoueur2.jeuxGagnes} - ${this.scoreJoueur2.formattedPointsGagnes}</h2>
          <p>${this.scoreJoueur2.advantageOrEquality}</p>
        </div>
      </div>`;
  }
}