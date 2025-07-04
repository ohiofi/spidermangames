class Electro
{
  constructor(tempX,tempY)
  {
    this.x = tempX;
    this.y = tempY;
    this.image = electro.stand;
    this.height = this.image.height/1.5;
    this.width = this.image.width/1.5;
    this.direction = 1
    this.health = 100;
    this.up = false;
    this.down = true;
    
  }
  move()
  {
    if( this.up == true)
    {
      this.y -= 2;
    }
    if(this.y > height - 200)
    {
      this.up = true;
      this.down = false;
    }
    if(this.down == true)
      {
        this.y += 2;
      }
    if( this.y < 0 + 200)
      {
        this.down = true;
        this.up = false;
      }
    this.anim();
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
    push()
      
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
      rect(0-this.width/2,0-this.height/2-50,this.width * this.health / 100,10);
      scale(this.direction,1);
      
      image(this.image,0 - this.width / 2, 0 - this.height / 2, this.width, this.height);
      
    
      }
      pop()
  }
  anim(){
      if(frameCount % 20 < 10){
        this.image = electro.stand;
      }else{
        this.image = electro.shock;
      }
    }
  
  shootShocks(){
     let shockNew = new Projectile(this.x,this.y,projectiles.shock,20,this.direction,dist(this.x,this.y,spiderman.x,spiderman.y)/35);
       shocks.push(shockNew);
    
  }
  
}