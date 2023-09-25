function setup() {
  setCanvasContainer('mySketchGoesHere', 3, 2, true);
  background('white');
}

function draw() {
  background('white');

  let mouse = createVector(mouseX, mouseY);
  let center = createVector(width / 2, height / 2);

  strokeWeight(3);
  stroke(80);
  line(0, 0, mouse.x, mouse.y);
}
