class Explosion{
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    //this.image = ;
    this.index = 0;
    this.framecount = frameCount;
    this.delete = false;
    
  }
  
  show()
  {
    if(this.index < eAnimation.length)
    {
      this.index++;
    }
    else
    {
      this.delete = true;
    }
    image(eAnimation[this.index % eAnimation.length],this.x,this.y);
  }
}