// let particle;
let particleArray = [];
let emitters = [];
let gravity = 0;

function setup() {
  setCanvasContainer('canvas', 3, 2, true);

  // colorMode(HSL, 360, 100, 100);

  //   particle = new particle(width / 2, 20);
  gravity = createVector(0, 0.25);

  background(255);
}

function draw() {
  particleArray.push(new Particle(random(width), 0));

  background(255);
  for (let a = 0; a < particleArray.length; a++) {
    particleArray[a].applyForce(gravity);
    particleArray[a].update();
    particleArray[a].display();
  }

  for (let a = particleArray.length - 1; a >= 0; a--) {
    if (particleArray[a].isDead()) {
      particleArray.splice(a, 1);
    }
  }

  console.log(particleArray.length);
}
