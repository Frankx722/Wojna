var on = document.getElementById("start_button");
var input;

on.onclick = function przekierowanie()
{
    var input = document.getElementById("name").value;
    if(input == "")
    {
        alert("Musisz podać imię");
    }
    else
    {
        sessionStorage.setItem("name", input)
       location.href = "board.html";
       

    }
}

