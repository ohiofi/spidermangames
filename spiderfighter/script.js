/*global round,push,pop,scale,keyIsPressed,console,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/

const GRAVITY = -1.5;
let img, miles, electro, sandman, vulture, goblin, venom, doc, projectiles;
var playerState = "idle";
var gameState = "game";
let pumpkins = [];
let debugMode = false;
let gameOver = false;
let timer, spiderTimer, throwTimer, backgroundMusic, levelSound, jumpSound, explosionSound, damageSound, pumpkinSound, screamSound, webSound;
let shootTimer = 40;
let level = 1;
let nextLevel = false;
let points = 0;
let webs = [], sandball = [], shocks = [];
let projectile;
let  electroman;



function preload(){
  
  img = {
    bg:loadImage("./assets/background.png"),
  }
  miles = {
   stand:loadImage("./assets/miles_stand.png"),
   walk:loadImage("./assets/miles_walk.png"),
   hit:loadImage("./assets/miles_hit.png"),
  }
  electro = {
    stand:loadImage("./assets/electro.png"),
    shock:loadImage("./assets/Electro%20shock.png"),
  }
  sandman = {
    stand:loadImage("./assets/sandman_stand.png"),
    walk:loadImage("./assets/sandman_walk.png"),
  }
  vulture = {
    stand:loadImage("./assets/vulture.png"),
  }
  goblin = {
    stand:loadImage("./assets/goblin%20idle.png"),
  }
  venom = {
    stand:loadImage("./assets/venom_stand.png"),
    walk:loadImage("./assets/venom_walk.png"),
  }
  doc = {
    stand:loadImage("./assets/doc_stand.png"),
    walk:loadImage("./assets/doc_walk.png"),
  }
  projectiles = {
    shock:loadImage("./assets/Untitled-1.png"),
    web:loadImage("./assets/web.png"),
  }
  
  
  
}
// create variables up here
function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
   electroman = new Electro(width * 0.25, height * 0.5);
   spiderman = new Spiderman(width * 0.75,height * 0.5);
   
}

function draw(){ // this is a built-in forever loop
  if(gameState == "lose")
    {
      background(img.bg);
      textSize(32);
      text('YOU LOSE', width / 2, height / 2);
      fill(255, 0, 0);
    }
  if(gameState == "win")
    {
      background(img.bg);
      textSize(32);
      text('YOU WIN', width / 2, height / 2);
      fill(0, 255, 0);
    }
   
  if(gameState == "game")
    {
  background(img.bg);
  showWebs();
  shootAndShowShocks();

    electroman.show();
    electroman.move();

  spiderman.show();
  spiderman.move();
      
      if(spiderman.health <= 0)
        {
          gameState = "lose";
        }
      if(electroman.health <= 0)
        {
          gameState = "win";
        }
      // electroman.shootShocks();
    }
  
  

  
}
function keyPressed()
{
  if(key === ' ')
  {
    spiderman.throwWeb();
  }
  else
  {
    return false;
  }
}

function showWebs()
{ 
  for(let i = 0; i < webs.length; i++)
  {
    
    webs[i].show();
    webs[i].move();
    
      
      if(electroman.contains(webs[i].x+webs[i].width/2,webs[i].y+webs[i].height/2))
        {
          electroman.health -= 10;
          webs.splice(i,1);
        }
    }
  }
function shootAndShowShocks()
{
   if(frameCount % 100 < 3){
        electroman.shootShocks();
      }
  for(let i = 0; i < shocks.length; i++)
    {
      shocks[i].show();
      shocks[i].move();
      
      if(spiderman.contains(shocks[i].x+shocks[i].width/2,shocks[i].y+shocks[i].height/2))
        {
        
          spiderman.health -= 10;
          shocks.splice(i,1);
          background("red")
        }
    }
}



 