
var name = sessionStorage.getItem("name");
document.getElementById("name").innerHTML = name;
var decks_id = "";

var played_cards_code = {};
var played_cards_value = {};
var played_cards_img = {} ;

var si_cards_code = {};
var si_cards_value = {};
var si_cards_img = {} ;

document.getElementById("submit").onclick = show_cards;





//new deck //
fetch('https://deckofcardsapi.com/api/deck/new/')
  .then(response => response.json())
  .then(data => {
         decks_id = data.deck_id;
        drawFromDeck();
    }) 

//drawing all cards from deck
function drawFromDeck()
{
    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/draw/?count=52;')
    .then(response => response.json())
    .then(data => 
        {
            
            addToPile()
        })

    
}

//adding to piles
function addToPile()
{ 
    
    //add to pile 1
    //AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD (SPADES AND DIAMONDS)
    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD')
    .then(response => response.json())
    

    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/add/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC')
    .then(response => response.json())
    


    setTimeout(shuffle_piles,1000);
}

function shuffle_piles()
{
    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/shuffle/')
    .then(response => response.json())
    

    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/shuffle/')
    .then(response => response.json())
    

    setTimeout(drawFromPile,1000);
}

function drawFromPile()
{
    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/draw/')
    .then(response => response.json())
    .then(data =>
        {
             played_cards_code = data.cards[0].code;
            console.log(played_cards_code);
            played_cards_value = data.cards[0].value;
            console.log(played_cards_value);
            played_cards_img = data.cards[0].image;
            console.log(played_cards_img);
        })

        fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/draw/')
        .then(response => response.json())
        .then(data =>
            {
                 si_cards_code = data.cards[0].code;
                console.log(si_cards_code);
                si_cards_value = data.cards[0].value;
                console.log(si_cards_value);
                si_cards_img = data.cards[0].image;
                console.log(si_cards_img);
            })

}

function show_cards()
{
   document.getElementById("player_card").src = played_cards_img;
   document.getElementById("si_card").src = si_cards_img;


}