const tiles = [];
const rowNum = 10,
  colNum = 10;
let lastClickedTile = null;

function setup() {
  createCanvas(400, 400);

  const w = width / colNum;
  const h = height / rowNum;

  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = w * col;
      const y = h * row;
      const newTile = new ToggleTile(x, y, w, h);
      tiles.push(newTile);
    }
  }
}

function draw() {
  background(255);

  tiles.forEach((tile) => {
    tile.display();
    tile.updateShapePosition();
  });
}

function mouseClicked() {
  tiles.forEach((tile) => {
    if (tile.isMouseOver(mouseX, mouseY) && tile !== lastClickedTile) {
      tile.toggleState();
      lastClickedTile = tile;

      // 5초 후에 타일 상태 리셋
      setTimeout(() => {
        tile.toggleState();
        lastClickedTile = null;
      }, 5000);
    }
  });
}

class ToggleTile {
  constructor(x, y, w, h) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.state = false;
    this.showShape = false; // 도형을 표시할지 여부
    this.shapeX = x + w / 2; // 도형의 초기 X 좌표
    this.shapeY = y + h / 2; // 도형의 초기 Y 좌표
    this.shapeSpeedX = random(1, 3); // 도형의 X 방향 속도
    this.shapeSpeedY = random(1, 3); // 도형의 Y 방향 속도
    this.shapeType = 'circle'; // 초기 도형은 원으로 설정
  }

  display() {
    // 사각형 타일
    stroke(0);
    fill(this.state ? 'black' : 'white');
    rect(this.x, this.y, this.w, this.h);

    if (this.showShape) {
      // 도형
      fill(color('#39FF14')); // 네온 초록색으로 변경
      if (this.shapeType === 'circle') {
        // 원
        ellipse(this.shapeX, this.shapeY, 20, 20);
      } else if (this.shapeType === 'triangle') {
        // 삼각형
        triangle(
          this.shapeX - 10,
          this.shapeY + 10,
          this.shapeX + 10,
          this.shapeY + 10,
          this.shapeX,
          this.shapeY - 10
        );
      } else if (this.shapeType === 'star') {
        // 별모양
        this.drawStar(this.shapeX, this.shapeY, 7, 15, 5);
      }
    }
  }

  drawStar(x, y, radius1, radius2, npoints) {
    let angle = TWO_PI / npoints;
    let halfAngle = angle / 2.0;
    beginShape();
    for (let a = -PI / 2; a < TWO_PI - PI / 2; a += angle) {
      let sx = x + cos(a) * radius2;
      let sy = y + sin(a) * radius2;
      vertex(sx, sy);
      sx = x + cos(a + halfAngle) * radius1;
      sy = y + sin(a + halfAngle) * radius1;
      vertex(sx, sy);
    }
    endShape(CLOSE);
  }

  toggleState() {
    this.state = !this.state;
    this.showShape = !this.showShape; // 클릭되면 도형을 표시 또는 감춤
    if (!this.showShape) {
      // 도형이 감춰지면 초기 좌표로 설정
      this.shapeX = this.x + this.w / 2;
      this.shapeY = this.y + this.h / 2;
    }
    // 랜덤하게 도형의 형태를 변경
    const shapeTypes = ['circle', 'triangle', 'star'];
    this.shapeType = random(shapeTypes);
  }

  isMouseOver(mx, my) {
    return (
      mx > this.x && mx < this.x + this.w && my > this.y && my < this.y + this.h
    );
  }

  updateShapePosition() {
    // 클릭한 타일 안에서 도형의 위치를 업데이트
    if (this.showShape) {
      this.shapeX += this.shapeSpeedX;
      this.shapeY += this.shapeSpeedY;

      // 도형이 사각형 타일 안에서 벗어나지 않도록 처리
      this.shapeX = constrain(this.shapeX, this.x, this.x + this.w);
      this.shapeY = constrain(this.shapeY, this.y, this.y + this.h);

      // 도형이 사각형의 가장자리에 닿으면 방향을 반대로 변경하여 튕기도록 함
      if (this.shapeX === this.x || this.shapeX === this.x + this.w) {
        this.shapeSpeedX *= -1;
      }
      if (this.shapeY === this.y || this.shapeY === this.y + this.h) {
        this.shapeSpeedY *= -1;
      }
    }
  }
}
