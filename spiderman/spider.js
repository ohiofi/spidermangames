class Spider{
  constructor(tempX,tempY)
  {
    this.image = img.spider;
    this.height = this.image.height;
    this.width = this.image.width;
    this.x = tempX;
    this.y = tempY;
    this.sound = spiderwalk;
    this.target = round(random(civilians.length-1));
  }
  contains(px,py)
  {
    let d = dist(px, py, this.x, this.y);
    if (d < this.width/3){
      return true;
    } else{
      return false;
    }
  }
  /*target()
  {
    
    for (let k = 0; k < civilians.length; k++) {
     
      if(dist(civilians[i].x, civilians[i].y, this.x, this.y) > dist(civilians[i].x, civilians[i].y, this.x, this.y))
      {
         let target = civilian[i];  
      }
    }
  }*/
  move()
  {
      if(this.x > civilians[this.target % civilians.length].x)
      {
        
        this.x -= random(-1,5) + levelCounter/10;
      }
      if(this.x < civilians[this.target % civilians.length].x)
      {
        this.x +=  random(-1,5)  + levelCounter/10;
      }
      if(this.y > civilians[this.target % civilians.length].y)
      {
        this.y -=  random(-1,5)  + levelCounter/10;
      }
      if(this.y < civilians[this.target % civilians.length].y)
      {
        this.y +=  random(-1,5)  + levelCounter/10;
      }
      if(frameCount % 20 < 10)
        {
          if(civilians.length > 0)
          {
          this.sound.play();
          }
        }
  }

  show()
  {
    image(this.image,this.x,this.y,this.width/3,this.height/3);
  }
}
    