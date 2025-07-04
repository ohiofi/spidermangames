class SpiderWeb{
  
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    this.image = img.spiderWeb;
    this.height = this.image.height / 4.5;
    this.width = this.image.width / 4.5;
    this.direction = spiderman.direction;
  }
  move()
  {
    this.x += this.direction * 10;
  }
  show()
  {
    if(debugMode == true)
      {
          stroke('red');
        strokeWeight(4);
        noFill();
      
        rect(this.x,this.y, this.width, this.height);
        image(this.image,this.x,this.y, this.width, this.height);
        
      }
      else{
      image(this.image,this.x,this.y, this.width, this.height);
    
      }
      
    }
  }