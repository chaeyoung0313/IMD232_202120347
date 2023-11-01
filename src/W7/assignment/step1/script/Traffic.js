class Traffic {
  // Traffic 클래스 정의
  constructor() {
    // 클래스의 인스턴스가 만들어질 때 호출되는 메서드
    this.vehicles = []; // 탈것들을 담을 배열 초기화
  }

  run() {
    // 실행 메서드
    this.vehicles.forEach((eachVehicle) => {
      // 각 탈것에 대해 반복
      let sepForce = eachVehicle.separate(this.vehicles); // 분리 힘 계산
      eachVehicle.applyForce(sepForce); // 분리 힘 적용
      eachVehicle.update(); // 탈것 업데이트
      eachVehicle.borderInfinite(); // 무한 경계 처리
      eachVehicle.display(); // 탈것 표시
    });
  }

  addVehicle(x, y) {
    // 주어진 위치에 탈것 추가 메서드
    this.vehicles.push(
      // 새로운 탈것 추가
      new Vehicle(x, y, 8, 5, 0.1, color(random(360), 100, 50)) // 새 탈것 생성
    );
  }
}
