import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useTheme } from "../../context/ThemeContext";

const PALETTE = {
  dark: { bg: 0x020617, a: 0x6366f1, b: 0xd946ef, c: 0x22d3ee, dots: 0xa5b4fc, opacity: 0.9 },
  light: { bg: 0xf8fafc, a: 0x4f46e5, b: 0xc026d3, c: 0x0891b2, dots: 0x6366f1, opacity: 0.7 },
};

/* Full-bleed interactive 3D background: wireframe knot, glass shapes, particle field. */
export default function HeroScene() {
  const mountRef = useRef(null);
  const { theme } = useTheme();
  const themeRef = useRef(theme);
  const applyRef = useRef(null);

  useEffect(() => {
    themeRef.current = theme;
    applyRef.current?.(theme);
  }, [theme]);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      return; // no WebGL: CSS gradient behind stays visible
    }
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const small = window.innerWidth < 768;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.cssText = "width:100%;height:100%;display:block";

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 9;

    const group = new THREE.Group();
    scene.add(group);

    const mats = [];
    const wire = (geo, key) => {
      const m = new THREE.MeshBasicMaterial({ wireframe: true, transparent: true });
      mats.push({ m, key });
      return new THREE.Mesh(geo, m);
    };

    const knot = wire(new THREE.TorusKnotGeometry(1.7, 0.45, small ? 120 : 220, 16), "a");
    knot.position.set(small ? 0 : 3.2, 0, -1);
    group.add(knot);

    const ico = wire(new THREE.IcosahedronGeometry(0.9, 1), "b");
    ico.position.set(small ? -2 : -5, 2.4, -2);
    group.add(ico);

    const oct = wire(new THREE.OctahedronGeometry(0.8), "c");
    oct.position.set(small ? 2 : -3.2, -2.6, 0);
    group.add(oct);

    const ring = wire(new THREE.TorusGeometry(1.2, 0.05, 12, 80), "c");
    ring.position.set(small ? 2 : 6.5, 3, -3);
    group.add(ring);

    // Particle field
    const N = small ? 350 : 900;
    const pos = new Float32Array(N * 3);
    for (let i = 0; i < N; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 30;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 20 - 4;
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    const pMat = new THREE.PointsMaterial({ size: 0.05, transparent: true, sizeAttenuation: true });
    const points = new THREE.Points(pGeo, pMat);
    scene.add(points);

    const apply = (t) => {
      const p = PALETTE[t];
      mats.forEach(({ m, key }) => { m.color.setHex(p[key]); m.opacity = p.opacity * 0.55; });
      pMat.color.setHex(p.dots);
      pMat.opacity = p.opacity;
    };
    applyRef.current = apply;
    apply(themeRef.current);

    const resize = () => {
      const w = mount.clientWidth || 1;
      const h = mount.clientHeight || 1;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    const onMove = (e) => {
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let raf = 0;
    let visible = true;
    const io = new IntersectionObserver(([en]) => { visible = en.isIntersecting; }, { threshold: 0 });
    io.observe(mount);

    const clock = new THREE.Clock();
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      if (!reduced) {
        knot.rotation.x = t * 0.18; knot.rotation.y = t * 0.25;
        ico.rotation.x = t * 0.3; ico.rotation.y = t * 0.2;
        oct.rotation.y = t * 0.4; oct.rotation.z = t * 0.2;
        ring.rotation.x = t * 0.35; ring.rotation.y = t * 0.15;
        ico.position.y = 2.4 + Math.sin(t) * 0.3;
        oct.position.y = -2.6 + Math.cos(t * 0.8) * 0.3;
        points.rotation.y = t * 0.02;
      }
      group.rotation.y = mouse.x * 0.35;
      group.rotation.x = mouse.y * 0.2;
      points.position.x = -mouse.x * 0.6;
      points.position.y = mouse.y * 0.4;
      // scroll parallax
      camera.position.y = -Math.min(window.scrollY, 900) * 0.004;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      ro.disconnect();
      io.disconnect();
      applyRef.current = null;
      scene.traverse((o) => { o.geometry?.dispose?.(); o.material?.dispose?.(); });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0" aria-hidden />;
}
