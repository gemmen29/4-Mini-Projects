var grid = document.getElementById("grid");
var resultDiv = document.getElementById("result");
var scoreSpan = document.getElementById("score");
var width = 4;
var squares = [];
var score = 0;

function createBoard() {
    for (var i = 0; i < width * width; i++) {
        var element = document.createElement("div");
        element.innerHTML = "0";
        grid.appendChild(element);
        squares[i] = element;
    }
    generateRandomNumber();
    generateRandomNumber();
    //generateTwos();
    makeColors();
}

createBoard();

function generateTwos() // for testing
{
    /*for(var i = 0 ; i < squares.length ; i+=4) {
        squares[i].innerHTML = "2";
    }*/
    /*for(var i = 0 ; i < width ; i++) {
        squares[i].innerHTML = "2";
    }*/
}

function generateRandomNumber() {
    var random = Math.floor(Math.random() * squares.length);
    if (squares[random].innerHTML == 0) {
        squares[random].innerHTML = 2;
        isPlayerLose();
    } else {
        generateRandomNumber();
    }
}

function moveLeftORRight(direction) {
    for (var i = 0; i < squares.length; i += 4) {
        var element1 = parseInt(squares[i].innerHTML);
        var element2 = parseInt(squares[i + 1].innerHTML);
        var element3 = parseInt(squares[i + 2].innerHTML);
        var element4 = parseInt(squares[i + 3].innerHTML);

        var row = [element1, element2, element3, element4];
        var filteredRow = row.filter(num => num > 0);
        var missing = row.length - filteredRow.length;
        var zeros = Array(missing).fill(0);
        if (direction == "right") {
            var newRow = zeros.concat(filteredRow);
        } else if (direction == "left") {
            var newRow = filteredRow.concat(zeros);
        } else
            return;
        squares[i].innerHTML = newRow[0];
        squares[i + 1].innerHTML = newRow[1];
        squares[i + 2].innerHTML = newRow[2];
        squares[i + 3].innerHTML = newRow[3];
    }
}

function moveUpORDown(direction) {
    for (var i = 0; i < width; i++) {
        var element1 = parseInt(squares[i].innerHTML);
        var element2 = parseInt(squares[i + width].innerHTML);
        var element3 = parseInt(squares[i + (width * 2)].innerHTML);
        var element4 = parseInt(squares[i + (width * 3)].innerHTML);

        var row = [element1, element2, element3, element4];
        var filteredRow = row.filter(num => num > 0);
        var missing = row.length - filteredRow.length;
        var zeros = Array(missing).fill(0);
        if (direction == "down") {
            var newRow = zeros.concat(filteredRow);
        } else if (direction == "up") {
            var newRow = filteredRow.concat(zeros);
        } else
            return;
        squares[i].innerHTML = newRow[0];
        squares[i + width].innerHTML = newRow[1];
        squares[i + (width * 2)].innerHTML = newRow[2];
        squares[i + (width * 3)].innerHTML = newRow[3];
    }
}

function concatRowRight() {
    for (var i = squares.length - 2; i >= 0; i--) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
            squares[i].innerHTML = total;
            squares[i + 1].innerHTML = 0;
            score += total;
            scoreSpan.innerHTML = score;
        }
    }
    isPlayerWin();
}

function concatRowLeft() {
    for (var i = 0; i < squares.length - 1; i++) {
        if (squares[i].innerHTML === squares[i + 1].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + 1].innerHTML);
            squares[i].innerHTML = total;
            squares[i + 1].innerHTML = 0;
            score += total;
            scoreSpan.innerHTML = score;
        }
    }
    isPlayerWin();
}

function concatColumnUp() {
    for (var i = 0; i < squares.length - width; i++) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
            squares[i].innerHTML = total;
            squares[i + width].innerHTML = 0;
            score += total;
            scoreSpan.innerHTML = score;
        }
    }
    isPlayerWin();
}

function concatColumnDown() {
    for (var i = squares.length - width - 1; i >= 0; i--) {
        if (squares[i].innerHTML === squares[i + width].innerHTML) {
            var total = parseInt(squares[i].innerHTML) + parseInt(squares[i + width].innerHTML);
            squares[i].innerHTML = total;
            squares[i + width].innerHTML = 0;
            score += total;
            scoreSpan.innerHTML = score;
        }
    }
    isPlayerWin();
}

function control(event) {
    if (event.key === 'ArrowRight') {
        keyRight();
    } else if (event.key === 'ArrowLeft') {
        keyLeft();
    } else if (event.key === 'ArrowUp') {
        keyUp();
    } else if (event.key === 'ArrowDown') {
        keyDown();
    }
}

document.addEventListener("keyup", control);

function keyRight() {
    moveLeftORRight("right");
    concatRowRight();
    moveLeftORRight("right")
    generateRandomNumber();
    makeColors();
}

function keyLeft() {
    moveLeftORRight("left");
    concatRowLeft();
    moveLeftORRight("left");
    generateRandomNumber();
    makeColors();
}

function keyUp() {
    moveUpORDown("up");
    concatColumnUp()
    moveUpORDown("up");
    generateRandomNumber();
    makeColors();
}

function keyDown() {
    moveUpORDown("down");
    concatColumnDown()
    moveUpORDown("down");
    generateRandomNumber();
    makeColors();
}

function isPlayerWin() {
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == '64') {
            resultDiv.style.visibility = "visible";
            resultDiv.innerHTML = "You Win";
            resultDiv.style.transform = "rotate(-45deg)";
            resultDiv.style.transition = "2s all";
            document.removeEventListener("keyup", control);
        }
    }
}

function isPlayerLose() {
    var zeros = 0;
    for (var i = 0; i < squares.length; i++) {
        if (squares[i].innerHTML == '0') {
            zeros++;
        }
    }
    if (zeros === 0) {
        resultDiv.style.visibility = "visible";
        resultDiv.innerHTML = "GameOver";
        resultDiv.style.transform = "rotate(-45deg)";
        resultDiv.style.transition = "2s all";
        document.removeEventListener("keyup", control);
    }
}

function makeColors() {
    for (var i = 0; i < squares.length; i++) {
        var current = squares[i];
        if (current.innerHTML == '0') {
            current.style.backgroundColor = "#CAC0B4";
            current.style.color = "#CAC0B4";
        } else if (current.innerHTML == '2') {
            current.style.backgroundColor = "#EEE4DA";
            current.style.color = "#776E65";
        } else if (current.innerHTML == '4') {
            current.style.backgroundColor = "#EDE0C8";
            current.style.color = "#776E65";
        } else if (current.innerHTML == '8') {
            current.style.backgroundColor = "#F2B179";
            current.style.color = "#F9F6F2";
        } else if (current.innerHTML == '16') {
            current.style.backgroundColor = "#F59563";
            current.style.color = "#F9F6F2";
        } else if (current.innerHTML == '32') {
            current.style.backgroundColor = "#F67C60";
            current.style.color = "#F9F6F2";
        } else if (current.innerHTML == '64') {
            current.style.backgroundColor = "#F65E3B";
            current.style.color = "#F9F6F2";
        } else { // Not Achievable
            current.style.backgroundColor = "azure"
            current.style.color = "black";
        }
    }
}