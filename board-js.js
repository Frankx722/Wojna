
var name = sessionStorage.getItem("name");
document.getElementById("name").innerHTML = name;





//new deck //
fetch('https://deckofcardsapi.com/api/deck/new/')
  .then(response => response.json())
  .then(data => {
        decks_id = data.deck_id;
        //reschufle();
        split_deck();
    }) 

            
function split_deck()
{
    //AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC
//add to pile1
fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/add/?cards=AS,2S')
 .then(response => response.json())
 .then(data => console.log(data));
//pile 2


reschufle();
}


function reschufle()
{
    fetch('https://deckofcardsapi.com/api/deck/'+ decks_id + '/pile/player1/shuffle/')
    .then(response => response.json())
    .then(data => console.log(data));
    
    draw();

}
//drawinn from piles
function draw()
{


    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/draw/')
    .then(response => response.json())
    .then(data => console.log(data));
}
