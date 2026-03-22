// =====================================================
// SHADER SHOWCASE — Simple Student Version
// =====================================================
// Press 1 = Toon Shading
// Press 2 = Pixelation
// Press 3 = VHS Glitch
// Press 4 = Invert Colors
// Press 5 = Psychedelic
// Press 0 = No Shader (original)
// =====================================================

let pg;           // offscreen canvas where the 3D scene is drawn
let shaders = {}; // holds all our shader objects
let activeKey = '0';

// --- Load all shaders before setup ---
function preload() {
  shaders = {
    '1': loadShader('screen.vert', 'toon.frag'),
    '2': loadShader('screen.vert', 'pixelate.frag'),
    '3': loadShader('screen.vert', 'vhs.frag'),
    '4': loadShader('screen.vert', 'invert.frag'),
    '5': loadShader('screen.vert', 'random.frag'),
  };
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  angleMode(DEGREES);
  noStroke();

  // Create an offscreen 3D canvas for the scene
  pg = createGraphics(windowWidth, windowHeight, WEBGL);
  pg.angleMode(DEGREES);
  pg.noStroke();
}

function draw() {
  // Step 1: Draw the 3D scene into the offscreen canvas
  drawScene(pg);

  // Step 2: Apply the shader to the screen
  if (activeKey !== '0') {
    shader(shaders[activeKey]);
    shaders[activeKey].setUniform('tex0',       pg);
    shaders[activeKey].setUniform('resolution', [float(width), float(height)]);
    shaders[activeKey].setUniform('time',       millis() / 1000.0);
    rect(-width/2, -height/2, width, height);
  } else {
    // No shader — just show the scene directly
    resetShader();
    clear();
    image(pg, -width/2, -height/2, width, height);
  }
}

// =====================================================
// THE 3D SCENE
// =====================================================
function drawScene(g) {
  g.background(20, 10, 40);

  // Lighting
  g.ambientLight(60);
  g.pointLight(100, 150, 50,   200, -200, 100);  // warm light
  g.pointLight(50,  150, 100, -200,  200, 100);  // cool light

  let t = frameCount;

  // --- Cycling colors based on time ---
  // Each object gets its own color phase so they shift independently.
  // sin() returns -1 to 1, so (sin() * 127 + 128) gives 1 to 255.
  let boxR = sin(t * 0.8)       * 127 + 128;
  let boxG = sin(t * 0.8 + 120) * 127 + 128;
  let boxB = sin(t * 0.8 + 240) * 127 + 128;

  let sphR = sin(t * 1.1 + 40)  * 127 + 128;
  let sphG = sin(t * 1.1 + 160) * 127 + 128;
  let sphB = sin(t * 1.1 + 280) * 127 + 128;

  let torR = sin(t * 0.6 + 80)  * 127 + 128;
  let torG = sin(t * 0.6 + 200) * 127 + 128;
  let torB = sin(t * 0.6 + 320) * 127 + 128;

  let conR = sin(t * 1.4 + 20)  * 127 + 128;
  let conG = sin(t * 1.4 + 140) * 127 + 128;
  let conB = sin(t * 1.4 + 260) * 127 + 128;

  // --- Big spinning box in the center ---
  // ambientMaterial = the base color shown in shadowed/unlit areas
  // specularMaterial = the bright highlight color on lit areas
  // Using * 0.5 for ambient makes shadows a darker version of the same color
  g.push();
  g.translate(0, 0, -300);
  g.rotateX(t * 0.5);
  g.rotateY(t * 0.7);
  g.ambientMaterial(boxR * 0.5, boxG * 0.5, boxB * 0.5);
  g.specularMaterial(boxR, boxG, boxB);
  g.shininess(100);
  g.box(100);
  g.pop();

  // --- Sphere orbiting the box ---
  g.push();
  g.translate(0, 0, -300);
  g.rotateY(t * 1.2);
  g.translate(180, 0, 0);
  g.ambientMaterial(sphR * 0.5, sphG * 0.5, sphB * 0.5);
  g.specularMaterial(sphR, sphG, sphB);
  g.shininess(120);
  g.sphere(40, 24, 16);
  g.pop();

  // --- Torus spinning around ---
  g.push();
  g.translate(0, 0, -300);
  g.rotateX(t * 0.4 + 45);
  g.rotateZ(t * 0.6);
  g.ambientMaterial(torR * 0.5, torG * 0.5, torB * 0.5);
  g.specularMaterial(torR, torG, torB);
  g.shininess(150);
  g.torus(130, 14, 24, 16);
  g.pop();

  // --- Small bouncing cone ---
  g.push();
  g.translate(0, 0, -300);
  g.rotateY(t * 0.9 + 120);
  g.translate(130, sin(t * 3) * 40, 0);
  g.ambientMaterial(conR * 0.5, conG * 0.5, conB * 0.5);
  g.specularMaterial(conR, conG, conB);
  g.shininess(80);
  g.cone(25, 60, 12);
  g.pop();
}

// =====================================================
// KEY PRESS — switch shaders
// =====================================================
function keyPressed() {
  if (key >= '0' && key <= '5') {
    activeKey = key;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  pg.resizeCanvas(windowWidth, windowHeight);
}