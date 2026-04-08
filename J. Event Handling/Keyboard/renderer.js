//keyboard
let spherePos;
let speed = 5;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(-45, -width / height, 0.1, 1000);

  spherePos = createVector(0, 0, 0);
}

function draw() {
  background(0); // BLACK BACKGROUND

  // Camera
 // camera(0, -200, 400, 0, 0, 0, 0, 1, 0);

  // LIGHTING
  ambientLight(60);
  directionalLight(255, 255, 255, 1, 1, -1);
  pointLight(255, 255, 255, 0, -100, 200);

  // WASD movement
  if (keyIsDown(83)) spherePos.y -= speed; // W
  if (keyIsDown(87)) spherePos.y += speed; // S
  if (keyIsDown(65)) spherePos.x -= speed; // A
  if (keyIsDown(68)) spherePos.x += speed; // D
  if (keyIsDown(88)) spherePos.z -= speed; // W
  if (keyIsDown(90)) spherePos.z += speed; // S// SPHERE with MATERIAL
  push();
  translate(spherePos.x, spherePos.y, spherePos.z);
  specularMaterial(100, 200, 255);
  shininess(50);
  sphere(30);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}