function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  noStroke();
  
  fill(255); // white shapes
  let aspect = width / height;
  ortho(-10 * aspect, 10 * aspect, 10, -10);
  
  angleMode(DEGREES);
  
  colorMode(RGB);
}

function draw() {
  background(30);
  
 
  push();
    translate(-4, 4 ,0);
    rotateX(frameCount * 1);
    fill(255, 0, 0);
    beginShape(TRIANGLES);
      vertex(0, 3);
      vertex(-3, -2);
      vertex(3, -2);
    endShape();
  pop();
  
  push();
    fill(255, 0, 0);
    translate(4, 4 ,0);
    rotateY(frameCount * 1);
    beginShape(QUADS);
      fill(0, 255, 0);
      vertex(-3, -2);
      vertex(3, -2);
      fill(0, 0, 255);
      vertex(3, 3);
      vertex(-3, 3);
    endShape();
  pop();
  
  push();
    translate(-4, -4 ,0);
    rotateX(frameCount * 1);
    rotateY(frameCount * 1);
    fill(255, 255, 0);
    beginShape();
      vertex(-3, -4);
      vertex(3, -4);
      vertex(3, 0);
      vertex(0, 3);
      vertex(-3, 0);
    endShape();
  pop();
  
  push();
  translate(4, -4 ,0);
  rotateX(frameCount * -2);
  rotateY(frameCount * -2);
  rotateZ(frameCount * -2);
  
  stroke(0, 255, 255); // blue outline
  strokeWeight(0.1);
  beginShape(LINES);
    vertex(-3, 2); vertex(3, 2);
    vertex(-3, 0); vertex(3, 0);
    vertex(-3, -2); vertex(3, -2);
  endShape();
  pop();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
