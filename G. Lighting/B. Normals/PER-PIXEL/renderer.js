let cubeVertices = [];
let cubeFaces = [];
let vertexNormals = [];

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
  computeVertexNormals(); // precompute per-vertex normals
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

  drawSmoothCube();
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
// COMPUTE PER-VERTEX NORMALS
// ===============================
function computeVertexNormals() {
  vertexNormals = [];
  for (let i = 0; i < cubeVertices.length; i++) {
    vertexNormals.push(createVector(0, 0, 0));
  }

  // Accumulate face normals
  for (let face of cubeFaces) {
    let v1 = cubeVertices[face[0]];
    let v2 = cubeVertices[face[1]];
    let v3 = cubeVertices[face[2]];

    let edge1 = p5.Vector.sub(v2, v1);
    let edge2 = p5.Vector.sub(v3, v1);
    let faceNormal = edge1.cross(edge2).normalize();

    vertexNormals[face[0]].add(faceNormal);
    vertexNormals[face[1]].add(faceNormal);
    vertexNormals[face[2]].add(faceNormal);
  }

  // Normalize vertex normals
  for (let n of vertexNormals) {
    n.normalize();
  }
}

// ===============================
// DRAW SMOOTH CUBE
// ===============================
function drawSmoothCube() {
  specularMaterial(220);
  shininess(40);

  beginShape(TRIANGLES);

  for (let face of cubeFaces) {
    let v1 = cubeVertices[face[0]];
    let v2 = cubeVertices[face[1]];
    let v3 = cubeVertices[face[2]];

    // Use precomputed per-vertex normals
    let n1 = vertexNormals[face[0]];
    let n2 = vertexNormals[face[1]];
    let n3 = vertexNormals[face[2]];

    normal(n1.x, n1.y, n1.z);
    vertex(v1.x, v1.y, v1.z);

    normal(n2.x, n2.y, n2.z);
    vertex(v2.x, v2.y, v2.z);

    normal(n3.x, n3.y, n3.z);
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
