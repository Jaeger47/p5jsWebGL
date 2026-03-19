function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  noStroke();
  
  fill(255); // white shapes
  let aspect = width / height;
  ortho(-10 * aspect, 10 * aspect, 10, -10);
  
}

function draw() {
  background(30);
  fill(0, 255, 0);
  triangle(-6, 1, -2, 1, -4, 5);
  
  quad(1, 1, 5, 1, 5, 5, 1, 5);
  
  fill(255,0,0);
  circle(3, -4, 5);
  
  stroke(255); // blue outline
  strokeWeight(0.1);
  line(-6, -2, -2, -2);
  line(-6, -4, -2, -4);
  line(-6, -6, -2, -6);
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
