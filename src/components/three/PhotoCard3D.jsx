import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const CHIPS = [
  ["React", "#38bdf8"], ["Node.js", "#34d399"], ["React Native", "#818cf8"],
  ["MongoDB", "#4ade80"], ["AWS", "#fb923c"], ["Next.js", "#e2e8f0"],
  ["Express", "#f472b6"], ["Docker", "#60a5fa"],
];

const roundedShape = (w, h, r) => {
  const s = new THREE.Shape();
  const x = -w / 2, y = -h / 2;
  s.moveTo(x + r, y);
  s.lineTo(x + w - r, y); s.quadraticCurveTo(x + w, y, x + w, y + r);
  s.lineTo(x + w, y + h - r); s.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  s.lineTo(x + r, y + h); s.quadraticCurveTo(x, y + h, x, y + h - r);
  s.lineTo(x, y + r); s.quadraticCurveTo(x, y, x + r, y);
  return s;
};

const chipTexture = (label, color) => {
  const c = document.createElement("canvas");
  c.width = 320; c.height = 96;
  const g = c.getContext("2d");
  g.fillStyle = "rgba(10,14,30,0.82)";
  g.beginPath(); g.roundRect(4, 4, 312, 88, 44); g.fill();
  g.strokeStyle = color; g.lineWidth = 3; g.stroke();
  g.fillStyle = color;
  g.beginPath(); g.arc(44, 48, 9, 0, Math.PI * 2); g.fill();
  g.fillStyle = "#f1f5f9";
  g.font = "600 34px system-ui, sans-serif";
  g.textBaseline = "middle";
  g.fillText(label, 68, 50);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

const VERT = `varying vec2 vUv; void main(){ vUv = uv; gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0); }`;
const FRAG = `
  uniform sampler2D uMap; uniform vec2 uMouse; uniform float uTime; uniform float uAspect; uniform float uReveal;
  varying vec2 vUv;
  float sdBox(vec2 p, vec2 b, float r){ vec2 d = abs(p) - b + r; return length(max(d,0.0)) + min(max(d.x,d.y),0.0) - r; }
  void main(){
    vec2 p = (vUv - 0.5) * vec2(uAspect, 1.0);
    float d = sdBox(p, vec2(uAspect*0.5, 0.5), 0.06);
    float a = 1.0 - smoothstep(-0.004, 0.004, d);
    // subtle parallax zoom toward pointer
    vec2 uv = (vUv - 0.5) * 0.96 + 0.5 + (uMouse - 0.5) * 0.02;
    vec3 col = texture2D(uMap, uv).rgb;
    // glossy sheen band following the pointer
    float diag = dot(vUv - uMouse, normalize(vec2(1.0, 0.6)));
    float sheen = exp(-diag*diag*28.0) * 0.22;
    // scanline reveal
    float rv = smoothstep(uReveal - 0.15, uReveal, 1.0 - vUv.y);
    col += sheen;
    col *= mix(0.0, 1.0, 1.0 - rv);
    // vignette
    col *= 1.0 - 0.25 * smoothstep(0.35, 0.75, length(vUv - 0.5));
    gl_FragColor = vec4(col, a * (1.0 - rv));
    #include <colorspace_fragment>
  }`;

export default function PhotoCard3D({ src, alt }) {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const applyRef = useRef(null);

  useEffect(() => { applyRef.current?.(theme); }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    } catch { return; }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block;touch-action:pan-y";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(36, 1, 0.1, 50);
    camera.position.set(0, 0, 11);

    scene.add(new THREE.AmbientLight(0xffffff, 0.9));
    const key = new THREE.PointLight(0x818cf8, 60, 30); key.position.set(-5, 4, 6); scene.add(key);
    const rim = new THREE.PointLight(0x22d3ee, 50, 30); rim.position.set(6, -3, 4); scene.add(rim);

    const root = new THREE.Group(); scene.add(root);
    const tilt = new THREE.Group(); root.add(tilt);

    const aspect = 864 / 741;
    const H = 3.5, W = H * aspect;

    // Frame slab
    const frame = new THREE.Mesh(
      new THREE.ExtrudeGeometry(roundedShape(W + 0.28, H + 0.28, 0.26), {
        depth: 0.22, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 4, curveSegments: 24,
      }),
      new THREE.MeshStandardMaterial({ color: 0x1e1b4b, metalness: 0.85, roughness: 0.25 })
    );
    frame.position.z = -0.3;
    tilt.add(frame);

    // Glow edge behind slab
    const glow = new THREE.Mesh(
      new THREE.PlaneGeometry(W + 1.1, H + 1.1),
      new THREE.ShaderMaterial({
        transparent: true, depthWrite: false,
        uniforms: { uColor: { value: new THREE.Color(0x6366f1) } },
        vertexShader: VERT,
        fragmentShader: `varying vec2 vUv; uniform vec3 uColor; void main(){ float d = length((vUv-0.5)*vec2(1.0,1.0)); float a = smoothstep(0.62,0.28,d)*0.55; gl_FragColor = vec4(uColor, a); }`,
      })
    );
    glow.position.z = -0.6;
    tilt.add(glow);

    // Photo
    const photoMat = new THREE.ShaderMaterial({
      transparent: true, toneMapped: false,
      uniforms: {
        uMap: { value: null }, uMouse: { value: new THREE.Vector2(0.5, 0.5) },
        uTime: { value: 0 }, uAspect: { value: aspect }, uReveal: { value: reduced ? 1.2 : 0 },
      },
      vertexShader: VERT, fragmentShader: FRAG,
    });
    const photo = new THREE.Mesh(new THREE.PlaneGeometry(W, H), photoMat);
    photo.position.z = -0.02;
    tilt.add(photo);

    new THREE.TextureLoader().load(src, (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = renderer.capabilities.getMaxAnisotropy();
      photoMat.uniforms.uMap.value = tex;
    });

    // Orbiting skill chips at different depths
    const chips = CHIPS.map(([label, color], i) => {
      const tex = chipTexture(label, color);
      const m = new THREE.Mesh(
        new THREE.PlaneGeometry(1.5, 0.45),
        new THREE.MeshBasicMaterial({ map: tex, transparent: true, depthWrite: false })
      );
      scene.add(m);
      return { m, i, phase: (i / CHIPS.length) * Math.PI * 2, rx: W * 0.5 + (i % 2) * 0.2, ry: H * 0.6 + (i % 3) * 0.15, speed: 0.22 + (i % 3) * 0.05 };
    });

    // Particles
    const N = 260;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 6 - 1;
    }
    const pg = new THREE.BufferGeometry();
    pg.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pm = new THREE.PointsMaterial({ size: 0.045, transparent: true, opacity: 0.8 });
    scene.add(new THREE.Points(pg, pm));

    const apply = (t) => {
      const dark = t === "dark";
      glow.material.uniforms.uColor.value.setHex(dark ? 0x6366f1 : 0x818cf8);
      frame.material.color.setHex(dark ? 0x1e1b4b : 0x312e81);
      pm.color.setHex(dark ? 0xa5b4fc : 0x6366f1);
    };
    applyRef.current = apply; apply(theme);

    const resize = () => {
      const w = mount.clientWidth || 1, h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      // fit card + chips horizontally
      const needW = (W + 2.8);
      const vFov = THREE.MathUtils.degToRad(camera.fov);
      const distForW = needW / (2 * Math.tan(vFov / 2) * camera.aspect);
      camera.position.z = Math.max(7.5, distForW);
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(mount);

    const target = { x: 0, y: 0 }, cur = { x: 0, y: 0 };
    let hasPointer = false;
    const onMove = (e) => {
      const r = mount.getBoundingClientRect();
      const nx = ((e.clientX - r.left) / r.width) * 2 - 1;
      const ny = ((e.clientY - r.top) / r.height) * 2 - 1;
      target.x = THREE.MathUtils.clamp(nx, -1.4, 1.4);
      target.y = THREE.MathUtils.clamp(ny, -1.4, 1.4);
      hasPointer = true;
    };
    const onLeave = () => { hasPointer = false; };
    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);

    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      if (!hasPointer) { target.x = Math.sin(t * 0.5) * 0.5; target.y = Math.cos(t * 0.4) * 0.3; }
      cur.x += (target.x - cur.x) * 0.06;
      cur.y += (target.y - cur.y) * 0.06;

      const intro = reduced ? 1 : 1 - Math.pow(1 - Math.min(t / 1.6, 1), 3);
      root.scale.setScalar(0.7 + 0.3 * intro);
      root.rotation.y = (1 - intro) * -1.2;
      tilt.rotation.y = cur.x * 0.38;
      tilt.rotation.x = cur.y * 0.26;
      root.position.y = reduced ? 0 : Math.sin(t * 1.1) * 0.12;

      photoMat.uniforms.uMouse.value.set(0.5 + cur.x * 0.5, 0.5 - cur.y * 0.5);
      photoMat.uniforms.uTime.value = t;
      if (!reduced) photoMat.uniforms.uReveal.value = Math.min(1.2, Math.max(0, (t - 0.3) / 1.2) * 1.2);

      chips.forEach(({ m, phase, rx, ry, speed, i }) => {
        const a = phase + t * speed;
        const z = Math.sin(a) * 1.8;
        m.position.set(Math.cos(a) * rx + cur.x * 0.3, Math.sin(a * 1.3) * ry * 0.8 + cur.y * -0.2, z);
        m.quaternion.copy(camera.quaternion);
        const s = 0.85 + (z + 1.8) / 3.6 * 0.4;
        m.scale.setScalar(s);
        m.material.opacity = (0.35 + (z + 1.8) / 3.6 * 0.65) * intro;
        m.renderOrder = z > 0 ? 3 : 0;
        void i;
      });
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      ro.disconnect(); io.disconnect(); applyRef.current = null;
      scene.traverse((o) => {
        o.geometry?.dispose?.();
        const mats = Array.isArray(o.material) ? o.material : o.material ? [o.material] : [];
        mats.forEach((mt) => { mt.map?.dispose?.(); mt.dispose(); });
      });
      photoMat.uniforms.uMap.value?.dispose?.();
      renderer.dispose(); renderer.domElement.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return <div ref={mountRef} role="img" aria-label={alt} className="relative h-full w-full cursor-grab" />;
}
