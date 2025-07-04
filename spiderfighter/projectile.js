class Projectile
{
  constructor(_x,_y,_image,_damage,_bear,speed)
  {
    this.x = _x;
    this.y = _y;
    this.image = _image;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
    this.damage = _damage;
    this.direction = _bear;
    this.tag = null;
    this.xVelocity = 0;
    this.yVelocity = speed;
  }
  move() {
    this.x += this.direction * 5; // basic horizontal movement
    //this.y += this.yVelocity;     // vertical movement
  }
  getLocation()
  {
    let angle = atan2(spiderman.y - this.y, spiderman.x - this.x);
this.xVelocity = cos(angle) * 6;
this.yVelocity = sin(angle) * 6;
  }
  show()
  {
    push()
  stroke("yellow")
  //rect(-20, -5, 40, 10); // Larger rectangle is rotating in degrees
  
    if(debugMode == true)
      {
        angleMode(DEGREES); // Change the mode to DEGREES
          
        translate(width / 2, height / 2);
        push();
        rotate(this.direction);
        stroke('red');
        strokeWeight(4);
        noFill();
      
        rect(this.x,this.y, this.width, this.height);
        image(this.image,this.x,this.y, this.width, this.height);
        pop();
      }
      else
      {
        angleMode(DEGREES); // Change the mode to DEGREES
        
        translate(this.x, this.y);
        
        rotate(this.direction);
        
        image(this.image,0,0, this.width, this.height);
        
    
      }
      pop(); 
    }
  }
