/*
Title: Anti-Capitalist Computing: Ternary Code and Fighting Fascists.
Imagined, Designed, and Programmed by: Riley Soto
Date: 12-15-2017
Description: Learn a little bit about Setun, the ternary computer made in Moscow State University, and follow it up with most Soviet of activities: Fighting fascists!
Sources of ideas and inspiration (title, author, URL):
 * 
 *
 *
 
Includes code from (title, author, URL):
 * 
 * 
 *
 
<Reminders, you can delete:>
<Use command + T to auto-indent your code for cleaner formatting>
<Check that variable and function names are easy to read and understand. eg. "squareButton" vs.
"shapeButton2">
<If you can't remember where you found some code, Google the text to find it.>
<Put your name in the name of this file!>
*/


//THIS IS THE PREVIOUS ITERATION OF THE PROJECT, KEPT IT FOR POSTERITY
// var song;
// var lenin;
// var badasssovietwomansoldier;
//
// function preload() {
//   lenin=loadAnimation("assets/pixelated vladimir lenin front.png","assets/pixelated vladimir lenin left.png","assets/pixelated vladimir lenin back.png","assets/pixelated vladimir lenin right.png");
//   badasssovietwomansoldier=loadAnimation("assets/soviet woman soldier sprite.png","assets/soviet woman soldier sprite 2.png");
// }
//
// function setup() {
//   createCanvas(500, 500);
//   background(200,0,0);
//   button = createButton('liberate');
//   button.position(215, 240);
//   button.mousePressed(changeBG);
//   song = loadSound('assets/The Internationale - 8 bit.mp3');
// }
//
// function draw() {
//   animation(lenin, 200, 200);
//   animation(badasssovietwomansoldier, 300, 300);
// }
//
// function mousePressed() {
//   if ( song.isPlaying() ) { // .isPlaying() returns a boolean
//     song.stop();
//     background(200,0,0);
//   } else {
//     song.play();
//     background(200,0,0);
//   }
// }
// function changeBG() {
//   // var val = random(200,200,255);
//   // background(val);
// }
//asteroid clone (core mechanics only)
//arrow keys to move + x to shoot






//NOW HERE'S THE ACTION CODE:

var bullets;
var asteroids;
var ship;
var shipImage, bulletImage, particleImage;
var MARGIN = 20;

function setup() {
createCanvas(1600,820);
  
//MADE MY OWN IMAGES FOR THE SPRITES FOR THE GAME!
bulletImage = loadImage("assets/asteroids_bullet.png");
shipImage = loadImage("assets/asteroids_ship0001.png");
particleImage = loadImage("assets/asteroids_particle.png");

//HERE ARE SETTING THE ATTRIBUTES OF THE SHIP ITSELF (THE SHIP WHICH DOES NOT MOVE UNLESS HIT BY THE ASTEROIDS)
ship = createSprite(width/2, height/2);
ship.maxSpeed = 6;
ship.friction = .9;
ship.setCollider("circle", 0,0, 20);

ship.addImage("normal", shipImage);
ship.addAnimation("thrust", "assets/asteroids_ship0001.png", "assets/asteroids_ship0002.png");


asteroids = new Group();
bullets = new Group();

//THIS SECTION CREATES NEW SMALLER ASTEROIDS AFTER HITTING A LARGER ONE, TELLING IT TO FORM TWO OF THE NEXT LEVEL DOWN AT A RANDOM ANGLE
for(var i = 0; i<8; i++) {
  var ang = random(360);
  var px = width/2 + 1000 * cos(radians(ang));
  var py = height/2+ 1000 * sin(radians(ang));
  createAsteroid(3, px, py);
  }
}

function draw() {
  background(81,120,48);

  //THEN WE HAVE THE INSTRUCTION TEXT AT THE TOP...
  fill(0);
  textAlign(CENTER);
  textSize(36);
  text("Your treads have been disabled by the fascists! Defend the Union! Controls: Left Arrow Key + X", width/2, 40);

  //THIS SECTION TELLS SPTIRES WHERE TO APPEAR ON THE OPPOSITE SIDE WHEN THEY MOVE OFF OF THE MARGIN OF THE GAME
  for(var i=0; i<allSprites.length; i++) {
  var s = allSprites[i];
  if(s.position.x<-MARGIN) s.position.x = width+MARGIN;
  if(s.position.x>width+MARGIN) s.position.x = -MARGIN;
  if(s.position.y<-MARGIN) s.position.y = height+MARGIN;
  if(s.position.y>height+MARGIN) s.position.y = -MARGIN;
  }

  asteroids.overlap(bullets, asteroidHit);

  ship.bounce(asteroids);

  //HERE WE HAVE THE SHIP CONTROLS, NOTICE HOW I MADE THE ROTATION FOR THE RIGHT KEY NEGATIVE, MEANING THE SHIP CAN ONLY TURN LEFT! I THOUGHT THAT WAS A FUNNY JOKE TO PUT IN.
  if(keyDown(LEFT_ARROW))
    ship.rotation -= 2;
  if(keyDown(RIGHT_ARROW))
    ship.rotation += -2;
  if(keyDown(UP_ARROW))
    {
    ship.addSpeed(.2, ship.rotation);
    ship.changeAnimation("thrust");
    }
  else
    ship.changeAnimation("normal");

  //AND THEN WE HAVE THE ACTUAL FIRING OF THE BULLET, THE VARIABLES CHANGE HOW FAST IT TRAVELS (I MADE IT RELATIVELY FAST) AND HOW LONG IT CAN EXIST AFTER LEAVING THE BARREL.
  if(keyWentDown("x"))
    {
    var bullet = createSprite(ship.position.x, ship.position.y);
    bullet.addImage(bulletImage);
    bullet.setSpeed(50+ship.getSpeed(), ship.rotation);
    bullet.life = 13;
    bullets.add(bullet);
    }

  drawSprites();

}
//AND HERE IS THE ACTUAL CODE FOR THE ASTEROIDS, THEIR ROTATION SPEED (WHICH I SLOWED DOWN A LOT) AND THEIR TRAVELLING SPEED AND THE SIZE OF EACH SMALLER LEVEL OF ASTEROID.
function createAsteroid(type, x, y) {
  var a = createSprite(x, y);
  var img  = loadImage("assets/asteroids_particle.png");
  a.addImage(img);
  a.setSpeed(2.5*(type/2), random(360));
  a.rotationSpeed = .1;
  //a.debug = true;
  a.type = type;

  //YES, HERE ARE THE SMALLER SIZES.
  if(type == 2)
    a.scale = .6;
  if(type == 1)
    a.scale = .3;

  //THIS SETS HOW MUCH MASS THEY HAVE, SO WITH HOW MUCH FORCE THEY BUMP INTO THE SHIP.
  a.mass = 2+a.scale;
  a.setCollider("circle", 0, 0, 50);
  asteroids.add(a);
  return a;
}

//THIS MAKES IT SO THAT WHEN AN ASTEROID IS IT THE NEXT TYPE WILL BE ONE SMALLER. I EXPLORED THIS SECTION A LOT AND HAD SOME CRAZY RESULTS.
function asteroidHit(asteroid, bullet) {
var newType = asteroid.type-1;

if(newType>0) {
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  createAsteroid(newType, asteroid.position.x, asteroid.position.y);
  }

//THIS SETS THE RANDOM SPEED FOR THE ASTEROIDS AT THE VERY BEGINNING, ALONG WITH THE FRICTION THEY HAVE (THEY EVENTUALLY SLOW DOWN)
for(var i=0; i<10; i++) {
  var p = createSprite(bullet.position.x, bullet.position.y);
  p.addImage(particleImage);
  p.setSpeed(random(3,5), random(0));
  p.friction = 0.95;
  p.life = 15;
  }

bullet.remove();
asteroid.remove();
}
