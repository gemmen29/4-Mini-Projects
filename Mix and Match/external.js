var buttons = document.getElementsByTagName("button");
var itemEnter = false;
var visableButtons = 0;
var clickedButtons = new Array(2);

var images = 
[
    "url('images/1.png')" , "url('images/2.png')", 
    "url('images/3.png')" , "url('images/4.png')",
    "url('images/5.png')" , "url('images/6.png')",
] ;
var shiffledArray = new Array(12);
var imagesOccurances = new Array(6);
imagesOccurances.fill(0);
shiffledArray.fill("");

function shiffleImages()
{
    for(var i = 0 ; i < shiffledArray.length;i++)
    {
        do {
            var randomNum = Math.floor(Math.random() * 6);
        }while(imagesOccurances[randomNum] == 2);
        //console.log(images[randomNum]);
        shiffledArray[i] = images[randomNum];
        imagesOccurances[randomNum]++;
        /*if(imagesOccurances[randomNum] < 2)
        {
            shiffledArray[randomNum] = images[randomNum];
            imagesOccurances[randomNum]++
        }*/
        /*else
        {
            do {
                var anthorRandom =  Math.floor(Math.random() * 6);
            }while(imagesOccurances[anthorRandom] != 2);
            shiffledArray[randomNum] = images[anthorRandom];
            imagesOccurances[randomNum]++
        }*/
    }
}

function intializeButtons()
{
    for(let i = 0 ; i < buttons.length ; i++)
    {
        buttons[i].addEventListener("click" , function () {
            this.style.userSelect = "none";
            if(!itemEnter)
            {
                if(visableButtons == 2)
                {
                    returnButtonToFirstState(clickedButtons);
                    visableButtons = 0;
                }
                this.disabled = true;
                clickedButtons[visableButtons++] = this;
                itemEnter = true;
                var element = this;
                element.style.transform = "rotateY(180deg)";
                element.style.transition = "all 3s"; 
                element.style.backgroundSize = "contain";
                element.style.backgroundRepeat="no-repeat";
                //element.style.transitionDelay = "0.3s";
                setTimeout(function () {
                    element.style.backgroundImage = shiffledArray[i];
                } , 750)

                setTimeout(() => {
                    itemEnter = false;
                    if(visableButtons == 2 && compareBackground(clickedButtons[0] , clickedButtons[1]))
                    {
                        clickedButtons[0].style.transform = "rotateX(-180deg)";
                        clickedButtons[0].style.transition = "all 2s"; 
                        clickedButtons[1].style.transform = "rotateX(-180deg)";
                        clickedButtons[1].style.transition = "all 2s"; 
                        setTimeout(function () {
                            clickedButtons[0].style.visibility = 'hidden';
                            clickedButtons[1].style.visibility = 'hidden';
                            visableButtons = 0;
                        } , 0);
                        setTimeout(function () {
                            console.log(winGame())
                            if(winGame())
                            {
                                document.getElementById("winning-label").style.visibility = "visible";
                            }
                        } , 2000);
                 
                    }
                }, 1500);
            }        
        });
    }
}

shiffleImages();
intializeButtons();

function compareBackground(button1 , button2)
{
    return button1.style.backgroundImage === button2.style.backgroundImage;
}
function returnButtonToFirstState(buttons)
{
    //console.log(buttons[0].style.backgroundImage);
    var currnentImageButton1 , currnentImageButton2;

    var button1 = buttons[0];
    currnentImageButton1 = button1.style.backgroundImage ;
    button1.setAttribute("style" , "");
    var button2 = buttons[1];
    currnentImageButton2 = button2.style.backgroundImage ;
    button2.setAttribute("style" , "");
 
    button1.style.backgroundImage = currnentImageButton1;
    button1.style.transform = "rotateY(-45deg)";
    button1.style.transition = "all 2s";
    button1.style.backgroundSize = "contain";
    button1.style.backgroundRepeat="no-repeat";
    button2.style.backgroundImage = currnentImageButton2;
    button2.style.transform = "rotateY(-45deg)";
    button2.style.transition = "all 2s";
    button2.style.backgroundSize = "contain";
    button2.style.backgroundRepeat="no-repeat";

    setTimeout(function () {
        button1.style.backgroundImage = "";
        button2.style.backgroundImage = "";
    } , 500);

    setTimeout(function () {
        button1.disabled = false;
        button1.setAttribute("style" , "");
        button2.disabled = false;
        button2.setAttribute("style" , "");
    } , 1500);
    
}

function winGame()
{
    var numOfHiddens = 0;
    for(var i = 0 ; i < buttons.length ; i++)
    {
        if(buttons[i].style.visibility === "hidden")
        {
            numOfHiddens++;
        }
    }
    return numOfHiddens == buttons.length;
}

