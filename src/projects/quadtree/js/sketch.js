let qtree;
let pointCounter = 0;

function setup(){
  let canvasContainer = document.getElementById("quadtree-canvas");
  let canvasWidth = parseInt(getComputedStyle(canvasContainer).width,10);
  let canvasHeight = parseInt(getComputedStyle(canvasContainer).height,10);
  let renderer = createCanvas(canvasWidth,canvasHeight);
  renderer.parent(canvasContainer);
  background(50);

  qtree = new QuadTree(new Rect(0,0,canvasWidth,canvasHeight),4);
}

function draw(){
  background(50);
  drawQuadtree(qtree);
  mouseQuery(qtree);
}

function drawQuadtree(qt){
  stroke(255);
  strokeWeight(1);
  noFill()
  rect(qt.r.x, qt.r.y, qt.r.w, qt.r.h);
  if(qt.divided){
    drawQuadtree(qt.northeast);
    drawQuadtree(qt.northwest);
    drawQuadtree(qt.southeast);
    drawQuadtree(qt.southwest);
  }
  strokeWeight(4);
  for(let p of qt.points)
    point(p.position.x,p.position.y);
}

function mouseQuery(qt){
  stroke(0,255,0);
  let range = new Circle(mouseX, mouseY, 50);
  strokeWeight(1);
  circle(range.x,range.y,range.r*2);
  strokeWeight(4);
  for(let p of qt.query(range))
    point(p.position.x,p.position.y);
}

function mousePressed(){
  qtree.insert({ position: createVector(mouseX, mouseY)});
}
function mouseDragged(){
  qtree.insert({ position: createVector(mouseX, mouseY)});
}
