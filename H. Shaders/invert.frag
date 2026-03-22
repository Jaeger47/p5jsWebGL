// ─── invert.frag ─────────────────────────────────────────────
// Shader 4 — Invert Colours
//
// Simple 1 − colour invert, plus a subtle pulsing desaturated
// border / vignette so it still feels designed rather than
// just a one-liner.
// ─────────────────────────────────────────────────────────────
precision mediump float;

uniform sampler2D tex0;
uniform vec2      resolution;
uniform float     time;

varying vec2 vTexCoord;

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // ── Core invert ───────────────────────────────────────────
  vec3 colour   = texture2D(tex0, uv).rgb;
  vec3 inverted = 1.0 - colour;

  // ── Vignette (soft edges stay readable) ──────────────────
  vec2 vig      = uv * (1.0 - uv.yx);
  float vignette = pow(vig.x * vig.y * 14.0, 0.4);      // 0→1 falloff
  inverted      *= vignette;

  // ── Subtle pulsing contrast boost (±5 %) ─────────────────
  float pulse   = 1.0 + 0.05 * sin(time * 1.8);
  inverted      = (inverted - 0.5) * pulse + 0.5;

  gl_FragColor  = vec4(clamp(inverted, 0.0, 1.0), 1.0);
}
