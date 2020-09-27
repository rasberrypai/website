class Rect{
  constructor(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
  }
  intersects(r){
    let x = r.x;
    let y = r.y;
    //// TODO
  }
  contains(x,y){
    if(x >= this.x && x <= this.x+this.w && y >= this.y && y <= this.y+this.h) return true;
    return false;
  }
}

class Circle{
  constructor(x,y,r){
    this.x = x;
    this.y = y;
    this.r = r;
  }
  intersects(r){
    let x = r.x;
    let y = r.y;
    let dx = this.x - Math.max(x, Math.min(this.x, x + r.w));
    let dy = this.y - Math.max(y, Math.min(this.y, y + r.h));
    return (dx * dx + dy * dy) < (this.r * this.r);
  }
  contains(x,y){
    let nx = x - this.x;
    let ny = y - this.y;
    if((nx*nx + ny*ny) <= (this.r*this.r)) return true;
    return false;
  }
}


class QuadTree{
  constructor(r,cap){
    this.r = r;
    this.divided = false;
    this.cap = cap;
    this.points = [];
  }

  //split quadtree into fourths
  subdivide(){
    let x = this.r.x;
    let y = this.r.y;
    let w = this.r.w/2;
    let h = this.r.h/2;
    this.northwest = new QuadTree(new Rect(x, y, w, h), this.cap);
    this.northeast = new QuadTree(new Rect(x + w, y, w, h), this.cap);
    this.southwest = new QuadTree(new Rect(x, y + h, w, h), this.cap);
    this.southeast = new QuadTree(new Rect(x + w, y + h, w, h), this.cap);
    this.divided = true;
  }

  //add point to quadtree
  //point must have position
  insert(point){
    if(!this.r.contains(point.position.x, point.position.y)) return false;

    if(this.points.length < this.cap) { this.points.push(point); return true; }

    if(!this.divided) this.subdivide();

    return (this.northeast.insert(point) || this.northwest.insert(point) || this.southeast.insert(point) || this.southwest.insert(point))
  }

  //remove point from quadtree if point is in quadtree
  remove(point){
    if(!this.r.contains(point.position.x,point.position.y)) return;
    let index = this.points.indexOf(point);
    if(index >= 0)
      this.points.splice(index,1);
    else if(this.divided)
      return (this.northeast.remove(point) || this.northwest.remove(point) || this.southeast.remove(point) || this.southwest.remove(point))
  }

  // return an array of all points within a shape
  query(shape,arr = []){
    if(!shape.intersects(this.r)) return arr;
    for(let p of this.points)
      if(shape.contains(p.position.x,p.position.y)) arr.push(p);
    if(this.divided){
      this.northeast.query(shape,arr);
      this.northwest.query(shape,arr);
      this.southeast.query(shape,arr);
      this.southwest.query(shape,arr);
    }
    return arr;
  }

  clear(){
    this.points = [];
    if(this.divided){
      this.northwest = null;
      this.northeast = null;
      this.southwest = null;
      this.southeast = null;
      this.divided = false;
    }
  }
}
