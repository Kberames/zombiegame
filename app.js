var canvas = document.getElementById('gameCanvas');
var context = canvas.getContext("2d");
var playButton = document.getElementById("playBtn");
playButton.style.visibility = "hidden";
var bgReady = false;
var bgImage = new Image();
bgImage.onload = function () {
    bgReady = true;
};
bgImage.src = "images/brick.jpg";
var deathReady = false;
var deathImage = new Image();
deathImage.onload = function () {
    deathReady = true;
};
deathImage.src = "images/skull.png";
var dead = false;
var guyReady = false;
var guyImage = new Image();
guyImage.onload = function () {
    guyReady = true;
};
guyImage.src = "images/guy.png";
var zombieReady = false;
var zombieImage = new Image();
zombieImage.onload = function () {
    zombieReady = true;
};
zombieImage.src = "images/zombie.png";
var guy = {
    speed: 256,
    x: 0,
    y: 0,
    width: 50,
    height: 75
};
var zombie = {
    speed: 64,
    x: 0,
    y: 0,
    width: 50,
    height: 75
};
var zombiesCaught = 0;
var bottom = canvas.height - zombie.height;
var right = canvas.width - zombie.width;
var corners = [
    { x: 0, y: 0 },
    { x: 0, y: bottom },
    { x: right, y: 0 },
    { x: right, y: bottom }
];
var keysDown = {};
addEventListener("keydown", function (e) {
    keysDown[e.keyCode] = true;
}, false);
addEventListener("keyup", function (e) {
    delete keysDown[e.keyCode];
}, false);
playButton.addEventListener("click", function () {
    playButton.style.visibility = "hidden";
    dead = false;
    then = Date.now();
    reset();
    mainloop();
});
var reset = function () {
    guy.x = canvas.width / 2 - guy.width / 2;
    guy.y = canvas.height / 2 - guy.height / 2;
    var randomCorner = Math.floor(Math.random() * 4);
    zombie.x = corners[randomCorner].x;
    zombie.y = corners[randomCorner].y;
};
var update = function (modifier) {
    if (38 in keysDown) {
        guy.y -= guy.speed * modifier;
    }
    if (40 in keysDown) {
        guy.y += guy.speed * modifier;
    }
    if (37 in keysDown) {
        guy.x -= guy.speed * modifier;
    }
    if (39 in keysDown) {
        guy.x += guy.speed * modifier;
    }
    if (guy.x < 0) {
        guy.x = 0;
    }
    else if (guy.x > right) {
        guy.x = right;
    }
    if (guy.y < 0) {
        guy.y = 0;
    }
    else if (guy.y > bottom) {
        guy.y = bottom;
    }
    var xDiff = guy.x - zombie.x;
    var yDiff = guy.y - zombie.y;
    if (xDiff > 0) {
        zombie.x += zombie.speed * modifier;
    }
    else if (xDiff < 0) {
        zombie.x -= zombie.speed * modifier;
    }
    if (yDiff > 0) {
        zombie.y += zombie.speed * modifier;
    }
    else if (yDiff < 0) {
        zombie.y -= zombie.speed * modifier;
    }
    if (guy.x <= (zombie.x + zombie.width)
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
var render = function () {
    if (dead) {
        if (deathReady) {
            context.drawImage(deathImage, 0, 0, canvas.width, canvas.height);
            context.font = '40pt Calibri';
            context.fillStyle = 'red';
            context.fillText('You\'re dead!', 250, 400);
        }
    }
    else {
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
var mainloop = function () {
    var now = Date.now();
    var delta = now - then;
    update(delta / 1000);
    render();
    if (!dead) {
        then = now;
        animFrame(mainloop);
    }
    else {
        playButton.style.visibility = "visible";
    }
};
var w = window;
var animFrame = window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    null;
var then = Date.now();
reset();
mainloop();
