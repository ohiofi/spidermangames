class Spiderman{
  constructor(tempX,tempY)
  {
    this.health = 5;
    this.image = img.idle;
    this.x = tempX;
    this.y = tempY;
    this.yVelocity = 0;
    this.direction = 1;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
    this.isGrounded = false;
    this.health = this.width;
  }
  
  move(){
    for(let i = 0; i < pumpkins.length; i++)
  {
    if(this.contains(pumpkins[i].x+pumpkins[i].width/2,pumpkins[i].y+pumpkins[i].height/2))
    {
      this.health -= 30;
    }
  }
    this.yVelocity += GRAVITY;
    this.y-= this.yVelocity;
    this.grounded = false;
    for(let i = 0;i < platforms.length; i++)
    {
     if(platforms[i].contains(this.x,this.y + this.height / 2))
    {
          this.yVelocity = 0;
          this.y = platforms[i].y - this.height/2;
          
          this.isGrounded = true;
    }
    }
    
    
      if (keyIsDown(LEFT_ARROW)) {
        this.x += -9;
        this.direction = -1;
        playerState = "walking";
      } 
      else if (keyIsDown(RIGHT_ARROW)) {
       this.x += 9;
        this.direction = 1;
        playerState = "walking";
      }
      
        if(this.x >= windowWidth)
        {
          this.x -=9;
        }
        if(this.x <= 0)
        {
          this.y+= 9;
        }
      
       if (keyIsDown(UP_ARROW)&& this.isGrounded) {
       jumpSound.play();
          this.yVelocity = 40;
          this.y -= this.yVelocity;
         this.isGrounded = false;
          playerState = "walking";
         
        }
      
      else if(keyIsPressed === false)
      {
        playerState = "walking";
      }
  
     if(playerState == "walking")
    {
      this.walkingState();
    }
  }
 contains(px,py)
  {
    
    if (px >= this.x && px <= this.x + this.width && py >= this.y && py<= this.y + this.height){
      return true;
    } else{
      return false;
    }
  }
    show(){
      
      
      if(debugMode == true)
      {
        translate(this.x,this.y);
         fill("red");
      rect(0-this.width/2,0-this.height/2-50,this.width,10);
      fill("green");
      rect(0-this.width/2,0-this.height/2-50,0 + this.health,10);
      scale(this.direction,1);
        
       
        if(this.isGrounded == true)
        {
      stroke('green');
        }
        else{
          stroke('red');
        }
        strokeWeight(4);
        noFill();
      
        rect(0 - this.width / 2,0 - this.height / 2,this.width,this.height);
        image(this.image,0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
        
        stroke('blue');
        ellipse(0,0+this.height/2,3,3)
        ellipse(0,0,3,3)
      }
      else{
        translate(this.x,this.y);
        fill("red");
         rect(0-this.width/2,0-this.height/2-50,this.width,10);
      fill("green");
      rect(0-this.width/2,0-this.height/2-50,0 + this.health,10);
      scale(this.direction,1);
      
      image(this.image,0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
      
    
      }
      
    }
  
    walkingState(){
      if(frameCount % 20 < 10){
        this.image = img.idle;
      }else{
        this.image = img.walk;
      }
    }
  
  throwWeb()
  {
     let webNew = new SpiderWeb(this.x,this.y);
       webs.push(webNew);
       webSound.play();
  }
  }
