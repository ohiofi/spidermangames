/*global round,push,pop,scale,keyIsPressed,console,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/

const GRAVITY = -1.5;
let img, explosion;
let spiderman, goblin;
let platforms = [];
let coins = [];
var playerState = "idle";
var gameState;
let pumpkins = [];
let debugMode = false;
let targetY;
let gameOver = false;
let timer, spiderTimer, throwTimer, backgroundMusic, levelSound, jumpSound, explosionSound, damageSound, pumpkinSound, screamSound, webSound;
let eAnimation = [];
let explosions = [];
let webs = [];
let shootTimer = 40;
let level = 1;
let nextLevel = false;
let points = 0;


function preload(){
  webSound = new Audio("./assets/sfx-sounds-damage3.wav");
  screamSound = new Audio("./assets/sfx-deathscream-human14.wav");
  pumpkinSound = new Audio("./assets/sfx-wpn-grenadewhistle1.wav");
  damageSound = new Audio("./assets/sfx-damage-hit10.wav");
  backgroundMusic = new Audio("./assets/Spider-Man%20Theme%20%5B8%20Bit%20Tribute%20to%20Spider-Man%5D%20-%208%20Bit%20Universe.mp3");
  jumpSound = new Audio("./assets/sfx-Jump-08.wav");
  explosionSound = new Audio("./assets/sfx-Explosion-01.wav");
  levelSound = new Audio("./assets/sfx-sounds-powerup5.wav");
  img = {
    bg:loadImage("./assets/xChy58V.png"),
    land:loadImage("./assets/land.png"),
    goblin_Idle1:loadImage("./assets/goblin%20idle.png"),
    goblin_Idle2:loadImage("./assets/goblin%20idle%202.png"),
    goblin_throw:loadImage("./assets/golblin%20throw.png"),
    pumpkin:loadImage("./assets/pumpkin.png"),
    idle:loadImage("./assets/iron%20spider%201.png"),
    walk:loadImage("./assets/iron%20spider%202.png"),
    spiderCoin:loadImage("./assets/spider.png"),
    spiderWeb:loadImage("./assets/web.png"),
  }
  explosion = {
    e1:loadImage("./assets/explosion1.png"),
    e2:loadImage("./assets/explosion2.png"),
    e3:loadImage("./assets/explosion3.png"),
    e4:loadImage("./assets/explosion4.png"),
    e5:loadImage("./assets/explosion5.png"),
    e6:loadImage("./assets/explosion6.png"),
    e7:loadImage("./assets/explosion7.png"),
    e8:loadImage("./assets/explosion8.png"),
    e9:loadImage("./assets/explosion9.png"),
  }
  screen = {
    title:loadImage("./assets/download.jpg"),
    lose:loadImage("./assets/Spider-man-vs-Green-Goblin.jpg"),
  }
}
// create variables up here
function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
  eAnimation = [explosion.e1,explosion.e1,explosion.e2,explosion.e2,explosion.e3,explosion.e3,explosion.e4,explosion.e4,explosion.e5,explosion.e5,explosion.e6,explosion.e6,explosion.e7,explosion.e7,explosion.e8,explosion.e8,explosion.e9,explosion.e9];
   gameState = "title";
   nextLevel = false;
   timer = 0;
  let spawnX = windowWidth/4-200;
  let spawnY = windowHeight/4-100;
  goblin = new GreenGoblin(spawnX,spawnY);
  for (let k = 0; k < (windowWidth/60); k++) {
    
    let x  = random(windowWidth);
    let y = random(windowHeight/2,windowHeight-100);
    
    let p = new Platform(x,y);
    platforms.push(p);
    
    
   }
  
  
  spiderman = new Spiderman(windowWidth/2,windowHeight/2);
  
  
}
function mousePressed(){
  mouseIsPressed = true;
}  
function draw(){ // this is a built-in forever loop
  
  if(gameState == "title")
  {
  
     
    background(img.bg);
    
    textSize(32);
    textAlign(CENTER,CENTER);
    text('THE GREEN GOBLIN IS ATTACKING YOU IN SPACE... RUN!', windowWidth/2,windowHeight/2);
    text('PRESS A KEY TO START!', windowWidth/2, windowHeight/2+100);
    if(frameCount % 20 < 10){
    fill(255, 255, 255);
    }
    else
    {
      fill(255,0,0);
    }
    //spiderman.show();
    
    if(keyIsPressed)
    {
      gameState = "game";
      backgroundMusic.play();
    }
    
  }
  if(gameState == "game")
  { 
  background(img.bg);
    
    if(explosions.length >= 1)
    {
      
    for(let i = 0; i < explosions.length; i++)
  {
    explosions[i].show();
  }
    }
  showAndEditPlatform();
  showAndInteractGoblin();
  showAndEditPumpkin();
    showAndEditWebs();
    editAndShowCoins();
  
    
   if(frameCount % 20 < 10){
    fill(255, 255, 255);
    }
    else
    {
      fill(255,0,0);
    }
  textSize(32);
  text('POINTS:'+points, windowWidth - 400,50);
   
    if(debugMode == true)
    {
  text('HEALTH:'+spiderman.health, windowWidth - 400,100);
    text('HEALTH:'+goblin.health, windowWidth - 400,200);
    }
    fill(255,255,255);
  showAndInteractSpiderman();
    spiderman.show();
    if(goblin.health <= 0)
    {
      nextLevel = true;
      level++;
    }
   if(spiderman.health <= 0)
    {
        gameOver = true;
    }
    
  }
  if(gameState == "intermission")
  {
     background(img.bg);
     textSize(32);
    text('START LEVEL '+ level, windowWidth/2, windowHeight/2);
    fill(255, 255, 255);
    platforms.splice(0,platforms.length);
    if(mouseIsPressed)
    {
       
      setup();
      gameState = "game";
      
      
    }
  }
  if(gameState == "lose")
  {
    background(screen.lose);
    textAlign(CENTER,CENTER);
    textSize(32);
    text('YOU DIED!', windowWidth/2, windowHeight/2);
    if(frameCount % 20 < 10){
    fill(255, 255, 255);
    }
    else
    {
      fill(255,0,0);
    }
  }
  if(spiderman.y > windowHeight)
  {
    gameOver = true;
  }
  if(gameOver == true)
  {
    gameState = "lose";
    
  }
  if(nextLevel == true)
  {
    gameState = "intermission";
    
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
function showAndInteractSpiderman()
{
  spiderman.move();
  
}
  
function showAndInteractGoblin()
{
  goblin.move();
  if(frameCount % 250 == 249)
  {
  goblin.throwPumpkin();
  }
  goblin.show();
 
}
function editAndShowCoins()
{
  
  let spiders = new SpiderHealth(windowWidth,0)
  
  if(frameCount % 20 == 19)
  {
    coins.push(spiders);
    setInterval(function(){spiderTimer++}, 1000);
  }
    for(let i = 0; i < coins.length;i++)
    {
      coins[i].move();
      coins[i].show(); 
      if(spiderTimer >= 30)
      {
        coins.splice(i,1)
        spiderTimer = 0;
      }
      
    }
}
  
    
function showAndEditPlatform()
{
  for(let i = 0; i < platforms.length; i++)
  {
    platforms[i].move();
    platforms[i].show();
    if(platforms[i].x+ platforms[i].width < 0)
    {
      
      let x  = windowWidth;
     let y = random(windowHeight/2,windowHeight);
     let p = new Platform(x,y);
     platforms.push(p);
      platforms.splice(i,1);
      
    }
  }
}
function showAndEditPumpkin()
{
  
  for(let i = 0; i < pumpkins.length; i++)
  {
    pumpkins[i].move();
    pumpkins[i].show();
    
    
    if(spiderman.contains(pumpkins[i].x+pumpkins[i].width/2,pumpkins[i].y+pumpkins[i].height/2))
    {
       let ex = new Explosion(pumpkins[i].x,pumpkins[i].y);
      explosions.push(ex);
      explosionSound.play();
      damageSound.play
      
      spiderman.health -= 30;
      points -= 30
      pumpkins.splice(i,1);
    }
     else if(pumpkins[i].x+ pumpkins[i].width > windowWidth+round(random(400)))
    {
      
      pumpkins.splice(i,1);
      
     
    }
  }
}   
  function showAndEditWebs()
{
  
  for(let i = 0; i < webs.length; i++)
  {
    webs[i].move();
    webs[i].show();
    
    if(goblin.contains(webs[i].x+webs[i].width/2,webs[i].y+webs[i].height/2))
    {
      
      
      goblin.health -= 5;
      points += 10;
      webs.splice(i,1);
      screamSound.play();
    }
     else if(webs[i].x+ webs[i].width > windowWidth || webs[i].x < 0)
    {
      webs.splice(i,1); 
    }
  }
  
  
  
    //check all explosions
    for(let i = 0; i < explosions.length; i++)
        {
        if(explosions[i].delete == true)
      {
        explosions.splice(i,1);
      }
  }
}

 