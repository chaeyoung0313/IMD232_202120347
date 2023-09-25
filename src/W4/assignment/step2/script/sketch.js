let cv;
let mv;
let cvToMv;
let position;
let velocity;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  cv = createVector();
  mv = createVector();
  cvToMv = createVector();
  position = createVector(0, 0);
  velocity = createVector(0.1, 1.0);
}

function draw() {
  background('white');

  cv.add(velocity);

  mv.set(mouseX, mouseY);
  cvToMv = p5.Vector.sub(mv, cv);

  position.add(velocity);

  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  strokeWeight(3);
  stroke(0);
  translate(cv.x, cv.y);
  line(0, 0, position.x, position.y);

  stroke(0);
  fill(50);
  strokeWeight(2);
  circle(position.x, position.y, 48);
}
