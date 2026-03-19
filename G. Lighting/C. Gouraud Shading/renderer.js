let angle = 0;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(45, -width / height, 0.1, 1000);
}



function draw() {
   background(30);

  // Move and rotate the object
  rotateX(frameCount * 1);
  rotateY(frameCount * 1);

  // Lights
  ambientLight(50); // soft ambient light
  directionalLight(255, 255, 255, 1, 1, 0); // directional light
  

  // Material that reacts to light
  specularMaterial(255, 255, 255); // specular highlights
  shininess(20);

  // Draw a box
  sphere(100, 50, 50);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}