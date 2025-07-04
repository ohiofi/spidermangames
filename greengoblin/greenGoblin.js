class GreenGoblin
{
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    this.direction = true;
    this.state = "idle";
    this.image = img.goblin_Idle1;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
    this.shoot = false;
    this.health = this.width - 50 + (level*50);
  }
  move()
  {
      for(let i = 0; i < webs.length; i++)
  {
    if(this.contains(webs[i].x+webs[i].width/2,webs[i].y+webs[i].height/2))
    {
      this.health -= 20;
    }
  }
    if(this.health <50)
    {
      levelSound.play();
    }
    if(this.direction == true)
    {
      if(this.health > 50)
      {
      this.y -= 1;
        
      }
      else 
      {
        this.y -= 5;
        
      }
    
    }
      if(this.y-60 <= 0)
      {
        this.direction = false;
      }
    
    if(this.direction == false)
    {
      if(this.health > 50)
      {
      this.y += 1;
      }
      else 
      {
        this.y += 5;
      }
      if(this.y >= windowHeight - windowHeight/3 - this.height)
      {
        this.direction = true;
      }
    }
  
    
  
    this.idleState();
  }
  show()
  {
    
    fill("red");
    rect(this.x,this.y-50,this.width,10);
    fill("green");
    rect(this.x,this.y-50,0 + this.health,10);
    if(debugMode == true)
      {
    stroke('red');
    strokeWeight(4);
    noFill();
    rect(this.x,this.y,this.width,this.height);
    
    image(this.image, this.x,this.y,this.width,this.height);
    
    ellipse(this.x + this.width /2,this.y + this.height/2,3,3)
      }
    else{
      image(this.image, this.x,this.y,this.width,this.height);
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
   idleState(){
      if(frameCount % 100 < 50){
        this.image = img.goblin_Idle1;
      }else{
        this.image = img.goblin_Idle2;
      }
    }
  throwPumpkin(){
  
    
       let pumpkinNew = new Pumpkin(goblin.x+goblin.width,goblin.y+goblin.height/2);
       pumpkins.push(pumpkinNew);
       this.image = img.goblin_throw;
       pumpkinSound.play();
     
    
   
    
    
  }
  throwState(){
    push();
    setInterval(function(){throwTimer++}, 200);
    while(throwTimer < 1000)
    { 
    this.image = img.goblin_throw;
    }
  }
    
} 