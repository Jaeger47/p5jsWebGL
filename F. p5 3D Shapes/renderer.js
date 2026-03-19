function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  //noStroke();
  angleMode(DEGREES);
  colorMode(RGB);
  perspective(-45, -width / height, 0.1, 1000);
}

function draw() {
  background(30);
  fill(255, 255, 0); // white shapes
  
  translate(0 ,0, -100);
  
  push();
    translate(-150, 150, 0);
    rotateY(frameCount * -1);
    box(100);
  pop();
  
  push();
    translate(150, 150, 0);
    rotateZ(frameCount * 1);
    sphere(100);
  pop();
  
  push();
    translate(-150, -150, 0);
    rotateX(frameCount * 1);
    cylinder(60, 150, 24, 1, true, false);
  pop();
  
  push();
    translate(150, -150, 0);
    rotateY(frameCount * 1);
    torus(90, 30); 
  pop();
  
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
