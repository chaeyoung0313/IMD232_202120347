class Mover {
  constructor(x, y, mass) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.accDisplay = createVector(0, 0);
    this.mass = mass;
    this.rad = this.mass ** 0.5 * 10;
    // this.isHover;
    // this.isDragging;
    // this.draggingOffset;
  }

  applyForce(force) {
    let forceDividedByMass = createVector(force.x, force.y);
    forceDividedByMass.div(this.mass);
    this.acc.add(forceDividedByMass);
  }

  display() {
    noStroke();
    fill(0, 0, 255);
    ellipse(this.pos.x, this.pos.y, 2 * this.rad);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.accDisplay.set(this.acc);
    this.acc.mult(0);
  }

  contactEdge() {
    if (this.pos.y >= height - 1 - this.rad - 1) {
      return true;
    } else {
      return false;
    }
  }
  edgeBounce() {
    const bounce = -0.7;
    if (this.pos.x < 0 + this.rad) {
      this.pos.x -= 0 + this.rad;
      this.pos.x *= -1;
      this.pos.x += 0 + this.rad;
      this.vel.x *= bounce;
    } else if (this.pos.x > width - 1 - this.rad) {
      this.pos.x -= width - 1 - this.rad;
      this.pos.x *= -1;
      this.pos.x += width - 1 - this.radius;
      this.vel.x *= bounce;
    }
    if (this.pos.y > height - 1 - this.rad) {
      this.pos.y -= height - 1 - this.rad;
      this.pos.y *= -1;
      this.pos.y += height - 1 - this.radius;
      this.vel.y *= bounce;
    }
  }

  mouseMoved(mX, mY) {
    this.isHover =
      (this.pos.x - mX) ** 2 + (this.pos.y - mY) ** 2 <= this.rad ** 2;
  }

  mousePressed(mX, mY) {
    if (this.isHover) {
    }
  }

  mouseDragged(mX, mY) {
    if (this.isDragging) {
    }
  }

  mouseReleased() {
    this.isDragging = false;
  }
}
