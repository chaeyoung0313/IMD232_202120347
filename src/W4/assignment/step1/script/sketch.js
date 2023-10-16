const bodies = [];
const bodyNum = 30;
const G = 0.02;

function setup() {
  setCanvasContainer('canvas', 1, 1, true);
  init();
  background(255);
}

function draw() {
  background(255);

  for (let i = 0; i < bodies.length; i++) {
    for (let j = 0; j < bodies.length; j++) {
      if (i !== j) {
        let forceForJ = bodies[i].attract(bodies[j]);
        bodies[j].applyForce(forceForJ);
      }
    }
    bodies[i].update();
    bodies[i].display();
  }
  // bodies.forEach((each) => {
  //   each.update;
  // });
  // bodies.forEach((each) => {
  //   each.update;
  // });
}

function mousePressed() {
  if (isMouseInsideCanvas()) {
    init();
  }
}

function init() {
  for (let i = 0; i < 30; i++) {
    bodies[i] = new Body(random(width), random(height), random(16, 100));
  }
}
