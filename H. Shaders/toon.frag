// ─── toon.frag ──────────────────────────────────────────────
// Shader 1 — Toon / Cel Shading
//
// Technique:
//   1. Posterise (quantise) RGB into discrete bands → "paint-by-numbers" look
//   2. Sobel edge detection on the luminance signal → bold outlines
//   3. Multiply edges back over the posterised colour
// ────────────────────────────────────────────────────────────
precision mediump float;

uniform sampler2D tex0;
uniform vec2      resolution;

varying vec2 vTexCoord;

// How many colour steps per channel (try 3.0–6.0)
const float LEVELS      = 4.0;
// Edge darkness amount (0 = no edge, 1 = fully black)
const float EDGE_WEIGHT = 0.85;
// Edge threshold — raise to thin the outlines, lower to thicken
const float THRESHOLD   = 0.18;

// Relative luminance (BT.709)
float luma(vec3 c) {
  return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;            // flip Y — p5 graphics buffers store top-down

  // ── 1. Posterise ──────────────────────────────────────────
  vec4  base = texture2D(tex0, uv);
  vec3  cel  = floor(base.rgb * LEVELS + 0.5) / LEVELS;

  // ── 2. Sobel on luma ──────────────────────────────────────
  vec2 px = 1.5 / resolution;   // one pixel in UV space

  // 3×3 neighbourhood
  float tl = luma(texture2D(tex0, uv + vec2(-px.x,  px.y)).rgb);
  float tc = luma(texture2D(tex0, uv + vec2( 0.0,   px.y)).rgb);
  float tr = luma(texture2D(tex0, uv + vec2( px.x,  px.y)).rgb);
  float ml = luma(texture2D(tex0, uv + vec2(-px.x,  0.0 )).rgb);
  float mr = luma(texture2D(tex0, uv + vec2( px.x,  0.0 )).rgb);
  float bl = luma(texture2D(tex0, uv + vec2(-px.x, -px.y)).rgb);
  float bc = luma(texture2D(tex0, uv + vec2( 0.0,  -px.y)).rgb);
  float br = luma(texture2D(tex0, uv + vec2( px.x, -px.y)).rgb);

  float gx = -tl - 2.0*ml - bl + tr + 2.0*mr + br;
  float gy = -tl - 2.0*tc - tr + bl + 2.0*bc + br;
  float edge = step(THRESHOLD, sqrt(gx*gx + gy*gy));

  // ── 3. Composite ──────────────────────────────────────────
  vec3 colour = cel * (1.0 - edge * EDGE_WEIGHT);
  gl_FragColor = vec4(colour, 1.0);
}
