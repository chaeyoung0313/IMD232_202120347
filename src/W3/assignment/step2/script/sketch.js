let cv;
let mv;
let cvToMv;
let velocity;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  cv = createVector();
  mv = createVector();
  cvToMv = createVector();
  position = createVector(0, 0);
  velocity = createVector(0.1, 2);
}

function draw() {
  background('white');

  cv.add(velocity);

  mv.set(mouseX, mouseY);
  cvToMv = p5.Vector.sub(mv, cv);

  strokeWeight(3);
  stroke(0);
  translate(cv.x, cv.y);
  line(0, 0, cvToMv.x, cvToMv.y);

  stroke(0);
  fill(50);
  strokeWeight(2);
  circle(cv.x, cv.y, 48);
}
