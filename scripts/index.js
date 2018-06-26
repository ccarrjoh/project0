// require('./scripts/express.js');
// require('./mongo.js')


function Card(front, back){
  this.frontVal = front;
  this.backVal = back;

  this.display = function(side){
      if( side === 0 ){
          return this.frontVal;
      }else{
          return this.backVal;
      }
  };
}

var cardHandle = {
  cards: [],
  cardIndex: 0,
  cardButton: document.querySelector("#card"),
  cardText: document.querySelector("#cardText"),
  cardPosition: document.querySelector("#positionIndex"),
  cardSide: 0,
  addButton: document.querySelector("button[type = submit]"),
  deleteButton: document.querySelector('#deleteCard'),
  prevCard: document.querySelector("#prevCard"),
  nextCard: document.querySelector("#nextCard"),


  cardAdd: function(front, back) {
    this.cards.push(new Card(front, back) );

  },
  cardUpdate: function(){
    var currentCard = this.cards[ this.cardIndex ];
    this.cardText.innerHTML = currentCard.display( this.cardSide );
    this.cardPosition.innerHTML = (this.cardIndex+1)+"/"+this.cards.length;
},
cardFlip: function(){
  this.cardSide = (this.cardSide + 1) % 2;
},
cardMove: function(moveBy){
  this.cardIndex += moveBy;
  if( this.cardIndex < 0 ){
      this.cardIndex += this.cards.length;
  }
  this.cardIndex = this.cardIndex % this.cards.length;

    this.cardSide = 0;
    this.cardUpdate();
},
cardTap: function(){
  this.cardFlip();
  this.cardUpdate();
},

cardRemove: function(flashcard){  
  this.cards.splice(this.cards.indexOf(flashcard),1);
  this.cardUpdate();
  this.cardMove(-1);
  console.log('deleted the card');
  
}

};
cardHandle.cardButton.addEventListener('click', function() { 
  cardHandle.cardTap();
} );
cardHandle.addButton.addEventListener('click', (evt) =>{
  // evt.stopPropagation();
  userEnter();
});
cardHandle.deleteButton.addEventListener('click', (e3) => {
  e3.preventDefault();
  cardHandle.cardRemove(this.cardIndex);
});

var userEnter = function(){
  var nFront = document.querySelector("#newFront").value,
      nBack = document.querySelector("#newBack").value;

      console.log(nFront);
      console.log(nBack);

  cardHandle.cardAdd(nFront,nBack);
  nFront.value="";
  nBack.value="";
  cardHandle.cardUpdate();
}

cardHandle.prevCard.addEventListener('click', (e1) =>{
  e1.preventDefault();
  cardHandle.cardMove(-1);
});
cardHandle.nextCard.addEventListener('click', (e2) =>{
  e2.preventDefault();
  cardHandle.cardMove(1);
});