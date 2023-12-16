let floatingTexts = [];

function setup() {
  createCanvas(400, 400);
  textSize(20);
}

function draw() {
  background(255);

  for (let i = floatingTexts.length - 1; i >= 0; i--) {
    floatingTexts[i].display();
    floatingTexts[i].move();

    // 화면 밖으로 벗어나면 배열에서 제거
    if (
      floatingTexts[i].x < 0 ||
      floatingTexts[i].x > width ||
      floatingTexts[i].y < 0 ||
      floatingTexts[i].y > height
    ) {
      floatingTexts.splice(i, 1);
    }
  }

  // 랜덤한 시간 간격으로 새로운 글자 생성
  if (frameCount % 60 === 0) {
    let newText = new FloatingText(
      random(width),
      random(height),
      getRandomChar()
    );
    floatingTexts.push(newText);
  }
}

function getRandomChar() {
  // 무작위로 알파벳 대문자 선택
  let charCode = int(random(65, 91));
  return String.fromCharCode(charCode);
}

class FloatingText {
  constructor(x, y, content) {
    this.x = x;
    this.y = y;
    this.content = content;
    this.speedX = random(-2, 2);
    this.speedY = random(-2, 2);
  }

  display() {
    fill(0);
    textAlign(CENTER, CENTER);
    text(this.content, this.x, this.y);
  }

  move() {
    this.x += this.speedX;
    this.y += this.speedY;
  }
}
