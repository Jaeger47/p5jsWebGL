// ─── screen.vert ────────────────────────────────────────────
// Shared vertex shader for all post-processing passes.
// Transforms the fullscreen rect into clip-space and passes
// UV coordinates to the fragment shader.
// ────────────────────────────────────────────────────────────

attribute vec3 aPosition;
attribute vec2 aTexCoord;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying vec2 vTexCoord;

void main() {
  vTexCoord   = aTexCoord;
  gl_Position = uProjectionMatrix * uModelViewMatrix * vec4(aPosition, 1.0);
}
