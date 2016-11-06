// create canvas
let canvas = <HTMLCanvasElement>document.getElementById('gameCanvas');
let context = canvas.getContext("2d");

let playButton = document.getElementById("playBtn");
playButton.style.visibility = "hidden";

// Background image
let bgReady = false;
let bgImage = new Image();
bgImage.onload = function () {
	bgReady = true;
};
bgImage.src = "images/brick.jpg";

// Death image
let deathReady = false;
let deathImage = new Image();
deathImage.onload = function () {
	deathReady = true;
};
deathImage.src = "images/skull.png";

let dead = false;

// Guy image
let guyReady = false;
let guyImage = new Image();
guyImage.onload = function () {
	guyReady = true;
};
guyImage.src = "images/guy.png";

// Zombie image
let zombieReady = false;
let zombieImage = new Image();
zombieImage.onload = function () {
	zombieReady = true;
};
zombieImage.src = "images/zombie.png";

// Game objects
let guy = {
	speed: 256, // movement in pixels per second
	x: 0,
	y: 0,
  width: 50,
  height: 75
};
let zombie = {
  speed: 64, // movement in pixels per second
  x: 0,
	y: 0,
  width: 50,
  height: 75
};
let zombiesCaught = 0;

let bottom = canvas.height - zombie.height;
let right = canvas.width - zombie.width;


let corners = [
  {x: 0, y: 0},
  {x: 0, y: bottom},
  {x: right, y: 0},
  {x: right, y: bottom}
];

// Handle keyboard controls
let keysDown = {};

addEventListener("keydown", function (e) {
	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
}, false);

playButton.addEventListener("click", function(){
  playButton.style.visibility = "hidden";
  dead = false;
  then = Date.now();
  reset();
  mainloop();
});

// Reset the game
let reset = function () {

  //Place guy in the center
	guy.x = canvas.width / 2 - guy.width / 2;
	guy.y = canvas.height / 2 - guy.height / 2;

	// Throw the zombie in a random corner
  let randomCorner = Math.floor(Math.random() * 4);
  zombie.x = corners[randomCorner].x;
	zombie.y = corners[randomCorner].y;
};

// Update game objects
let update = function (modifier) {
	if (38 in keysDown) { // Player holding up
		guy.y -= guy.speed * modifier;
	}
	if (40 in keysDown) { // Player holding down
		guy.y += guy.speed * modifier;
	}
	if (37 in keysDown) { // Player holding left
		guy.x -= guy.speed * modifier;
	}
	if (39 in keysDown) { // Player holding right
		guy.x += guy.speed * modifier;
	}

  //keep guy on the screen
  if (guy.x < 0){
    guy.x = 0;
  }
  else if (guy.x > right){
    guy.x = right;
  }
  if (guy.y < 0){
    guy.y = 0;
  }
  else if (guy.y > bottom){
    guy.y = bottom;
  }

  //move zombie in direction of guy
  let xDiff = guy.x - zombie.x;
  let yDiff = guy.y - zombie.y;

  if(xDiff > 0){
    zombie.x += zombie.speed * modifier;
  }
  else if(xDiff < 0){
    zombie.x -= zombie.speed * modifier;
  }
  if(yDiff > 0){
    zombie.y += zombie.speed * modifier;
  }
  else if(yDiff < 0){
    zombie.y -= zombie.speed * modifier;
  }

	// Are they touching?
	if (
		guy.x <= (zombie.x + zombie.width)
		&& zombie.x <= (guy.x + guy.width)
		&& guy.y <= (zombie.y + zombie.height)
		&& zombie.y <= (guy.y + guy.height)) {
    dead = true;
    context.drawImage(deathImage, 0, 0, canvas.width, canvas.height);
    context.font = '40pt Calibri';
    context.fillStyle = 'red';
    context.fillText('You\'re dead!', 250, 400);
	}
};

// Draw everything
let render = function () {
  if(dead){
    if (deathReady) {
      context.drawImage(deathImage, 0, 0, canvas.width, canvas.height);
      context.font = '40pt Calibri';
      context.fillStyle = 'red';
      context.fillText('You\'re dead!', 250, 400);
     }
  }
  else{
  	if (bgReady) {
  		context.drawImage(bgImage, 0, 0, canvas.width, canvas.height);
  	}

  	if (guyReady) {
  		context.drawImage(guyImage, guy.x, guy.y, guy.width, guy.height);
  	}

  	if (zombieReady) {
  		context.drawImage(zombieImage, zombie.x, zombie.y, zombie.width, zombie.height);
  	}
  }
};

// The main game loop
let mainloop = function () {
	let now = Date.now();
	let delta = now - then;

	update(delta / 1000);
	render();

  if(!dead){
    then = now;
  	// Request to do this again ASAP
  	animFrame(mainloop);
  }
  else{
    playButton.style.visibility = "visible";
  }
};

// Cross-browser support for requestAnimationFrame
let w = window;
let animFrame = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        null ;

// Let's play this game!
let then = Date.now();
reset();
mainloop();
