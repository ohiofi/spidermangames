class Platform{
  constructor(tempX,tempY){
    this.x = tempX;
    this.y = tempY;
    this.image = img.land;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
    this.yVelocity = 20;
    
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
    this.x -= 5 + level/2;
  }
  show(){
    
    image(this.image, this.x,this.y,this.width,this.height);
    if(debugMode == true)
    {
    stroke('red');
    strokeWeight(4);
    noFill();
    
    rect(this.x,this.y,this.width,this.height);
    
    
    
    ellipse(this.x + this.width /2,this.y + this.height/2,3,3)
    }
  }
}