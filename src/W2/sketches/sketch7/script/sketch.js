function setup() {
  setCanvasContainer('canvas-goes-here', 3, 2, true);
  background('#ff7733');
}

function draw() {
  background('#ff7733');
  circle(mouseX, mouseY, width * 0.1);
}
