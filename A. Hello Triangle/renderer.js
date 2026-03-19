function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  colorMode(RGB);
  noStroke();
  let aspect = width / height;
  ortho(-10 * aspect, 10 * aspect, 10, -10);
}

function draw() {
  background(30);

  beginShape(TRIANGLES);
    // Red vertex
    fill(255, 0, 0);
    vertex(0, 5);

    // Green vertex
    fill(0, 255, 0);
    vertex(-5, -5);

    // Blue vertex
    fill(0, 0, 255);
    vertex(5, -5);
  endShape();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
