let angle = 0;



function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(45, -width / height, 0.1, 1000);
}



function draw() {
  background(20);
  
  // 1. Add Light
  ambientLight(100); // Soft white light everywhere
 
  directionalLight(200, 200, 0, 1, 1, 1);
  directionalLight(0, 0, 200, -1, 1, 1);
  
  pointLight(0, 255, 0, 0, -500, -100);
  // 2. Set Material
  ambientMaterial(255, 0, 0); //base color or the object
  specularMaterial(250, 50, 100); // A shiny pinkish-red
  shininess(20); // How glossy it is
  
  // 3. Draw Shape
  noStroke();
  rotateX(frameCount * 0.01);
  rotateY(frameCount * 0.01);
  sphere(100);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}