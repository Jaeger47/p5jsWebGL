//sfx
let sfx1;
let sfx2;
let sfx3;
let music;

function preload() {
  sfx1 = loadSound('sounds/snare.mp3'); // replace with your file
  sfx2 = loadSound('sounds/bass.mp3'); // replace with your file
  sfx3 = loadSound('sounds/cymbals.mp3'); // replace with your file
  music = loadSound('sounds/music-sh.mp3'); // replace with your file
}

function setup() {
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  angleMode(DEGREES);
  perspective(-45, -width / height, 0.1, 1000);
}

function draw() {
  background(0);

  // lighting
  ambientLight(80);
  directionalLight(255, 255, 255, 0.5, 1, -0.5);

  // spinning box
  rotateY(frameCount * 0.5);

	  // visual feedback when sound plays
	if (sfx1.isPlaying()) {
	  ambientMaterial(255, 100, 100);
	} else if (sfx2.isPlaying()) {
	  ambientMaterial(100, 255, 100);
	} else if (sfx3.isPlaying()) {
	  ambientMaterial(100, 100, 255);
	} 
	else if (music.isPlaying()) {
	  ambientMaterial(0, 0, 0);
	}
	else {
	  ambientMaterial(100);
	}

  box(150);
}

function keyPressed() {
  userStartAudio();

  if (key === '1') {
    sfx1.play(); // play sound effect
  }
  if (key === '2') {
    sfx2.play(); // play sound effect
  }
  if (key === '3') {
    sfx3.play(); // play sound effect
  }
  if (key === 'p') {
    music.play(); // play sound effect
  }
  if (key === 's') {
    music.stop(); // play sound effect
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}