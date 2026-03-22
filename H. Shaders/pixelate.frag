// ─── pixelate.frag ──────────────────────────────────────────
// Shader 2 — Pixelation
//
// Technique:
//   Snap each UV to the centre of a pixel-sized block, then
//   sample once.  Adjustable PIXEL_SIZE constant controls
//   the visible "pixel" size in screen pixels.
//
//   Also applies a subtle CRT-like dot-mask to make the
//   effect feel more retro and give each block a slight
//   dark edge (purely visual — not affecting colour accuracy).
// ────────────────────────────────────────────────────────────
precision mediump float;

uniform sampler2D tex0;
uniform vec2      resolution;

varying vec2 vTexCoord;

// Screen-pixels per "big pixel" — tweak to taste
const float PIXEL_SIZE = 8.0;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // ── 1. Snap to block centre ───────────────────────────────
  vec2 blocks    = resolution / PIXEL_SIZE;
  vec2 snappedUV = (floor(uv * blocks) + 0.5) / blocks;
  vec4 colour    = texture2D(tex0, snappedUV);

  // ── 2. Subtle dot-mask grid ───────────────────────────────
  // Darkens pixels slightly at block boundaries for that
  // retro LCD / mosaic feel.
  vec2 inBlock   = fract(uv * blocks);                   // 0→1 within each block
  vec2 edge      = smoothstep(0.0, 0.08, inBlock) *
                   smoothstep(1.0, 0.92, inBlock);       // sharp 0→1→0 per axis
  float grid     = edge.x * edge.y;
  grid           = mix(0.80, 1.0, grid);                 // 80 % brightness at edges

  gl_FragColor   = vec4(colour.rgb * grid, 1.0);
}
