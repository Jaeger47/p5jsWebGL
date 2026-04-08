//[FPS]
let pos, vel;
let yaw = 0, pitch = 0;

let gravity = 0.6;
let jumpForce = -12;
let onGround = false;

let speed = 1;
let runMultiplier = 2;

let sensitivity = 0.1;

let groundY = 100;
let eyeHeight = 60;

let objects = [];

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);

  perspective(60, width / height, 0.1, 10000);

  pos = createVector(0, groundY, 0);
  vel = createVector(0, 0, 0);

  for (let i = 0; i < 40; i++) {
    objects.push({
      x: random(-1000, 1000),
      z: random(-1000, 1000),
      h: random(50, 150)
    });
  }

  canvas.requestPointerLock =
    canvas.requestPointerLock || canvas.mozRequestPointerLock;

  document.body.addEventListener("click", () => {
    canvas.requestPointerLock();
  });
}

function draw() {
  background(135, 206, 235);

  handleMouse();
  handleMovement();
  applyPhysics();

  // ================= LIGHTING =================

  ambientLight(80); // soft global light

  // directional "sun"
  directionalLight(255, 255, 255, -1, -1, -1);

  // optional player light (flashlight feel)
  pointLight(255, 255, 255, pos.x, pos.y - eyeHeight, pos.z);

  // ================= CAMERA =================

  let dx = sin(yaw) * cos(pitch);
  let dy = sin(pitch);
  let dz = cos(yaw) * cos(pitch);

  camera(
    pos.x, pos.y - eyeHeight, pos.z,
    pos.x + dx, pos.y - eyeHeight + dy, pos.z + dz,
    0, 1, 0
  );

  drawSkybox();
  drawGround();
  drawObjects();
}

// ================= CONTROLS =================

function handleMouse() {
  if (document.pointerLockElement === canvas) {
    yaw -= movedX * sensitivity;
    pitch += movedY * sensitivity;
    pitch = constrain(pitch, -89, 89);
  }
}

function handleMovement() {
  let moveSpeed = speed;
  if (keyIsDown(SHIFT)) moveSpeed *= runMultiplier;

  let forward = createVector(sin(yaw), 0, cos(yaw));
  let right = createVector(forward.z, 0, -forward.x);

  if (keyIsDown(87)) pos.add(p5.Vector.mult(forward, moveSpeed));
  if (keyIsDown(83)) pos.sub(p5.Vector.mult(forward, moveSpeed));
  if (keyIsDown(65)) pos.sub(p5.Vector.mult(right, -moveSpeed));
  if (keyIsDown(68)) pos.add(p5.Vector.mult(right, -moveSpeed));

  if (keyIsDown(32) && onGround) {
    vel.y = jumpForce;
    onGround = false;
  }
}

// ================= PHYSICS =================

function applyPhysics() {
  vel.y += gravity;
  pos.y += vel.y;

  if (pos.y > groundY) {
    pos.y = groundY;
    vel.y = 0;
    onGround = true;
  }
}

// ================= WORLD =================

function drawGround() {
  push();
  translate(0, groundY, 0);
  rotateX(90);

  // material
  ambientMaterial(80, 180, 80);
  specularMaterial(100);
  shininess(10);

  plane(5000, 5000);
  pop();
}

function drawObjects() {
  for (let o of objects) {
    push();
    translate(o.x, groundY - o.h / 2, o.z);

    // material
    ambientMaterial(200, 100, 100);
    specularMaterial(255);
    shininess(50);

    box(50, o.h, 50);
    pop();
  }
}

function drawSkybox() {
  push();
  translate(pos.x, pos.y - eyeHeight, pos.z);

  // sky should NOT react to light
  ambientMaterial(135, 206, 235);

  box(10000);
  pop();
}

// ================= RESIZE =================

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}