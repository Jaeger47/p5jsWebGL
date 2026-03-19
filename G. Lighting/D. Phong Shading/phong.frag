precision mediump float;
varying vec3 vNormal;
varying vec3 vPosition;
uniform vec3 uLightPos;

void main() {
  vec3 n = normalize(vNormal);
  vec3 l = normalize(uLightPos - vPosition);
  vec3 v = normalize(-vPosition); // View direction
  vec3 r = reflect(-l, n);        // Reflection direction

  // 1. Ambient
  float ambient = 0.1;

  // 2. Diffuse
  float diffuse = max(dot(n, l), 0.0);

  // 3. Specular (The Phong shine)
  float shininess = 32.0;
  float specular = pow(max(dot(r, v), 0.0), shininess);

  vec3 color = vec3(1.0, 1.0, 0.0); // Base Blue color
  vec3 finalColor = color * (ambient + diffuse) + vec3(1.0) * specular;

  gl_FragColor = vec4(finalColor, 1.0);
}