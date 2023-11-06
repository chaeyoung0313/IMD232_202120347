class Vehicle {
  // Vehicle 클래스 정의
  constructor(x, y, mass, rad, speedMx, forceMx, clr) {
    // 생성자 메서드, 탈것 객체를 초기화하는 데 사용(x: 탈것의 초기 x좌표, y: 탈것의 초기 y좌표, mass: 탈것의 질량, rad: 탈것의 반지름, speedMx: 탈것의 최대 속도, forceM: 탈것이 받을 수 있는 최대 힘, color: 탈것의 색상값)
    this.pos = createVector(x, y); // 위치 벡터 초기화
    this.vel = p5.Vector.random2D().mult(speedMx); // 무작위 방향의 속도 벡터 설정
    this.acc = createVector(); // 가속도 벡터 초기화
    this.mass = mass; // 탈것의 질량 설정
    this.rad = rad * 2; //탈것의 반지름 설정
    this.speedMx = 10; // 최대 속도 설정
    this.forceMx = forceMx; // 최대 힘 설정
    this.neighborhooodRad = 50; // 이웃 반경 설정
    this.colorValue = clr || color(random(0, 360), 100, 50); // 탈것의 색상 설정
  }

  cohesion(others) {
    // 다른 개체들과의 응집 메서드 ('cohesion' 메서드를 정의)
    let cnt = 0; // 주변 탈것의 수를 세는 변수 초기화
    const steer = createVector(0, 0); // 향하는 방향에 대한 벡터 생성, 초기 값은 (0,0)
    others.forEach((each) => {
      // 다른 탈것들에 대해 반복
      if (each !== this) {
        // 현재 탈것이 아닌 경우
        const distSq = // 탈것 간의 거리의 제곱을 계산
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          // 인접 반경 내에 있는 경우
          steer.add(each.pos); // 위치를 향하는 방향 벡터에 추가
          cnt++; // 주변 탈것 수 증가
        }
      }
    });
    if (cnt > 0) {
      // 주변 탈것이 있는 경우
      steer.div(cnt); // 벡터를 이웃 탈것 수로 나누어 평균 벡터를 얻는다.
      steer.sub(this.pos); // 현재 위치에서 평균 위치로 향하는 방향 벡터 계산
      steer.setMag(this.speedMx); // 최대 속도로 벡터 크기 조정
      steer.sub(this.vel); // 현재 속도를 고려하여 조정된 속도 벡터 계산
      steer.limit(this.forceMx); // 최대 힘으로 벡터를 제한
    }
    return steer; // 계산된 움직이는 방향 벡터 반환
  }

  align(others) {
    // 다른 개체들과의 정렬 메서드 ('align' 메서드를 정의)
    let cnt = 0; // 이웃 탈것의 수를 세는 변수 초기화
    const steer = createVector(0, 0); // 움직이는 방향 벡터를 생성
    others.forEach((each) => {
      // 다른 탈것들에 대해 반복
      if (each !== this) {
        // 현재 탈것이 아닌 경우
        const distSq = // 탈것 간의 거리의 제곱을 계산
          (this.pos.x - each.pos.x) ** 2 + (this.pos.y - each.pos.y) ** 2;
        if (distSq < this.neighborhooodRad ** 2) {
          // 인접 반경 내에 있는 경우
          steer.add(each.vel); // 속도를 움직이는 방향 벡터에 추가
          //   steer.add(p5.Vector.normalize(each.vel)); // 속도를 정규화한 벡터를 추가
          cnt++; // 주변 탈것 수 증가
        }
      }
    });
    if (cnt > 0) {
      // 주변 탈것이 있는 경우
      steer.div(cnt); // 벡터를 주변 탈것 수로 나누어 평균 벡터를 얻는다.
      steer.setMag(this.speedMx); // 최대 속도로 벡터 크기 조정
      steer.sub(this.vel); // 현재 속도를 고려하여 조정된 속도 벡터 계산
      steer.limit(this.forceMx); // 최대 힘으로 벡터를 제한
    }
    return steer; // 계산된 움직이는 방향 벡터 반환
  }

  separate(others) {
    // 다른 개체들과의 분리 메서드 ('separate' 메서드를 정의)
    let cnt = 0; // 이웃 탈것의 수를 세는 변수 초기화
    const steer = createVector(0, 0); //움직이는 방향 벡터를 생성
    others.forEach((each) => {
      // 다른 탈것들에 대해 반복
      if (each !== this) {
        // 현재 탈것이 아닌 경우
        const dist = this.pos.dist(each.pos); // 차량 간의 거리 계산
        if (dist > 0 && this.rad + each.rad > dist) {
          // 최소 거리보다 가까운 경우
          const distNormal = dist / (this.rad + each.rad); // 정규화된 거리 계산
          const towardMeVec = p5.Vector.sub(this.pos, each.pos); // 자신을 향하는 벡터 생성
          towardMeVec.setMag(1 / distNormal); // 거리에 따라 크기를 조정한 방향 벡터 계산
          steer.add(towardMeVec); // 방향 벡터를 합산
          cnt++; //주변 탈것 수 증가
        }
      }
    });
    if (cnt > 0) {
      // 주변 탈것이 있는 경우
      steer.div(cnt); // 벡터를 이웃 탈것 수로 나누어 평균 벡터를 얻음
      steer.setMag(this.speedMx); // 최대 속도로 벡터 크기 조정
      steer.sub(this.vel); // 현재 속도를 고려하여 조정된 속도 벡터 계산
      steer.limit(this.forceMx); // 최대 힘으로 벡터를 제한
    }
    return steer; // 계산된 방향 벡터 반환
  }

  applyForce(force) {
    // 힘을 적용하는 메서드
    const forceDivedByMass = p5.Vector.div(force, this.mass); // 힘을 질량으로 나눈 벡터 계산
    this.acc.add(forceDivedByMass); // 가속도에 나뉜 힘을 추가
  }

  update() {
    // 탈것의 업데이트를 수행하는 메서드
    this.vel.add(this.acc); // 속도에 가속도를 더함
    this.vel.limit(this.speedMx); // 속도를 최대 속도로 제한
    this.pos.add(this.vel); // 위치를 속도에 따라 업데이트
    this.acc.mult(0); // 가속도를 0으로 재설정
  }

  borderInfinite() {
    // 무한 경계를 처리하는 메서드
    if (this.pos.x < -infiniteOffset) {
      // x 좌표가 화면 왼쪽 경계를 벗어난 경우
      this.pos.x = width + infiniteOffset; // 오른쪽 화면 경계에서 다시 시작
    } else if (this.pos.x > width + infiniteOffset) {
      // x 좌표가 화면 오른쪽 경계를 벗어난 경우
      this.pos.x = -infiniteOffset; // 왼쪽 화면 경계에서 다시 시작
    }
    if (this.pos.y < -infiniteOffset) {
      // y 좌표가 화면 상단 경계를 벗어난 경우
      this.pos.y = height + infiniteOffset; // 아래쪽 화면 경계에서 다시 시작
    } else if (this.pos.y > height + infiniteOffset) {
      // y 좌표가 화면 하단 경계를 벗어난 경우
      this.pos.y = -infiniteOffset; // 위쪽 화면 경계에서 다시 시작
    }
  }

  display() {
    // 탈것을 화면에 표시하는 메서드
    push(); // 현재 변환 행렬을 스택에 저장하여 현재 변환을 유지
    translate(this.pos.x, this.pos.y); // 위치로 이동 변환 적용
    rotate(this.vel.heading()); // 속도에 따라 회전 변환 적용
    noStroke(); // 테두리 없음
    fill(this.colorValue); // 색상 채우기
    beginShape(); // 다각형 그리기 시작
    vertex(this.rad, 0); // 정점 추가
    vertex(this.rad * cos(radians(-135)), this.rad * sin(radians(-135))); // 각 정점 추가하여 다각형 형성
    vertex(0, 0); // 각 정점 추가하여 다각형 형성
    vertex(this.rad * cos(radians(135)), this.rad * sin(radians(135))); // 각 정점 추가하여 다각형 형성
    endShape(CLOSE); // 다각형 그리기 종료
    // noFill();
    // stroke(0, 0, 60);
    // ellipse(0, 0, 2 * this.rad);
    // stroke(0, 0, 80);
    // ellipse(0, 0, 2 * this.neighborhooodRad);
    pop(); // 이전 변환 행렬로 복구하여 이전 상태로 돌아감.
  }
}
