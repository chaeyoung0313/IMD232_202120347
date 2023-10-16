class Body {
  constructor(x, y, mass) {
    this.pos = createVector(x, y, mass);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.mass = mass;
    this.rad = mass ** 0.5 * 4;
    this.velocityVisualization = createVector(0, 0);
    this.accelerationVisualization = createVector(0, 0);
  }

  attract(body) {
    const force = p5.Vector.sub(this.pos, body.pos);
    const distance = constrain(force.mag(), 5, 25);
    const strength = (G * (this.mass * body.mass)) / distance ** 2;
    force.setMag(strength);
    return force;
  }

  applyForce(force) {
    const forceDicideByMass = p5.Vector.div(force, this.mass);
    this.acc.add(forceDicideByMass);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);

    this.velocityVisualization.set(this.vel);
    this.velocityVisualization.mult(5);

    this.accelerationVisualization.set(this.acc);
    this.accelerationVisualization.mult(50);

    this.acc.mult(0);

    this.acc.set(0, 0);
  }

  display() {
    stroke('white');
    fill(0, 127);
    circle(this.pos.x, this.pos.y, this.rad * 2);
  }
}
