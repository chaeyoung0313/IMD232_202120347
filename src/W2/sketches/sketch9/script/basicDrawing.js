function setup() {
  setCanvasContainer('p5-canvas', 3, 2, true);
  background('white');
}

function draw() {
  background(255);

  rectMode(CORNER);

  rect(100, 100, 50, 50);
  ellipse(100, 100, 50, 50);
  rect(200, 100, 25, 50);
  ellipse(200, 100, 25, 50);

  rectMode(CENTER);
  ellipse(400, 100, 50, 50);
  rect(300, 100, 25, 50);
  ellipse(300, 100, 25, 50);
}
