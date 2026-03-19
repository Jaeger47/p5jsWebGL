let cubeVertices = [];
let cubeFaces = [];

// ===============================
// SETUP (Your Template)
// ===============================
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  colorMode(RGB);
  perspective(-45, -width / height, 0.1, 1000);

  createCubeGeometry(100); // initialize geometry
}

// ===============================
// DRAW
// ===============================
function draw() {
  background(30);

  ambientLight(120);
  directionalLight(255, 255, 255, 0.5, 1, -1);

  orbitControl();

  rotateY(frameCount * 0.5);
  rotateX(frameCount * 0.3);

  drawCustomCube();
}

// ===============================
// WINDOW RESIZE (Your Template)
// ===============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

// ===============================
// GEOMETRY CREATION FUNCTION
// ===============================
function createCubeGeometry(size) {
  let s = size;

  cubeVertices = [
    createVector(-s, -s, -s),
    createVector(s, -s, -s),
    createVector(s, s, -s),
    createVector(-s, s, -s),
    createVector(-s, -s, s),
    createVector(s, -s, s),
    createVector(s, s, s),
    createVector(-s, s, s)
  ];

  cubeFaces = [
    [0, 1, 2, 3], // back
    [4, 5, 6, 7], // front
    [0, 1, 5, 4], // top
    [3, 2, 6, 7], // bottom
    [1, 2, 6, 5], // right
    [0, 3, 7, 4]  // left
  ];
}

// ===============================
// RENDER FUNCTION
// ===============================
function drawCustomCube() {
  for (let f = 0; f < cubeFaces.length; f++) {
    beginShape();
    fill(100 + f * 20, 150, 220);

    for (let i = 0; i < cubeFaces[f].length; i++) {
      let v = cubeVertices[cubeFaces[f][i]];
      vertex(v.x, v.y, v.z);
    }

    endShape(CLOSE);
  }
}
