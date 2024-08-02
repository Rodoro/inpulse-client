export const oneVertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
export const oneFragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform bool u_enable;
varying vec2 v_uv;

void main() {
  vec4 tex = texture2D(u_texture, v_uv);

  vec2 aspect = vec2(u_aspect, 1.0);
  float radius = 0.19;
  float dist = distance(u_mouse * aspect, v_uv * aspect);
  float d = 1.0 - smoothstep(radius, radius + 0.005, dist);
  
  if (u_enable) {
    tex.a = mix(tex.a, 0.0, d);
  }

  gl_FragColor = tex;
}
`

export const twoVertexShader = `
varying vec2 v_uv;

void main() {
  v_uv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`
export const twoFragmentShader = `
uniform sampler2D u_texture;
uniform vec2 u_mouse;
uniform float u_aspect;
uniform bool u_enable;
varying vec2 v_uv;

void main() {
  vec2 aspect = vec2(u_aspect, 1.0);
  float radius = 0.19;
  float dist = distance(u_mouse * aspect, v_uv * aspect);
  float d = smoothstep(radius, radius + 0.005, dist);

  vec2 displacement = (u_mouse - v_uv) * aspect * pow(dist * 1.7, 1.5);
  vec2 uv = v_uv - displacement;
  vec4 tex = texture2D(u_texture, uv);
  tex.a = mix(tex.a, 0.0, d);
  
  if (!u_enable) {
    tex.a = 0.0;
  }

  gl_FragColor = tex;
}
`
