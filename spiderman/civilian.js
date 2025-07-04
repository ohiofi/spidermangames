class Civilian{
  constructor(tempX,tempY)
  {
    this.image = img.civilian;
    this.x = tempX;
    this.y = tempY;
    this.direction = -1;
    this.height = this.image.height/4.5;
    this.width = this.image.width/4.5;
  }
  
  contains(px,py){
    let d = dist(px, py, this.x, this.y);
    if (d < this.width/4){
      return true;
    } else{
      return false;
    }
  }
  move(){
    this.y += random(-5,5);
    this.x += random(-5,5);
  }
    show(){
      image(this.image,this.x,this.y, this.width, this.height);
    }
  }