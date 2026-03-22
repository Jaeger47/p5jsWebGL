// ─── random.frag ─────────────────────────────────────────────
// Shader 5 — Psychedelic / Dream
//
// Layers:
//   1. Warped UVs — sinusoidal waves that slide over time
//   2. RGB channel splits that orbit independently
//   3. Full hue rotation via a 3×3 matrix (colour wheel spins)
//   4. Saturation boost so colours really pop
//   5. Subtle radial pulsing vignette
// ─────────────────────────────────────────────────────────────
precision mediump float;

uniform sampler2D tex0;
uniform vec2      resolution;
uniform float     time;

varying vec2 vTexCoord;

// ── Hue-rotation matrix (angle in radians) ────────────────────
mat3 hueRotate(float a) {
  float c = cos(a);
  float s = sin(a);
  // Standard RGB hue-rotation matrix (luminance-preserving)
  return mat3(
    0.299 + 0.701*c - 0.168*s,  0.587 - 0.587*c + 0.330*s,  0.114 - 0.114*c - 0.497*s,
    0.299 - 0.299*c + 0.328*s,  0.587 + 0.413*c + 0.035*s,  0.114 - 0.114*c - 0.292*s,
    0.299 - 0.300*c - 1.250*s,  0.587 - 0.588*c + 1.050*s,  0.114 + 0.886*c + 0.203*s
  );
}

void main() {
  vec2 uv  = vTexCoord;
  uv.y     = 1.0 - uv.y;
  vec2 center = uv - 0.5;           // centre UVs for symmetric warping

  // ── 1. UV warp ────────────────────────────────────────────
  float t   = time * 0.6;
  float warpStr = 0.018;
  vec2 warp;
  warp.x = sin(center.y * 8.0  + t * 1.30) * warpStr
         + sin(center.y * 14.0 - t * 0.70) * warpStr * 0.5;
  warp.y = cos(center.x * 9.0  + t * 1.10) * warpStr
         + cos(center.x * 18.0 - t * 0.90) * warpStr * 0.5;
  vec2 warpedUV = uv + warp;

  // ── 2. RGB channel splits (orbit independently) ───────────
  float split = 0.009;
  float rAngle = t * 0.7;
  float bAngle = t * 0.7 + 2.094;  // +120°
  vec2 rOff    = vec2(cos(rAngle), sin(rAngle)) * split;
  vec2 bOff    = vec2(cos(bAngle), sin(bAngle)) * split;

  float r = texture2D(tex0, clamp(warpedUV + rOff, 0.001, 0.999)).r;
  float g = texture2D(tex0, clamp(warpedUV,         0.001, 0.999)).g;
  float b = texture2D(tex0, clamp(warpedUV + bOff, 0.001, 0.999)).b;
  vec3 colour = vec3(r, g, b);

  // ── 3. Hue rotation ───────────────────────────────────────
  colour = hueRotate(t * 1.2) * colour;

  // ── 4. Saturation boost ───────────────────────────────────
  float luma   = dot(colour, vec3(0.2126, 0.7152, 0.0722));
  float satBoost = 2.2;
  colour       = mix(vec3(luma), colour, satBoost);
  colour       = clamp(colour, 0.0, 1.0);

  // ── 5. Radial pulsing vignette ────────────────────────────
  float dist   = length(center);
  float vignette = 1.0 - smoothstep(0.35, 0.75, dist);
  vignette     = mix(0.85, 1.0, vignette);              // never fully black
  colour      *= vignette;

  gl_FragColor = vec4(colour, 1.0);
}
