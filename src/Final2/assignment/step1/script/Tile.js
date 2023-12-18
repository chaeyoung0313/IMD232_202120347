class Tile {
  constructor(x, y, w, h, isMine) {
    this.pos = { x: x, y: y };
    this.size = { w: w, h: h };
    this.isMine = isMine;
  }

  display() {
    fill('gray');
    if (this.revealed) {
      if (this.isMine) {
        fill('red');
      } else {
        fill('white');
      }
    }
    rect(this.pos.x, this.pos.y, this.size.w, this.size.h);

    if (this.revealed) {
      if (this.isMine) {
        fill('black');
        const centerX = this.pos.x + this.size.w / 2;
        const centerY = this.pos.y + this.size.h / 2;
        const starSize = min(this.size.w, this.size.h) * 0.8;
        drawStar(centerX, centerY, 15, starSize / 2, starSize / 4);
      }
    }
  }

  toggleState(x, y) {
    if (
      x >= this.pos.x &&
      x <= this.pos.x + this.size.w &&
      y >= this.pos.y &&
      y <= this.pos.y + this.size.h
    ) {
      this.revealed = true;
      return true;
    }
    return false;
  }
}

function drawStar(x, y, numPoints, outerRadius, innerRadius) {
  const angleIncrement = TWO_PI / numPoints;
  let angle = -PI / 2;
  beginShape();
  for (let i = 0; i < numPoints * 2; i++) {
    const radius = i % 2 === 0 ? outerRadius : innerRadius;
    const starX = x + cos(angle) * radius;
    const starY = y + sin(angle) * radius;
    vertex(starX, starY);
    angle += angleIncrement;
  }
  endShape(CLOSE);
}
