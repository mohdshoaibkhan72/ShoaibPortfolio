import { useEffect, useRef } from "react";
import {
  AdditiveBlending,
  BufferAttribute,
  BufferGeometry,
  Color,
  Group,
  NormalBlending,
  PerspectiveCamera,
  Points,
  Scene,
  ShaderMaterial,
  WebGLRenderer,
} from "three";
import { useTheme } from "../../context/ThemeContext";

const PALETTE = {
  dark: { base: "#ecebe6", glow: "#c8ff3e", opacity: 0.95, additive: true },
  light: { base: "#161616", glow: "#4a780a", opacity: 0.85, additive: false },
};

// 3D simplex noise — Ashima Arts / Stefan Gustavson (MIT).
const NOISE = /* glsl */ `
vec3 mod289(vec3 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}
vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}
vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}
float snoise(vec3 v){
  const vec2 C=vec2(1.0/6.0,1.0/3.0);const vec4 D=vec4(0.0,0.5,1.0,2.0);
  vec3 i=floor(v+dot(v,C.yyy));vec3 x0=v-i+dot(i,C.xxx);
  vec3 g=step(x0.yzx,x0.xyz);vec3 l=1.0-g;vec3 i1=min(g.xyz,l.zxy);vec3 i2=max(g.xyz,l.zxy);
  vec3 x1=x0-i1+C.xxx;vec3 x2=x0-i2+C.yyy;vec3 x3=x0-D.yyy;
  i=mod289(i);
  vec4 p=permute(permute(permute(i.z+vec4(0.0,i1.z,i2.z,1.0))+i.y+vec4(0.0,i1.y,i2.y,1.0))+i.x+vec4(0.0,i1.x,i2.x,1.0));
  float n_=0.142857142857;vec3 ns=n_*D.wyz-D.xzx;
  vec4 j=p-49.0*floor(p*ns.z*ns.z);vec4 x_=floor(j*ns.z);vec4 y_=floor(j-7.0*x_);
  vec4 x=x_*ns.x+ns.yyyy;vec4 y=y_*ns.x+ns.yyyy;vec4 h=1.0-abs(x)-abs(y);
  vec4 b0=vec4(x.xy,y.xy);vec4 b1=vec4(x.zw,y.zw);
  vec4 s0=floor(b0)*2.0+1.0;vec4 s1=floor(b1)*2.0+1.0;vec4 sh=-step(h,vec4(0.0));
  vec4 a0=b0.xzyw+s0.xzyw*sh.xxyy;vec4 a1=b1.xzyw+s1.xzyw*sh.zzww;
  vec3 p0=vec3(a0.xy,h.x);vec3 p1=vec3(a0.zw,h.y);vec3 p2=vec3(a1.xy,h.z);vec3 p3=vec3(a1.zw,h.w);
  vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));
  p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;
  vec4 m=max(0.6-vec4(dot(x0,x0),dot(x1,x1),dot(x2,x2),dot(x3,x3)),0.0);m=m*m;
  return 42.0*dot(m*m,vec4(dot(p0,x0),dot(p1,x1),dot(p2,x2),dot(p3,x3)));
}`;

const vertexShader = /* glsl */ `
uniform float uTime;
uniform float uSize;
uniform float uAmp;
attribute float aRand;
varying float vNoise;
varying float vDepth;
${NOISE}
void main() {
  vec3 p = position;
  float n = snoise(p * 0.85 + vec3(0.0, uTime * 0.2, uTime * 0.11));
  float n2 = snoise(p * 2.3 - vec3(uTime * 0.14));
  float disp = (n + n2 * 0.25) * uAmp;
  p += normalize(position) * disp;
  vNoise = n;
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  vDepth = clamp((-mv.z - 5.4) / 3.2, 0.0, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = uSize * (0.55 + aRand * 0.9) * (1.0 + max(disp, 0.0) * 2.2) / -mv.z;
}`;

const fragmentShader = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uGlow;
uniform float uOpacity;
varying float vNoise;
varying float vDepth;
void main() {
  float d = length(gl_PointCoord - 0.5);
  if (d > 0.5) discard;
  float alpha = smoothstep(0.5, 0.05, d);
  vec3 col = mix(uBase, uGlow, smoothstep(0.12, 0.7, vNoise));
  gl_FragColor = vec4(col, alpha * mix(1.0, 0.16, vDepth) * uOpacity);
}`;

/** Evenly spread points over a sphere (Fibonacci lattice). */
function spherePoints(count, radius) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  const golden = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < count; i++) {
    const y = 1 - (i / (count - 1)) * 2;
    const r = Math.sqrt(1 - y * y);
    const t = golden * i;
    pos.set([Math.cos(t) * r * radius, y * radius, Math.sin(t) * r * radius], i * 3);
    rand[i] = Math.random();
  }
  return { pos, rand };
}

function ringPoints(count, radius) {
  const pos = new Float32Array(count * 3);
  const rand = new Float32Array(count);
  for (let i = 0; i < count; i++) {
    const a = (i / count) * Math.PI * 2;
    const r = radius + (Math.random() - 0.5) * 0.12;
    pos.set([Math.cos(a) * r, (Math.random() - 0.5) * 0.04, Math.sin(a) * r], i * 3);
    rand[i] = Math.random() * 0.6;
  }
  return { pos, rand };
}

function makeLayer({ pos, rand }, amp, size) {
  const geometry = new BufferGeometry();
  geometry.setAttribute("position", new BufferAttribute(pos, 3));
  geometry.setAttribute("aRand", new BufferAttribute(rand, 1));
  const material = new ShaderMaterial({
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    uniforms: {
      uTime: { value: 0 },
      uSize: { value: size },
      uAmp: { value: amp },
      uBase: { value: new Color() },
      uGlow: { value: new Color() },
      uOpacity: { value: 1 },
    },
  });
  return new Points(geometry, material);
}

/** Interactive particle sphere for the hero. Purely decorative. */
export default function HeroSphere() {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const applyThemeRef = useRef(() => {});

  useEffect(() => {
    applyThemeRef.current(theme);
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch {
      return; // No WebGL — the hero still works without the sphere.
    }

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    renderer.setPixelRatio(dpr);
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";
    mount.appendChild(renderer.domElement);

    const scene = new Scene();
    const camera = new PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.z = 7;

    const group = new Group();
    const sphere = makeLayer(spherePoints(small ? 2600 : 5200, 1.5), 0.28, 24 * dpr);
    const ring = makeLayer(ringPoints(small ? 500 : 900, 2.05), 0.04, 16 * dpr);
    ring.rotation.set(1.18, 0.2, 0.32);
    group.add(sphere, ring);
    scene.add(group);
    const layers = [sphere, ring];

    applyThemeRef.current = (t) => {
      const p = PALETTE[t] || PALETTE.dark;
      layers.forEach(({ material }) => {
        material.uniforms.uBase.value.set(p.base);
        material.uniforms.uGlow.value.set(p.glow);
        material.uniforms.uOpacity.value = p.opacity;
        material.blending = p.additive ? AdditiveBlending : NormalBlending;
        material.needsUpdate = true;
      });
    };
    applyThemeRef.current(document.documentElement.getAttribute("data-theme") || "dark");

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = mount;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const target = { x: 0, y: 0 };
    const onPointer = (e) => {
      target.y = (e.clientX / window.innerWidth - 0.5) * 0.9;
      target.x = (e.clientY / window.innerHeight - 0.5) * 0.55;
    };
    if (!reduced) window.addEventListener("pointermove", onPointer, { passive: true });

    let frame = 0;
    let running = true;
    let visible = true;
    const start = performance.now();

    const render = (now) => {
      const t = reduced ? 3 : (now - start) / 1000;
      layers.forEach(({ material }) => (material.uniforms.uTime.value = t));
      sphere.rotation.y = t * 0.07;
      ring.rotation.z = 0.32 + t * 0.05;
      group.rotation.x += (target.x - group.rotation.x) * 0.035;
      group.rotation.y += (target.y - group.rotation.y) * 0.035;
      renderer.render(scene, camera);
    };

    const loop = (now) => {
      render(now);
      if (running && visible) frame = requestAnimationFrame(loop);
    };
    const resume = () => {
      cancelAnimationFrame(frame);
      if (!reduced && running && visible && !document.hidden) frame = requestAnimationFrame(loop);
    };

    render(performance.now());
    requestAnimationFrame(() => mount.style.setProperty("opacity", "1"));
    resume();

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      resume();
    });
    io.observe(mount);
    const onVisibility = () => resume();
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(frame);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("pointermove", onPointer);
      document.removeEventListener("visibilitychange", onVisibility);
      applyThemeRef.current = () => {};
      layers.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="h-full w-full opacity-0 transition-opacity duration-[1.6s]" aria-hidden="true" />;
}
