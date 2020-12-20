var turn = 1;
var buttons = document.getElementsByTagName("button");
var isClickBefore = new Array(buttons.length);
var numberOfTurns = 0;
var resultLabel = document.getElementById("result-label");
resultLabel.style.visibility = 'hidden';

document.getElementById("restart").addEventListener("click" , function (){
    turn = 1;
    numberOfTurns = 0;
    for(var i = 0 ; i < isClickBefore.length;i++)
    {
        isClickBefore[i] = false;
        buttons[i].disabled = false;
        /*buttons[i].style.backgroundImage = "";
        buttons[i].style.transform = "";
        buttons[i].style.transition ="";
        buttons[i].style.backgroundSize = "";
        buttons[i].style.opacity = "";*/
        buttons[i].style = "";
        resultLabel.style = "";
        resultLabel.style.visibility = 'hidden';
    }
    this.blur();
})

for(var i = 0 ; i < buttons.length ; i++)
{
    buttons[i].addEventListener("click" , changeImage);
    isClickBefore[i] = false;
}
function changeImage(event)
{
    var index = Array.from(buttons).indexOf(event.target);
    animation(buttons[index]);
    if(!isClickBefore[index])
    {
        numberOfTurns++;
        if(turn == 1)
        {
            buttons[index].style.backgroundImage = "url('cross.png')";
            buttons[index].style.backgroundSize = "cover";
            buttons[index].disabled = true;
            turn = 2;
        }
        else {
            buttons[index].style.backgroundImage = "url('nought.png')";
            buttons[index].style.backgroundSize = "cover";
            buttons[index].disabled = true;
            turn = 1;
        }
        isClickBefore[index] = true;
    }

    winCondition(turn);
}
function winCondition(turn)
{
    var hasWinner = false;
    if(winCases())
    {
        if(turn == 2)
        {
            // alert("Player 1 wins");
            //resultLabel.style.display = "inline-block";
            resultLabel.style.visibility = 'visible';
            resultLabel.innerHTML = "Player 1 wins";
            hasWinner = true;
        }
        else{
            //alert("Player 2 wins");
            //resultLabel.style.display = "inline-block";
            resultLabel.style.visibility = 'visible';
            resultLabel.innerHTML = "Player 2 wins";
            hasWinner = true;
        }
        for(var i = 0 ; i < buttons.length ; i++)
        {
            buttons[i].disabled = true;
        }
    }
    if(!hasWinner && numberOfTurns == 9)
    {
        //alert("Draw");
        resultLabel.style.visibility = 'visible';
        resultLabel.innerHTML = "Players Draw";
    }
}
function winCases()
{
    for(var i = 0 ; i < 9 ; i+=3) // Win Horizontal
    {
        if(isClickBefore[i] && isClickBefore[i+1] && isClickBefore[i+2])
        {
            if(haveTheSameBackGround(i ,i+1 ,i+2))
            {
                return true;
            }
        }
    }
    for(var i = 0 ; i < 3 ; i++) // Win Vertical
    {
        if(isClickBefore[i] && isClickBefore[i+3] && isClickBefore[i+6])
        {
            if(haveTheSameBackGround(i ,i+3 ,i+6))
            {
                return true;
            }
        }
    }
    if(isClickBefore[0] && isClickBefore[4] && isClickBefore[8]) // first diagonal
    {
        if(haveTheSameBackGround(0 ,4 ,8))
        {
            return true;
        }
    }
    if(isClickBefore[2] && isClickBefore[4] && isClickBefore[6])// second diagonal
    {
        if(haveTheSameBackGround(2 ,4 ,6))
        {
            return true;
        }
    }
    return false;
}
function haveTheSameBackGround(i , j , k) {
    var firstBackground = buttons[i].style.backgroundImage;
    var secondBackground = buttons[j].style.backgroundImage;
    var thirdBackground = buttons[k].style.backgroundImage;
    return (firstBackground == secondBackground) && 
    (firstBackground == thirdBackground) ;
}

function animation(element) {
    //console.log(element);
    element.style.transform = "rotateY(360deg)";
    element.style.transition = "all 1.5s"; 
    //element.style.transitionDelay = "0.3s";
    element.style.opacity = 0;

    var elementOpacity = 0;
    var interval = setInterval(function () {
        element.style.opacity = elementOpacity ;
        elementOpacity += 0.1;
        if(Math.floor(elementOpacity) == 1)
        {
            clearInterval(interval);
        }
    } , 100)
}