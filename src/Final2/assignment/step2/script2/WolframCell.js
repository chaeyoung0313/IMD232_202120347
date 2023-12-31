class Cell {
  constructor(x, y, w, h, isClickable = true) {
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.isClickable = isClickable;
    this.state = false;
    this.nextState = this.state;
    this.neighbors = [];
    this.transitionSpeed = 0.01; // 속도 조절을 위한 변수 (1이면 기본 속도)
  }

  setNeighbors(neighbors) {
    this.neighbors = neighbors;
  }

  calcNextState() {
    const livingNeighbors = this.neighbors.filter(
      (eachNeighbor) => eachNeighbor?.state
    );
    const livingNum = livingNeighbors.length;
    if (this.state) {
      if (livingNum < 2 || livingNum > 3) {
        this.nextState = false;
      } else {
        this.nextState = this.state;
      }
    } else {
      if (livingNum === 3) {
        this.nextState = true;
      } else {
        this.nextState = this.state;
      }
    }
  }

  update() {
    // 이전 상태에서 다음 상태로 전환하는 코드 수정
    this.transitionSpeed = max(0, this.transitionSpeed - 0.0001); // 조금씩 느려짐
    if (random(1) < this.transitionSpeed) {
      this.state = this.nextState;
      this.transitionSpeed = random(0.1, 0.002); // 랜덤한 속도로 초기화
    }
  }
  isHover(mx, my) {
    return (
      this.x < mx && this.x + this.w > mx && this.y < my && this.y + this.h > my
    );
  }

  toggleState(mx, my) {
    if (!this.isClickable) return false;
    if (!this.isHover(mx, my)) return false;
    this.state = !this.state;
    return true;
  }

  display(mx, my) {
    push();
    translate(this.x, this.y);
    stroke(this.isHover(mx, my) ? 'red' : 'black');
    fill(this.state ? 255 : 64);
    rect(0, 0, this.w, this.h);
    pop();
  }
}
