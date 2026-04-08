//mouse
let boxColor;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(-45, -width / height, 0.1, 1000);

  boxColor = color(255, 100, 100); // initial color
}

function draw() {
  background(0);

  // Lighting//mouse
let boxColor;

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(-45, -width / height, 0.1, 1000);

  boxColor = color(255, 100, 100); // initial color
}

function draw() {
  background(0);

  // Lighting
  ambientLight(60);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  // Move to center (WEBGL default already centered)
  push();

  // Spin animation
  rotateX(frameCount * 0.5);
  rotateY(frameCount * 0.7);

  // Material
  ambientMaterial(boxColor);

  // Draw box
  box(150);

  pop();
}

// Detect mouse click
function mousePressed() {
  // Convert mouse position to WEBGL center-based coords
  let mx = mouseX - width / 2;
  let my = mouseY - height / 2;

  // Check if click is near the box (approximate hitbox)
  if (mx > -75 && mx < 75 && my > -75 && my < 75) {
    // Change to random color
    boxColor = color(random(255), random(255), random(255));
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}