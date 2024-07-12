export class Match {
  constructor(match) {
    this.matchId = match.id;
    this.dateBegin = match.dateBegin;
    this.player1Id = match.player1Id;
    this.player2Id = match.player2Id;
    this.refereeId = match.refereeId;
    this.player1First = match.player1.firstName;
    this.player1Last = match.player1.lastName;
    this.player2First = match.player2.firstName;
    this.player2Last = match.player2.lastName;
    this.refereeFirst = match.referee.firstName;
    this.refereeLast = match.referee.lastName;
  }

  get createMatchCard() {
    return `
    <div class="player__card">
      <div class="match__img">
        <img class="img__player" src="../src/assets/tennisMatch.jpg" alt="Photographie de profil de ${this.player1Last} ${this.player1First}">
      </div>
      <div class="fake_btn">
        <button onclick="updateScore('${this.player1First} ${this.player1Last}', '${this.player2First} ${this.player2Last}')" class="player__information btn_load">
          <div class="match__information">
            <h2 id="player1Name" class="match__player info">${this.player1First} ${this.player1Last}</h2>
            <h2 id="player2Name" class="match__player info">${this.player2First} ${this.player2Last}</h2>
            <div class="underline"></div>
            <h3 id="refereeName" class="match__referee info">${this.refereeFirst} ${this.refereeLast}</h3>
            <p class="match__date info">${this.dateBegin}</p>
          </div>
          <div class="btn_score">Score</div>
        </button>
      </div>
    </div>`;
  }
}
