function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  colorMode(RGB);
  // Your specific perspective settings (flips Y axis and creates wide FOV)
  perspective(-45, -width / height, 0.1, 1000);
}



function draw() {
  background(40); // Dark background to see lights better
  // orbitControl allows you to drag the mouse to rotate the camera
  orbitControl();
  // --- LIGHTING SETUP ---
  // 1. Ambient Light: A soft red glow everywhere
  // Even in shadows, objects will have a slight red tint.
  ambientLight(255, 255, 255);
  // 2. Point Light: A white light that moves with the mouse (or time)
  // We calculate a position based on time to make it orbit
  let locX = cos(frameCount) * 200;
  let locZ = sin(frameCount) * 200;
  
  // pointLight(r, g, b, x, y, z)
  pointLight(255, 255, 0, locX, 0, locZ);

  // Optional: Draw a small sphere to visualize where the light is coming from
  push();
  translate(locX, 0, locZ);
  ambientMaterial(0, 0, 150);
  emissiveMaterial(255, 255, 0); // Makes it look like it's glowing
  sphere(10);
  pop();
  // --- OBJECTS ---
  // Center Sphere
  push();
  // specularMaterial interacts with point lights to create shiny 'hotspots'
  specularMaterial(255, 255, 255); 
  shininess(100); // Controls how tight the shiny highlight is
  ambientMaterial(200, 0, 0);
  sphere(80);
  pop();
  
  // Orbiting Box
  push();
  rotateY(frameCount * 0.5);
  translate(150, 0, 0);
  // ambientMaterial reflects light but without the glossy shine
  ambientMaterial(0, 0, 255); 
  box(50);
  pop();
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}