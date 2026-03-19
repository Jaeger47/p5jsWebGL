function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  
  noStroke();
  
  fill(255); // white shapes
  let aspect = width / height;
  ortho(-10 * aspect, 10 * aspect, 10, -10);
  
}

function draw() {
  background(30);
  
  beginShape(TRIANGLES);
    vertex(-6, 1);
    vertex(-2, 1);
    vertex(-4, 5);
  endShape();
  
  beginShape(QUADS);
    vertex(1, 1);
    vertex(5, 1);
    vertex(5, 5);
    vertex(1, 5);
  endShape();
  
  
  beginShape();
    vertex(2, -7);
    vertex(6, -7);
    vertex(7, -4);
    vertex(4, -2);
    vertex(1, -4);
  endShape();  
  
  stroke(255); // blue outline
  strokeWeight(0.1);
  beginShape(LINES);
    vertex(-6, -2); vertex(-2, -2);
    vertex(-6, -4); vertex(-2, -4);
    vertex(-6, -6); vertex(-2, -6);
  endShape();
  
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
