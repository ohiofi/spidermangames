class Spiderman{
  constructor(tempX,tempY)
  {
    this.image = img.idle;
    this.x = tempX;
    this.y = tempY;
    this.direction = -1;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
  }
  
  move(){
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
      else if (keyIsDown(UP_ARROW)) {
        this.y += -9;
        playerState = "walking";
      }
      else if (keyIsDown(DOWN_ARROW)) {
        this.y += 9;
        playerState = "walking";
      }
      else if(keyIsPressed === false)
      {
        playerState = "idle";
      }
    if(playerState == "idle")
    {
      this.image = img.idle;
    }
     if(playerState == "walking")
    {
      this.walkingState();
    }
  }
  contains(px,py){
    let d = dist(px, py, this.x, this.y);
    if (d < this.width){
      return true;
    } else{
      return false;
    }
  }
    show(){
      translate(this.x,this.y);
      scale(this.direction,1);
      image(this.image,0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
    }
  
    walkingState(){
      if(frameCount % 20 < 10){
        this.image = img.idle;
      }else{
        this.image = img.walk;
      }
    }
  
  }
