
var name = sessionStorage.getItem("name");
document.getElementById("name").innerHTML = name;
var decks_id = "";
var player_points = 1;
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

endgame();


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
            draw_success1 = data.success;
             played_cards_code = data.cards[0].code;
            played_cards_value = data.cards[0].value;
            played_cards_img = data.cards[0].image;
            

           
        })
        .catch((error) => {
            endgame();
        }).then(convert)

        await fetch('https://deckofcardsapi.com/api/deck/' + decks_id + '/pile/player2/draw/')
        .then(response => response.json())
        .then(data =>
            {
                console.log(data);
                draw_success2 = data.success;
                console.log(draw_success1);
                 si_cards_code = data.cards[0].code;
                si_cards_value = data.cards[0].value;
                si_cards_img = data.cards[0].image;

          
                

            })
            .catch((error) => {
                endgame();
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
                if(si_cards_value == 'ACE')
                {
                    si_cards_value = '1';
                }

                if(si_cards_value == 'JACK')
                {
                    si_cards_value = '11';
                }

                if(si_cards_value == 'QUEEN')
                {
                    si_cards_value = '12';
                }

                if(si_cards_value == 'KING')
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
    var winner = "";
    
    var body = document.body;
    var board = document.getElementById("board");
    board.style.display = "none";
    var end_game_div = document.createElement("div");
    var end_game_div_element = document.createElement("div");
    end_game_div.style.backgroundColor = "#FFE4C4";
    end_game_div.className = "end_game";
    end_game_div_element.className = "end_game_element";
    var end_game_text_container = document.createElement("div");
    end_game_text_container.className = "end_game_text_container";
    var text_container1 = document.createElement("div");
    text_container1.className = "podsumowanie";
    var text_container2 = document.createElement("div");
    text_container2.className = "text_container";
    var text_container3 = document.createElement("div");
    text_container3.className = "text_container";
    var text_container4 = document.createElement("div");
    text_container4.className = "textS_container";
    var text_container5 = document.createElement("div");
    text_container5.className = "textS_container";

    var endOfGame = document.createTextNode("KONIEC GRY");
    var text1 = document.createTextNode("Podsumowanie");
    var text2 = document.createTextNode(name);
    var text3 = document.createTextNode("Si");
    var text4 = document.createTextNode(player_points);
    var text5 = document.createTextNode(si_points)

    body.appendChild(end_game_div);
    end_game_div.appendChild(end_game_div_element);
    end_game_div_element.appendChild(end_game_text_container);
    end_game_div_element.appendChild(text_container1);
    end_game_div_element.appendChild(text_container2);
    end_game_div_element.appendChild(text_container3);
    end_game_div_element.appendChild(text_container4);
    end_game_div_element.appendChild(text_container5);

    end_game_text_container.appendChild(endOfGame);
    text_container1.appendChild(text1);
    text_container2.appendChild(text2);
    text_container3.appendChild(text3);
    text_container4.appendChild(text4);
    text_container5.appendChild(text5);

    var werdykt = document.createElement("div");
    werdykt.className = "werdykt";
    if(player_points>si_points){
        winner = "Zwycięża " +name;
    }else if(si_points>player_points){
        winner = "Zwycięża Si";
    }else if(si_points == player_points){
        winner = "Remis";
    }

    var werdykt_text = document.createTextNode("Wynik: " + winner)
    end_game_div_element.appendChild(werdykt);
    werdykt.appendChild(werdykt_text);

    //restart button
    var button = document.createElement("div");
    button.className = "restart";

    end_game_div_element.appendChild(button);

    var button_text = document.createTextNode("Zagraj jeszcze raz");
    button.appendChild(button_text);

 //   button.onclick = window.location.reload();
//name change button

    var nameChangeButton = document.createElement("div");
    nameChangeButton.className = "nameChange";

    end_game_div_element.appendChild(nameChangeButton);

    var nameChange_text = document.createTextNode("Zmień nick");
    nameChangeButton.appendChild(nameChange_text);

   // nameChangeButton.onclick = changeLocation();
}

function changeLocation()
{
    location.href = "index.html"
}