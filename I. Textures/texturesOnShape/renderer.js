let img;

function preload() {
  img = loadImage('Textures/images (1).jpeg');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(45, width / height, 0.1, 1000);
}

function draw() {
  background(70);

  ambientLight(60);
  directionalLight(255, 255, 255, -0.5, -1, -0.5);
  pointLight(255, 255, 255, 200, -200, 300);

  specularMaterial(255);
  shininess(40);

  rotateY(frameCount * 0.5);

  texture(img);
  box(200);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}