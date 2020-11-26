var on = document.getElementById("start_button");

on.onclick = przekierowanie;


function przekierowanie()
{
    var inputV = document.getElementById("name").value;
    if(inputV == "")
    {
        alert("Musisz podać imię");
    }
    else
    {
        sessionStorage.setItem("name", inputV)
       location.href = "board.html";
       

    }
}

