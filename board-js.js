
var name = sessionStorage.getItem("name");
document.getElementById("name").innerHTML = name;
var decks_id = "";
var player_points = 0;
var si_points = 0;
var played_cards_code = "";
var played_cards_value = "";
var played_cards_img = "";

var si_cards_code = "";
var si_cards_value = "";
var si_cards_img = "";

var addToPile1_success;
var addToPile2_success;
document.getElementById("player-score").innerHTML = player_points;
document.getElementById("si-score").innerHTML = si_points;
document.getElementById("submit").onclick = show_cards;



//new deck //
fetch('https://deckofcardsapi.com/api/deck/new/')
  .then(response => response.json())
  .then(data => {
      console.log(data);
         decks_id = data.deck_id;
    }).then(drawFromDeck)



//drawing all cards from deck
 function drawFromDeck()
{
    fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/draw/?count=52;')
    .then(response => response.json())
    .then(data => 
        {
            console.log(data);
        }).then(addToPile)
        

    
}


//adding to piles
async function addToPile()
{ 
    
    //add to pile 1
    //AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD (SPADES AND DIAMONDS)
   await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/add/?cards=AS,2S,3S,4S,5S,6S,7S,8S,9S,0S,JS,QS,KS,AD,2D,3D,4D,5D,6D,7D,8D,9D,0D,JD,QD,KD')
    .then(response => response.json())
    .then(data =>
    { 
        addToPile1_success = data.success;
        console.log(addToPile1_success);

    })
    
    

   await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/add/?cards=AH,2H,3H,4H,5H,6H,7H,8H,9H,0H,JH,QH,KH,AC,2C,3C,4C,5C,6C,7C,8C,9C,0C,JC,QC,KC')
    .then(response => response.json())
    .then(data =>{ 
        addToPile2_success = data.success;
        console.log(addToPile2_success);
    })
    
    
    shuffle_piles();
}



 async function shuffle_piles()
{
    
  await  fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/shuffle/')
    .then(response => response.json())
    .then(data =>{ 
        draw1_success = data.success;
        console.log('shuffle1');
    })
    
    

   await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/shuffle/')
    .then(response => response.json())
    .then(data =>{ 
        draw2_success = data.success;
        console.log('shuffle2');
    })


    await drawFromPile();

    }

    //drawFromPile();


async function drawFromPile()
{
    await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player1/draw/')
    .then(response => response.json())
    .then(data =>
        {
            console.log(data);
             played_cards_code = data.cards[0].code;
            played_cards_value = data.cards[0].value;
            played_cards_img = data.cards[0].image;
            draw_success1 = data.success;

            if(draw_success1 == false)
            {
                endgame();
            }
        }).then(convert)

        await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/draw/')
        .then(response => response.json())
        .then(data =>
            {
                console.log(data);
                 si_cards_code = data.cards[0].code;
                si_cards_value = data.cards[0].value;
                si_cards_img = data.cards[0].image;
                draw_success2 = data.success;
                console.log(draw_success1);
                if(draw_success2 == false)
                {
                    endgame();
                }
                

            }).then(convert)
            

        function convert()
            {

                //convert values to player cards
                if(played_cards_value == 'ACE')
                {
                    played_cards_value = '1';
                }

                if(played_cards_value == 'JACK')
                {
                    played_cards_value = '11';
                }
                if(played_cards_value == 'QUEEN')
                {
                    played_cards_value = '12';
                }

                if(played_cards_value == 'KING')
                {
                    played_cards_value = '13';
                }

                //convert values to si cards
                if(si_cards_value === 'ACE')
                {
                    si_cards_value = '1';
                }

                if(si_cards_value === 'JACK')
                {
                    si_cards_value = '11';
                }

                if(si_cards_value === 'QUEEN')
                {
                    si_cards_value = '12';
                }

                if(si_cards_value === 'KING')
                {
                    si_cards_value = '13';
                }
                

            }


    }
 
 function show_cards()
{
    
        played_cards_value = parseInt(played_cards_value );
        si_cards_value = parseInt(si_cards_value );

        document.getElementById("player_card").src = played_cards_img;
        document.getElementById("si_card").src = si_cards_img;
        console.log(played_cards_value + ' player');
        console.log(si_cards_value + ' si');
    
        
        
        if(played_cards_value > si_cards_value)
        {   
            document.getElementById("player-win").innerHTML = "Wygrana!";
            document.getElementById("si-win").innerHTML = "";
            player_points++;
            document.getElementById("player-score").innerHTML = player_points;
            
            drawFromPile();
               
        }else if(played_cards_value < si_cards_value){
            document.getElementById("si-win").innerHTML = "Wygrana!";
            document.getElementById("player-win").innerHTML = "";
            si_points++;
            document.getElementById("si-score").innerHTML = si_points;
            
                drawFromPile();
                
        }else if(played_cards_value === si_cards_value){
            document.getElementById("si-win").innerHTML = "";
            document.getElementById("player-win").innerHTML = "";
            drawFromPile();
            war();
        }
       

         
       
}


function war()
{
    
    document.getElementById("rotated-pl").style.visibility = "visible";
    document.getElementById("rotated-si").style.visibility = "visible";
    var player_card = document.getElementById("")
    
    
}

function endgame()
{
    var body = document.body;
    var board = document.getElementById("board");
    var end_game_div = document.createElement("div");
    var end_game_div_element = document.createElement("div");
    body.style.backgroundColor = "#FFE4C4";
    end_game_div.className = "end_game";
    end_game_div_element.className = "end_game_element";

    body.appendChild(end_game_div);
    end_game_div.appendChild(end_game_div_element);
    board.style.display = "none";
}
