let phongShader;

function preload() {
  // Load the vertex and fragment shaders
  phongShader = loadShader('phong.vert', 'phong.frag');
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(-45, width / height, 0.1, 1000);
}



function draw() {
 background(20);
  shader(phongShader);

  // Static Light Position (Top-Left-Front)
  phongShader.setUniform('uLightPos', [-1.0, 1.0, 1.0]);
  
  noStroke();
  sphere(120);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}