// ─── vhs.frag ───────────────────────────────────────────────
// Shader 3 — VHS / Glitch Effect
//
// Layers (in order):
//   1. Horizontal tape-wobble jitter on individual scanlines
//   2. Occasional horizontal glitch bars (random blocks)
//   3. RGB chromatic aberration (channels offset horizontally)
//   4. CRT scanlines (cosine-modulated brightness)
//   5. VHS colour bleed (low-pass horizontal smear on chroma)
//   6. Film-grain noise
//   7. Corner vignette
// ────────────────────────────────────────────────────────────
precision mediump float;

uniform sampler2D tex0;
uniform vec2      resolution;
uniform float     time;

varying vec2 vTexCoord;

// ── Noise helpers ─────────────────────────────────────────────
float hash1(float n) {
  return fract(sin(n) * 43758.5453123);
}
float hash2(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

void main() {
  vec2 uv = vTexCoord;
  uv.y = 1.0 - uv.y;

  // ── 1. Tape-wobble: every scanline shifts slightly ─────────
  float wobble   = hash1(floor(uv.y * resolution.y) + floor(time * 15.0)) * 2.0 - 1.0;
  wobble        *= 0.0025 * (0.5 + 0.5 * sin(time * 2.3 + uv.y * 60.0));
  uv.x          += wobble;

  // ── 2. Random glitch bars (horizontal strips of UV shift) ─
  float barRow   = floor(uv.y * 24.0);
  float barNoise = hash2(vec2(barRow, floor(time * 6.0)));
  float iGlitch  = step(0.94, barNoise);                 // ~6 % rows glitch
  uv.x          += iGlitch * (hash2(vec2(barRow, time)) - 0.5) * 0.06;
  uv.x           = clamp(uv.x, 0.0, 1.0);

  // ── 3. Chromatic aberration ───────────────────────────────
  float aberr    = 0.004 + iGlitch * 0.012;
  float rChannel = texture2D(tex0, uv + vec2( aberr, 0.0)).r;
  float gChannel = texture2D(tex0, uv                    ).g;
  float bChannel = texture2D(tex0, uv - vec2( aberr, 0.0)).b;
  vec3  colour   = vec3(rChannel, gChannel, bChannel);

  // ── 4. CRT scanlines ──────────────────────────────────────
  float scan     = cos(uv.y * resolution.y * 3.14159 * 2.0);
  float scanMask = mix(0.75, 1.0, scan * 0.5 + 0.5);    // 75 %–100 % brightness
  colour        *= scanMask;

  // ── 5. VHS colour bleed (horizontal luma-chroma smear) ───
  float bleed    = 0.003;
  vec3  sL       = texture2D(tex0, uv - vec2(bleed, 0.0)).rgb;
  vec3  sR       = texture2D(tex0, uv + vec2(bleed, 0.0)).rgb;
  // Mix only the colour channels (Cb / Cr proxy = B − Y, R − Y)
  colour.r       = mix(colour.r, (colour.r + sR.r) * 0.5, 0.35);
  colour.b       = mix(colour.b, (colour.b + sL.b) * 0.5, 0.35);

  // ── 6. Film-grain noise ───────────────────────────────────
  float grain    = (hash2(uv + fract(time * 13.7)) - 0.5) * 0.06;
  colour        += grain;

  // ── 7. Vignette ───────────────────────────────────────────
  vec2  vig      = uv * (1.0 - uv.yx);
  float vignette = pow(vig.x * vig.y * 16.0, 0.35);
  colour        *= vignette;

  // ── Slight desaturation for that faded VHS look ───────────
  float luma     = dot(colour, vec3(0.2126, 0.7152, 0.0722));
  colour         = mix(vec3(luma), colour, 0.75);

  gl_FragColor   = vec4(clamp(colour, 0.0, 1.0), 1.0);
}
