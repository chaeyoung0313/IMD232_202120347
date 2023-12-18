const tiles = [];
const rowNum = 6;
const colNum = 6;
const mineNum = 5;
const mineIdx = [];

function setup() {
  setCanvasContainer('canvas', 1, 1, true);

  const tileW = width / colNum;
  const tileH = height / rowNum;
  for (let row = 0; row < rowNum; row++) {
    for (let col = 0; col < colNum; col++) {
      const x = tileW * col;
      const y = tileH * row;
      tiles.push(new Tile(x, y, tileW, tileH, false));
    }
  }
  for (let cnt = 0; cnt < mineNum; cnt++) {
    let randomIdx = floor(random(rowNum * colNum));
    while (mineIdx.includes(randomIdx)) {
      randomIdx = floor(random(rowNum * colNum));
    }
    tiles[randomIdx].isMine = true;
    mineIdx.push(randomIdx);
  }

  background(255);
}

function draw() {
  background(255);
  tiles.forEach((eachTile) => {
    eachTile.display();
  });
}

// mouseClicked 함수 수정
function mouseClicked() {
  for (let idx = 0; idx < tiles.length; idx++) {
    if (tiles[idx].toggleState(mouseX, mouseY)) {
      if (tiles[idx].isMine && tiles[idx].revealed) {
        // 클릭한 타일이 별 모양이면서 이미 드러난 경우
        setTimeout(() => {
          window.location.href =
            'http://127.0.0.1:5500/src/Final2/assignment/step2/index.html'; // 0.5초 후에 새로운 링크로 이동
        });
      }
      break;
    }
  }
}
