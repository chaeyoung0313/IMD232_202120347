let pos;
let vel;
let acc;
let radius = 50;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
  pos = createVector(width / 2, height / 2);
  vel = createVector(0, 0);
  acc = createVector();
  console.log(pos);
  console.log(vel);
  ellipse(pos.x, pos.y, 50);
}

function draw() {
  background(255);
  undate();
  infiniteEdge();
  display();
  //if (pos.x - radius < 0 || pos.x + radius > width) {
  //  vel.x *= -1;
  //}
  //if (pos.y - radius < 0 || pos.y + radius > height) {
  //  vel.y *= -1;

  // if (pos.x < 0) {
  //   pos.x = width;
  // } else if (pos.x > width) {
  //   pos.x = 0;
  // }
  // if (pos.y < 0) {
  //   pos.y = height;
  // } else if (pos.y > height) {
  //   pos.y = 0;
  // }
  ellipse(pos.x, pos.y, 50);
}

function display() {
  fill('red');
}

function undate() {
  acc = p5.Vector.random2D();
  acc.mult(0.5);
  vel.add(acc);
  pos.add(vel);
}

function infiniteEdge() {
  if (pos.x < 0) {
    pos.x = width;
  } else if (pos.x > width) {
    pos.x = 0;
  }
  if (pos.y < 0) {
    pos.y = height;
  } else if (pos.y > height) {
    pos.y = 0;
  }
}
