export class Referee {
  constructor(referee) {
    this.id = referee.id;
    this.lastName = referee.lastName;
    this.firstName = referee.firstName;
    this.birthdate = referee.birthdate;
    this.image = referee.image;     
  }


  get updateDocumentTitle() {
    document.title += ` - ${this.lastName}, ${this.firstName}`
  }

  get createRefereeCard() {    

      let imageDefault = "../src/assets/arbitre.png";   
    if (this.image !== null) {
      imageDefault = this.image;
    }


    return `  
      <div class=player__card>      
       <div class="player__level"> 
       <!-- Bouton de suppression -->
      <button onclick="deleteReferee('${this.id}')" data-id="${this.id}" class="btn_delete p__level"><i class="fa-solid fa-trash"></i></button>
        </div>  
        <div class="player__img">                  
          <img class="img__player" id="photo_${this.id}" src="${imageDefault}" alt="Photographie de profil de ${this.lastName} ${this.firstName}">
        </div>      
          
               
        <div class="fake_btn">
        <!-- Bouton de modification -->
     <button onclick="updateReferee(${this.id},'${this.lastName}','${this.firstName}','${this.birthdate}')" id="btn_update" class="player__information btn_load">
         <h2 class="player__name info">${this.lastName}</h2>
         <h2 class="player__name info">${this.firstName}</h2>
         <p class="info">${this.birthdate}</p>
         <div class="btn_update">Modifier</div>
     </button>  
     </div>          
        <script src="../javascript/lightbox.js" type="module"></script>`
  }
};
















