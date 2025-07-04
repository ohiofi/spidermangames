/*global round,push,pop,scale,keyIsPressed,console,createCanvas,color,translate,triangle,frameRate,beginShape,endShape,curveVertex,shuffle,sin,cos,floor,rotate,textAlign,LEFT,RIGHT,CENTER,text,textSize,stroke,noStroke,strokeWeight,keyCode,keyIsDown,LEFT_ARROW,RIGHT_ARROW,UP_ARROW,DOWN_ARROW,mouseIsPressed,fill,noFill,mouseX,mouseY,line,ellipse,background,displayWidth,displayHeight,windowWidth,windowHeight,height,width,dist,loadSound,loadImage,image,random,angleMode,RADIANS,DEGREES*/
let img;
let titleImage, titleNum;
let spiderCount;
let title;
let spiderman;
let civilians = [];
let spiders = [];
var directionX = 1;
var frameCount = 0;
var playerState = "idle";
let spiderwalk, backgroundMusic, civilianDeathMusic, spiderDeathMusic;
let target;
let spiderSpawnx;
var gameState;
var titleScreen;
var timer;
var levelCounter = 1;
var counter = 0;
 var spiderCounter = spiders.length;

function preload(){
  civilianDeathMusic = new Audio("./assets/Sound%20Effects%20-%20Death%20Screams.mp3");
  spiderDeathMusic = new Audio("./assets/Game%20Sound%20Design%20Spider%20death%20%EA%B9%80%EC%A0%95%ED%9B%88.mp3");
  backgroundMusic = new Audio("./assets/Spiderman%20theme%20song%201960s.mp3");
  spiderwalk = new Audio("./assets/Spider%20Chattering%20SOUND%20Effect.mp3");
  title = {
  DS:loadImage("./assets/1779636-550w_comics_death_of_spiderman_artwork.jpeg"),
  screen1:loadImage("./assets/562944_scr1_a.png.jpeg"),
  screen2:loadImage("./assets/Spider-Man_PS4_Crouch.jpg"),
  screen3:loadImage("./assets/Spider-Man_PS4_Selfie_Photo_Mode_LEGAL.jpg"),
  screen4:loadImage("./assets/Spider-Man_PS4_E3_2017_Hero.jpg"),
  
  }
  
  img = {
    bg:loadImage("./assets/Scratch%20Ghost%20Town%203.png"),
    spider:loadImage("./assets/spider.png"),
    civilian:loadImage("./assets/civilian.png"),
    idle:loadImage("./assets/spiderman%20sit.png"),
    walk:loadImage("./assets/spiderman%20walk.png"),
  }
}
// create variables up here
function setup(){ // only when game loads
  createCanvas(windowWidth,windowHeight);
   chooseIntermissionScreen();
  
   gameState = "title";
   background(titleImage);
   spiderCount = round(random(5,20));
   for (let i = 0; i < spiderCount; i++) {
    let spawn = random(2);
     if(spawn < 1)
     {
        spiderSpawnx = windowWidth;
     }
     else
     {
       spiderSpawnx = 0;
     }
    let y = random(windowHeight);
    let b = new Spider(spiderSpawnx,y);
    spiders.push(b);
   }
  
  for (let k = 0; k < 1; k++) {
    
    let x  = windowWidth/2
    let y = random(windowHeight/2);
    let c = new Civilian(x,y);
    civilians.push(c);
   }
  spiderman = new Spiderman(windowWidth/2,windowHeight/2);
}
function mousePressed(){
  mouseIsPressed = true;
}  
function draw(){ // this is a built-in forever loop
  if(gameState == "title")
  {
     backgroundMusic.play();
   
     textSize(32);
    text('START WAVE '+ levelCounter, windowWidth/2, windowHeight/2);
    fill(255, 255, 255);
    if(mouseIsPressed)
    {
      gameState = "game";
      setInterval(function(){timer++}, 1000);
      
    }
    
  }
  if(gameState == "game")
  { 
   
  
  background(img.bg);
    
  showAndCheckSpiders();
  showAndCheckCivilians();
  
  textSize(32);
  text('WAVE '+levelCounter, 100, 100);
  fill(255, 255, 255);
  textSize(32);
  text('SPIDERS KILLED '+counter, 100, 200);
  fill(255, 255, 255);
  spiderman.move();
  spiderman.show();
  if(civilians.length >= 1)
  {
    
    if(spiders.length  < 1)
    {
       chooseIntermissionScreen();
       gameState = "intermission";
       levelCounter++;
    }
  }
  else if(civilians.length == 0)
  {
    gameState = "lose";
  }
  }
   if(gameState == "intermission")
  {
     background(titleImage);
     textSize(32);
    text('START WAVE '+ levelCounter, windowWidth/2, windowHeight/2);
    fill(255, 255, 255);
    if(mouseIsPressed)
    {
      setup();
      gameState = "game";
      setInterval(function(){timer++}, 1000);
      
    }
  }
   if(gameState == "lose")
  {
     background(title.DS);
     textSize(32);
    text('WAVE '+ levelCounter + ' BEAT YOU', windowWidth/2, windowHeight/2);
    fill(255, 0, 0);
  }
}
function showAndCheckSpiders(){
     for (let i = 0; i < spiders.length; i++) {
    
      spiders[i].show();
      spiders[i].move();
       
      if(spiderman.contains(spiders[i].x, spiders[i].y))
      {
        counter++;
        spiders.splice(i,1);
        spiderDeathMusic.play();
      }
    }
  }
function chooseIntermissionScreen()
{
  titleNum = round(random(0,4));
  if(titleNum == 1)
  {
    titleImage = title.screen1;
  }
  if(titleNum == 2)
  {
    titleImage = title.screen2;
  }
  if(titleNum == 3)
  {
    titleImage = title.screen3;
  }
  if(titleNum == 4)
  {
    titleImage = title.screen4;
  }
    
}
function showAndCheckCivilians(){
   for (let k = 0; k < civilians.length; k++) {
      civilians[k].show();
     civilians[k].move();
      for (let i = 0; i < spiders.length; i++) {
       if(spiders[i].contains(civilians[k].x, civilians[k].y))
       {
         civilianDeathMusic.play();
         civilians.splice(k,1);
        break
      }
    }
  }
}

 
