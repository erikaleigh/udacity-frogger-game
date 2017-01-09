// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.speed = speed;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x >= 505) {
      this.x = -100;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player =  function(x, y) {
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
};

// Link any Player instances to checkCollisions function
Player.prototype.update = function(dt) {
  this.checkCollisions();
};
// Render Player
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Set boundaries for player so it won't exit canvas, runs win function if the // player reaches the water
Player.prototype.handleInput = function(keys){
    switch(keys) {
      case 'left':
        if (this.x === 0) {
        }
        else {
          this.x += - 100;
        }
        break;
      case 'right':
        if (this.x === 400) {
        }
        else {
          this.x += + 100;
        }
        break;
      case 'up':
        if (this.y === 25) {
          this.win();
        }
        else {
          this.y += - 100;
        }
        break;
      case 'down':
        if (this.y === 425) {
        }
        else {
          this.y += + 100;
        }
        break;
    }
}
// Reset function for when the player wins or loses
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 425;
}
// Checks for collisions between player and enemy, runs lose function if true
Player.prototype.checkCollisions = function() {
  for (var i = 0; i < allEnemies.length; i++) {
    var bugs = allEnemies[i];
      if (bugs.x < this.x + 60 &&
        bugs.x + 60 > this.x &&
        bugs.y < this.y + 40 &&
        40 + bugs.y > this.y){
          this.lose();
  }
  }
}
// Writes "You Win!" if the player reaches the water without collision, runs
// reset function
Player.prototype.win = function() {
  ctx.font = "48px sans serif";
  ctx.fillText("You Win!", 145, 40);
  this.reset();
}

// Writes "Game Over!" if the player loses, runs reset function
Player.prototype.lose = function() {
  ctx.font = "48px sans serif";
  ctx.fillStyle = "red";
  ctx.fillText("Game Over!", 145, 40);
  this.reset();
}

// Clear "You Win!" or "Game Over!" text
  // ctx.clearRect(145, 4, 250, 45);

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player(200,425);
var enemyOne = new Enemy(-100,60,100);
var enemyTwo = new Enemy(-100,140,175);
var enemyThree = new Enemy(-100,230,125);
var enemyFour = new Enemy(-100, 140, 75);
var allEnemies = [enemyOne, enemyTwo, enemyThree, enemyFour];


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
