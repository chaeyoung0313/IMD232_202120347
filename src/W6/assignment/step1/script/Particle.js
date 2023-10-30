class Particle {
  constructor(x, y) {
    this.pos = createVector(random(width), -20);
    this.initialX = x;
    this.vel = createVector(0, 3);
    this.acc = createVector(0, 0);
    this.rad = 8;
    this.lifeSpan = 512;
    this.angle = 0;
    this.angularSpeed = random(0.02, 0.2);

    this.rotationRadius = random(0, 1);
    // this.color = color(H, S, L);
  }

  applyForce(force) {
    this.acc.set(force);
  }

  update() {
    // this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.pos.x = this.initialX;
    this.lifeSpan -= 2;

    this.angle += this.angularSpeed;
    this.pos.x += sin(this.angle) * this.rotationRadius;
  }

  display() {
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.angle);
    stroke(0, 0, 255, this.lifeSpan);
    fill(255, this.lifeSpan);
    rectMode(CENTER);
    square(0, 0, this.rad * 2);
    pop();
  }

  isDead() {
    return this.lifeSpan < 0;
  }
}
