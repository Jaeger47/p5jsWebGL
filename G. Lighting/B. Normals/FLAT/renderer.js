let cubeVertices = [];
let cubeFaces = [];

// ===============================
// SETUP
// ===============================
function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  colorMode(RGB);
  perspective(-45, -width / height, 0.1, 1000);

  createCubeGeometry(150);
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

  drawFlatCube();
}

// ===============================
// CREATE CUBE GEOMETRY
// ===============================
function createCubeGeometry(size) {
  let s = size / 2;

  cubeVertices = [
    createVector(-s, -s,  s), // 0
    createVector( s, -s,  s), // 1
    createVector( s,  s,  s), // 2
    createVector(-s,  s,  s), // 3
    createVector(-s, -s, -s), // 4
    createVector( s, -s, -s), // 5
    createVector( s,  s, -s), // 6
    createVector(-s,  s, -s)  // 7
  ];

  cubeFaces = [
    [0, 1, 2], [0, 2, 3],
    [1, 5, 6], [1, 6, 2],
    [5, 4, 7], [5, 7, 6],
    [4, 0, 3], [4, 3, 7],
    [3, 2, 6], [3, 6, 7],
    [4, 5, 1], [4, 1, 0]
  ];
}

// ===============================
// DRAW FLAT CUBE
// ===============================
function drawFlatCube() {
  specularMaterial(220);
  shininess(40);

  beginShape(TRIANGLES);

  for (let face of cubeFaces) {
    let v1 = cubeVertices[face[0]];
    let v2 = cubeVertices[face[1]];
    let v3 = cubeVertices[face[2]];

    // Accurate per-face normal
    let edge1 = p5.Vector.sub(v2, v1);
    let edge2 = p5.Vector.sub(v3, v1);
    let faceNormal = edge1.cross(edge2).normalize();

    // Apply same normal to all vertices
    normal(faceNormal.x, faceNormal.y, faceNormal.z);
    vertex(v1.x, v1.y, v1.z);
    vertex(v2.x, v2.y, v2.z);
    vertex(v3.x, v3.y, v3.z);
  }

  endShape();
}

// ===============================
// WINDOW RESIZE
// ===============================
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
