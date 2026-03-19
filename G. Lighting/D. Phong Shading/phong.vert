attribute vec3 aPosition;
attribute vec3 aNormal;
varying vec3 vNormal;
varying vec3 vPosition;

uniform mat4 uProjectionMatrix;
uniform mat4 uModelViewMatrix;

void main() {
  vNormal = aNormal;
  vPosition = aPosition;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}