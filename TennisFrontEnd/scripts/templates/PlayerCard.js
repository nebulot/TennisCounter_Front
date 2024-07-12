export class Player {
  constructor(player) {
    this.id = player.id; // Ajouter l'ID ici
    this.lastName = player.lastName;
    this.firstName = player.firstName;
    this.birthdate = player.birthdate;
    this.height = player.height;
    this.weight = player.weight;
    this.image = player.image;
       
  }


  get updateDocumentTitle() {
    document.title += ` - ${this.lastName}, ${this.firstName}`
  }

  get createPlayerCard() {  

  
    let imageDefault = "../src/assets/joueur.png";   
    if (this.image !== null) {
      imageDefault = this.image;
  }
    return  `    
    <div class="player__card"> 
    <div class="player__level"> 
    <!-- Bouton de suppression -->
  <button onclick="deletePlayer('${this.id}')" data-id="${this.id}" class="btn_delete p__level"><i class="fa-solid fa-trash"></i></button>
    </div>        
     <div class="player__img">        
    
        <img class="img__player" id="photo_${this.id}" src="${imageDefault}" alt="Photographie de profil de ${this.lastName} ${this.firstName}">
     
        </div>         

             <div class="fake_btn">
        <!-- Bouton de modification -->

     <button onclick="updatePlayer('${this.id}', '${this.lastName}', '${this.firstName}', '${this.birthdate}', '${this.height}', '${this.weight}')" id="btn_update" class="player__information btn_load">
      <h2 class="player__name info">${this.lastName}</h2>
      <h2 class="player__name info">${this.firstName}</h2>
      <p class="info">Date de naissance : ${this.birthdate}</p>
      <div class="info_body"> <p class="info">Poids : ${this.weight}</p>
      <p class="info">Taille : ${this.height}</p></div>
      
      <div class="btn_update">Modifier</div>
     </button>  
    </div>  
    
    `   
 
  }
};


   





































