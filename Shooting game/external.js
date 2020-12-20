var leftPlayerOffset = 0; // move player horizontally
var topPlayerOffset = 0; // move player vertically

var amountHorizontal = 15; // step horizontally for player
var amountVertical = 10; // step vertically for player

var leftEnemyOffset = 0;
var topEnemyOffset = 0;

var enemyWidth = 80;
var enemyHeight = 60;

var player = document.getElementById("player");
var parent = document.getElementById("parent");
var score = document.getElementById("score");
var bullet = document.getElementsByClassName("bullet")[0];
var enemy = document.getElementsByClassName("enemy")[0];
var enemyMove = enemy.offsetTop - 100;
var isBulletFired = false;
var scoreCounter = 0;
var speed = 40;
var countTurn = 0;

leftPlayerOffset = player.offsetLeft - parent.offsetLeft;
topPlayerOffset = player.offsetTop - parent.offsetTop;
document.addEventListener("DOMContentLoaded", function() {
    var current = setInterval(function() {
        enemy.style.top = enemyMove + "px";
        enemyMove += 2;
        if (enemyMove > 690) {
            var gameOver = document.createElement("div");
            var text = document.createTextNode("Game Over");
            gameOver.appendChild(text);
            parent.appendChild(gameOver);
            gameOver.style = "position : relative;font-size : 100px ;color : white;top : 12%;left : 25%";
            countTurn++;
            if (countTurn == 25) {
                if (speed > 20)
                    speed -= 5;
                countTurn = 0;
            }
            clearInterval(current);
            document.removeEventListener("keydown", control);
        }
    }, speed);
});

document.addEventListener("keydown", control);

function control(event) {
    if (event.key === ' ') // space
    {
        if (!isBulletFired) {
            // get Enemy Position
            leftEnemyOffset = enemy.offsetLeft - parent.offsetLeft;
            topEnemyOffset = enemy.offsetTop - parent.offsetTop;

            isBulletFired = true;
            bullet.style.visibility = "visible";
            var bulletLeftOffset = leftPlayerOffset + 42
            var bulletTopOffset = topPlayerOffset - 120
            bullet.style.left = bulletLeftOffset + "px";
            bullet.style.top = bulletTopOffset + "px";
            var current = setInterval(function() {
                bulletTopOffset -= 5;
                bullet.style.top = bulletTopOffset + "px";
                //console.log("Bullet : " + bulletLeftOffset + " , " + bulletTopOffset);
                //console.log("Enemy : " + leftEnemyOffset + " , " + topEnemyOffset);
                var checkTopOffset = bulletTopOffset <= topEnemyOffset &&
                    bulletTopOffset >= topEnemyOffset - enemyWidth;
                var checkLeftOffset = bulletLeftOffset >= leftEnemyOffset + 3 &&
                    bulletLeftOffset <= leftEnemyOffset + enemyHeight;
                if (checkTopOffset && checkLeftOffset) {
                    scoreCounter += 10;
                    score.innerHTML = scoreCounter;
                    bullet.style.visibility = "hidden";
                    enemy.style.top = "-30%";
                    var random = Math.floor(Math.random() * 8) + 1;
                    enemy.style.left = random * 10 + "%";
                    enemyMove = enemy.offsetTop - 100;
                    isBulletFired = false;
                    clearInterval(current);
                }
                if (bulletTopOffset < -140) // -120   // range 95 to 5
                {
                    isBulletFired = false;
                    clearInterval(current);
                }
            }, 10);
        }
    }
    if (event.key === 'ArrowRight') // right
    {
        //console.log(leftPlayerOffset);
        if (leftPlayerOffset < 895) {
            leftPlayerOffset += amountHorizontal;
            player.style.left = leftPlayerOffset + "px";
        }
    }
    if (event.key === 'ArrowLeft') // left
    {
        //console.log(leftPlayerOffset);
        if (leftPlayerOffset > 10) {
            leftPlayerOffset -= amountHorizontal;
            player.style.left = leftPlayerOffset + "px";
        }
    }
    if (event.key === 'ArrowUp') // up
    {
        console.log(topPlayerOffset);
        if (topPlayerOffset > 9) {
            topPlayerOffset -= amountVertical;
            player.style.top = topPlayerOffset + "px";
        }
    }
    if (event.key === 'ArrowDown') // down
    {
        console.log(topPlayerOffset);
        if (topPlayerOffset < 675) {
            topPlayerOffset += amountVertical;
            player.style.top = topPlayerOffset + "px";
        }
    }
}