let engine, world;
let ropeA, ropeB, ropeC;
let mouseConstraint;

function setup() {
  createCanvas(800, 600);

  engine = Matter.Engine.create();
  world = engine.world;

  ropeA = createRope(100, 50, 8, 1, 10, 10, 'rectangle', 50, 20, -25, 0.2);
  ropeB = createRope(350, 50, 10, 1, 10, 10, 'circle', 20, 0, 0, 0.2);
  ropeC = createRope(600, 50, 5, 1, 10, 10, 'polygon', 25, 5, 0, 0.2);

  // 로프 아래에 달려있는 도형들의 물리 속성 조절
  // ropeA, ropeB, ropeC에 대한 물체 속성 변경
  ropeA.bodies.forEach((body) => {
    body.restitution = 0.5; // 탄성 (물체가 다른 물체에 부딪혔을 때 튕기는 정도) 조절
    body.friction = 0.1; // 마찰 조절
  });

  ropeB.bodies.forEach((body) => {
    body.restitution = 0.5;
    body.friction = 0.1;
  });

  ropeC.bodies.forEach((body) => {
    body.restitution = 0.5;
    body.friction = 0.1;
  });

  Matter.Composite.add(world, [
    ropeA,
    ropeB,
    ropeC,
    Matter.Bodies.rectangle(400, 600, 1200, 50.5, { isStatic: true }),
  ]);

  // 마우스 컨트롤 추가
  let canvasMouse = Matter.Mouse.create(canvas.elt);
  let mouseOptions = {
    mouse: canvasMouse,
    constraint: {
      stiffness: 1,
      render: {
        visible: false,
      },
    },
  };

  mouseConstraint = Matter.MouseConstraint.create(engine, mouseOptions);
  Matter.World.add(world, mouseConstraint);
}

function draw() {
  Matter.Engine.update(engine);
  background(255);

  drawComposite(ropeA);
  drawComposite(ropeB);
  drawComposite(ropeC);
}

function createRope(
  x,
  y,
  numBodies,
  spacing,
  xOffset,
  yOffset,
  type,
  w,
  h,
  pointBX,
  stiffness,
  isRectangle,
  chamfer = 0
) {
  let group = Matter.Body.nextGroup(true);
  let rope;

  if (type === 'rectangle') {
    rope = Matter.Composites.stack(
      x,
      y,
      numBodies,
      1,
      spacing,
      spacing,
      function (bx, by) {
        return Matter.Bodies.rectangle(bx, by, w, h, {
          collisionFilter: { group: group },
          chamfer: chamfer,
        });
      }
    );
  } else if (type === 'circle') {
    rope = Matter.Composites.stack(
      x,
      y,
      numBodies,
      1,
      spacing,
      spacing,
      function (bx, by) {
        return Matter.Bodies.circle(bx, by, w, {
          collisionFilter: { group: group },
        });
      }
    );
  } else if (type === 'polygon') {
    rope = Matter.Composites.stack(
      x,
      y,
      numBodies,
      1,
      spacing,
      spacing,
      function (bx, by) {
        return Matter.Bodies.polygon(bx, by, 5, w, {
          collisionFilter: { group: group },
        });
      }
    );
  }

  Matter.Composites.chain(rope, 0.5, 0, -0.5, 0, {
    stiffness: stiffness,
    length: 2,
    render: { type: 'pin' },
  });

  Matter.Composite.add(
    rope,
    Matter.Constraint.create({
      bodyB: rope.bodies[0],
      pointB: { x: pointBX, y: 0 },
      pointA: { x: rope.bodies[0].position.x, y: rope.bodies[0].position.y },
      stiffness: stiffness,
    })
  );

  if (isRectangle) {
    Matter.Composites.chain(rope, 0.3, 0, -0.3, 0, { stiffness: 1, length: 0 });
  }

  return rope;
}

function drawComposite(composite) {
  for (let body of composite.bodies) {
    beginShape();
    for (let circle of body.vertices) {
      vertex(circle.x, circle.y);
    }
    endShape(CLOSE);
  }
}
