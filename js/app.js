// Enemies our player must avoid
//set the victory text to none and set player win to false
let victoryText = document.getElementById('congrats');
victoryText.style.display = "none";
let playerWin = false;
//create a random array for 4 predetermined Y coordinates the bugs can be on
const randYCords = [40, 130, 310, 220];
var Enemy = function(x, y) {
    //randomize the starting position from the array
    let getStartPos = randYCords[Math.floor(Math.random()*randYCords.length)];
    //set the x position to 0 so we have the bugs starting from the left side of the
     //screen
    //set the y position to the random starting position
    this.sprite = 'images/enemy-bug.png';
    this.x = 0;
    this.y = getStartPos;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    //assign a speed variable randomly
    this.speed = Math.floor(Math.random(1)*Math.floor(3) + 1);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //if the bug's position is greater than 500 (off the screen) then reset their
     //position and also reset their speed 
    if (this.x > 500){
        this.y = randYCords[Math.floor(Math.random()*randYCords.length)];
        this.x = 0;
        this.speed = Math.floor(Math.random(1)*Math.floor(3) + 1);
    } else {
        let translate = Math.floor(this.speed * 100 * dt);
        this.x += translate   
    }
     
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//set three instances of the bug enemy
let singleEnemy1 = new Enemy();
let singleEnemy2 = new Enemy();
let singleEnemy3 = new Enemy();
//put all three of the bugs in the array
let allEnemies = [singleEnemy1, singleEnemy2, singleEnemy3];
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

//set the starting position for the boy
var Player = function (){
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
}


Player.prototype.update = function(){
    //calculate the range that the bug should be in for the collision to occur
    //create a placeholder value to adjust from the relative x and y coordinates
    const collisionRadius = 12;
    //test the x and y of the three bugs to see how close they are to the player
    let enemyOneCollideX = singleEnemy1.x >= this.x - collisionRadius &&
                                singleEnemy1.x <= this.x + collisionRadius;
    let enemyOneCollideY = singleEnemy1.y >= this.y - collisionRadius &&
                                singleEnemy1.y <= this.y + collisionRadius;

    let enemyTwoCollideX = singleEnemy2.x >= this.x - collisionRadius &&
                                singleEnemy2.x <= this.x + collisionRadius; 
    let enemyTwoCollideY = singleEnemy2.y >= this.y - collisionRadius &&
                                singleEnemy2.y <= this.y + collisionRadius;

    let enemyThreeCollideX = singleEnemy3.x >= this.x - collisionRadius &&
                                singleEnemy3.x <= this.x + collisionRadius;
    let enemyThreeCollideY = singleEnemy3.y >= this.y - collisionRadius &&
                                singleEnemy3.y <= this.y + collisionRadius;

    //if the collision occurs then reset the player's position to the beginning
    if (enemyOneCollideX && enemyOneCollideY || 
        enemyTwoCollideX && enemyTwoCollideY || 
        enemyThreeCollideX && enemyThreeCollideY){
        this.y = 400;
    }

    //if the player reaches the water display the victory message
    if (this.y === -50){
        playerVictory();
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

//add 100 to the player's position depending on which key is pressed
    //add default values so the player won't go off the stage
Player.prototype.handleInput = function(){
 if (!playerWin){
    if (event.keyCode === 37){
        this.x -= 100;
        if (this.x <= 0){
            this.x = 0;
        }
    } else if (event.keyCode === 39){
        this.x += 100;
         if (this.x >= 400){
            this.x = 400;
        }
    }else if (event.keyCode === 38){
        this.y -= 90;
         if (this.y < 0){
            this.y = -50;
        }
    }else if (event.keyCode === 40){
        this.y += 90;
        if (this.y >= 400){
            this.y = 400;
        }
    }
 }
    
}

const player = new Player();


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//reset the player after they have won if they choose to play again
function reset(){
    player.y = 400;
    Enemy.speed = Math.floor(Math.random(1)*Math.floor(3) + 1);;
    playerWin = false;
    victoryText.style.display = "none";  
}

//display the victory text
function playerVictory(){
    playerWin = true;
    victoryText.style.display = "block";
}


