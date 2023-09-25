let position;
let velocity;
let acceleraton;
let topSpeed = 4;

function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  position = createVector(random(width), random(height));
  velocity = createVector();
}

function draw() {
  background(255);
  update();
  checkEdges();
  show();
  let mouse = createVector(mouseX, mouseY);
  //   let line1 = createVector(50, 50);
  //   let line2 = createVector(mouseX - 50, mouseY - 50);

  //   drawArrow(line1, line2, 'red');
  //   drawArrow(line1, line2.limit(35), 'blue');
  //   let position = createVector();

  strokeWeight(1);
  stroke(0, 0, 255);
  line(position.x, position.y, random(width), random(height));
  stroke(255, 0, 0);
  line(position.x, position.y, random(width), random(height));

  strokeWeight(3);
  stroke(0);
  line(position.x, position.y, mouse.x, mouse.y);

  //   translate(position.x, position.y);
  //   line(mouse.x, mouse.y);
  //   mouse.sub(position);
}

function update() {
  acceleraton = p5.Vector.random2D();
  acceleraton.mult(random(2));
  velocity.add(acceleraton);
  velocity.limit(topSpeed);
  position.add(velocity);
}

function show() {
  stroke(0);
  strokeWeight(2);
  fill(0);
  circle(position.x, position.y, 60);
}

function checkEdges() {
  if (position.x > width) {
    position.x = 0;
  } else if (position.x < 0) {
    position.x = width;
  }

  if (position.y > height) {
    position.y = 0;
  } else if (position.y < 0) {
    position.y = height;
  }
}
