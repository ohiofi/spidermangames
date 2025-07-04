class Pumpkin
{
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    this.targetY = spiderman.y;
    this.state = "idle";
    this.image = img.pumpkin;
    this.height = this.image.height/8.5;
    this.width = this.image.width/8.5;
    this.flashEnabled = false;
  }
  contains(px,py)
  {
    
    if (px >= this.x && px <= this.x + this.width && py >= this.y && py<= this.y + this.height){
      return true;
    } else{
      return false;
    }
  }
  move()
  {
        
        this.x+=10;
    
    if(this.y < this.targetY+spiderman.height/2)
    {
      this.y+=5;
    }
    
  }
   blink(someFlashSpeed) {
    switch (arguments.length) {
      case 0:
        someFlashSpeed = 5
    }
    if(frameCount % round(someFlashSpeed) < someFlashSpeed / 2){
      this.flash(0.01);
      this.flashEnabled = true;
      this.show()
      this.flashEnabled = false;
    }
  }
  flash() {
    this.flashEnabled = true;
    this.show()
    this.flashEnabled = false;
  }
  show()
  {
     if(debugMode == true)
      {
    stroke('red');
    strokeWeight(4);
    noFill();
    rect(this.x,this.y,this.width,this.height);
    
        
     if(this.flashEnabled) {
      
       blendMode(OVERLAY);
       image(this.image, this.x,this.y,this.width,this.height);
     }
       
    image(this.image, this.x,this.y,this.width,this.height);
    
    ellipse(this.x + this.width /2,this.y + this.height/2,3,3)
      }
    else{
      image(this.image, this.x,this.y,this.width,this.height);
    }
  }
    
} 