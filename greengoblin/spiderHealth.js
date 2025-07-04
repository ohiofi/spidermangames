class SpiderHealth{
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    this.image = img.spiderCoin;
    this.height = this.image.height/2;
    this.width = this.image.width/2;
    this.amount = 5;
    this.speed = 5;
  }
  move()
  {
    
    this.x += this.speed;
    this.y -= this.speed;
    if(this.x+this.width > windowWidth || this.x < 0)
    {
      this.speed *= -1;
    }
    if(this.y+this.height > windowHeight || this.y < 0)
    {
      this.speed *= -1;
    }
  }
  
  show(){
    image(this.image,this.x,this.y,this.width,this.height);
  }
}