import { useEffect, useRef } from 'react';

// Domain-warped fbm "liquid light" field in the brand palette. Raw WebGL keeps this tiny (no three.js).
const VERT = `attribute vec2 p; void main(){ gl_Position = vec4(p, 0.0, 1.0); }`;
const FRAG = `
precision mediump float;
uniform vec2 r; uniform float t; uniform vec2 m; uniform float g;
float h(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453); }
float n(vec2 p){ vec2 i = floor(p), f = fract(p); vec2 u = f*f*(3.0-2.0*f);
  return mix(mix(h(i), h(i+vec2(1,0)), u.x), mix(h(i+vec2(0,1)), h(i+vec2(1,1)), u.x), u.y); }
float fbm(vec2 p){ float v = 0.0, a = 0.5; for(int i = 0; i < 5; i++){ v += a*n(p); p *= 2.02; a *= 0.5; } return v; }
void main(){
  vec2 uv = gl_FragCoord.xy / r;
  vec2 p = uv * vec2(r.x / r.y, 1.0) * 1.55;
  float tt = t * 0.035;
  vec2 q = vec2(fbm(p + tt), fbm(p + vec2(5.2, 1.3) - tt));
  vec2 w = vec2(fbm(p + 3.0*q + vec2(1.7, 9.2) + tt*1.6), fbm(p + 3.0*q + vec2(8.3, 2.8) - tt));
  float f = fbm(p + 2.6*w + m*0.15);
  vec3 navy = vec3(0.027, 0.090, 0.145);
  vec3 deep = vec3(0.063, 0.169, 0.251);
  vec3 teal = vec3(0.086, 0.714, 0.643);
  vec3 gold = vec3(0.776, 0.631, 0.357);
  vec3 c = mix(navy, deep, smoothstep(0.25, 0.85, f));
  c = mix(c, teal * 0.6, smoothstep(0.55, 0.95, w.x) * 0.28);
  c += gold * pow(smoothstep(0.55, 1.0, f * w.y + 0.2), 3.0) * 0.5 * g;
  float vig = smoothstep(1.25, 0.15, length(uv - vec2(0.5 + m.x*0.04, 0.55 + m.y*0.04)));
  c *= mix(0.5, 1.0, vig);
  gl_FragColor = vec4(c, 1.0);
}`;

/**
 * Animated shader gradient canvas. Renders at reduced resolution, pauses off-screen,
 * and draws a single static frame for reduced-motion users.
 */
export default function ShaderBackground({ className = '', glow = 1, scale = 0.5 }) {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const gl = canvas?.getContext('webgl', { antialias: false, alpha: false, powerPreference: 'low-power' });
    if (!gl) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram();
    gl.attachShader(prog, sh(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, sh(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uR = gl.getUniformLocation(prog, 'r');
    const uT = gl.getUniformLocation(prog, 't');
    const uM = gl.getUniformLocation(prog, 'm');
    const uG = gl.getUniformLocation(prog, 'g');
    gl.uniform1f(uG, glow);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const resize = () => {
      const w = Math.max(1, Math.floor(canvas.clientWidth * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * scale));
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uR, w, h);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.ty = -((e.clientY / window.innerHeight) * 2 - 1);
    };
    window.addEventListener('pointermove', onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const start = performance.now();
    const draw = (now) => {
      mouse.x += (mouse.tx - mouse.x) * 0.04;
      mouse.y += (mouse.ty - mouse.y) * 0.04;
      gl.uniform1f(uT, reduced ? 20 : (now - start) / 1000 + 20);
      gl.uniform2f(uM, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduced && visible) raf = requestAnimationFrame(draw);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (visible) raf = requestAnimationFrame(draw);
    });
    io.observe(canvas);
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('pointermove', onMove);
      gl.deleteProgram(prog);
      gl.deleteBuffer(buf);
    };
  }, [glow, scale]);

  return <canvas ref={ref} aria-hidden="true" className={`block h-full w-full ${className}`} />;
}
