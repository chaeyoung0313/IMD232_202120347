let traffic; // traffic 변수 선언, 탈것들을 담는 객체
let infiniteOffset = 80; // 무한 오프셋 값 설정

function setup() {
  // p5.js 설정 함수
  setCanvasContainer('canvas', 3, 2, true); // 캔버스 컨테이너 설정
  colorMode(HSL, 360, 100, 100, 100); // 컬러 모드 설정
  traffic = new Traffic(); // 새로운 Traffic 객체 설정
  for (let n = 0; n < 10; n++) {
    // 10번 반복
    traffic.addVehicle(random(width), random(height)); // 랜덤 위치에 탈것 추가
  }

  background('white'); // 백그라운드를 흰색으로 설정
}

function draw() {
  // p5.js draw 함수
  background('white'); // 백그라운드를 흰색으로 설정
  traffic.run(); //traffic 객체의 run 메서드 호출
}

function mouseDragged() {
  // 마우스 드래그 이벤트 함수
  traffic.addVehicle(mouseX, mouseY); // 마우스 위치에 탈것 추가
}
