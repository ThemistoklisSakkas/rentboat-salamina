"use client";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { MapPin, ArrowUpRight } from "lucide-react";

type Spot = { gr: string; en: string; x: number; z: number };

const SPOTS: Spot[] = [
  { gr: "Κανάκια",          en: "Kanakia",           x:  0.2, z:  2.2 },
  { gr: "Παραλία Αίας",     en: "Aias Beach",        x: -2.2, z:  0.3 },
  { gr: "Λαμπρανό",         en: "Lamprano Beach",    x: -1.4, z:  1.6 },
  { gr: "Κολώνες Πατητήρι", en: "Columns Patitiri",  x:  1.9, z: -1.3 },
  { gr: "Ηλιαχτή",          en: "Iliaxti Beach",     x:  0.1, z: -2.2 },
  { gr: "Φάρος Κόγχης",     en: "Konchi Lighthouse", x:  2.3, z:  0.6 },
  { gr: "Μυστικές Παραλίες",en: "Secret Beaches",    x: -1.0, z: -1.6 },
  { gr: "Σπήλαιο Ευριπίδη", en: "Euripides' Cave",   x:  0.5, z:  0.2 },
  { gr: "Αρχαία Σαλαμίνα",  en: "Ancient Salamina",  x:  1.2, z:  1.4 },
];

const mapsHref = (en: string) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(en + " Salamina Greece")}`;

export default function SalaminaMap3D() {
  const mountRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const isMobile =
      window.innerWidth < 768 ||
      /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    let W = mount.clientWidth;
    let H = mount.clientHeight;

    // ── Scene / camera / renderer ──────────────────────────────────────────
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W / H, 0.1, 100);
    const baseCam = new THREE.Vector3(0, 4.6, 7.4);
    const target = new THREE.Vector3(0, 0.7, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, isMobile ? 1.5 : 2));
    if (!isMobile) {
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    }
    mount.appendChild(renderer.domElement);

    // ── Lighting ───────────────────────────────────────────────────────────
    scene.add(new THREE.AmbientLight(0xffffff, 0.75));
    const key = new THREE.DirectionalLight(0xfff4e0, 1.0);
    key.position.set(5, 9, 4);
    if (!isMobile) {
      key.castShadow = true;
      key.shadow.mapSize.set(1024, 1024);
      key.shadow.camera.near = 1;
      key.shadow.camera.far = 30;
      const c = key.shadow.camera as THREE.OrthographicCamera;
      c.left = -8; c.right = 8; c.top = 8; c.bottom = -8;
    }
    scene.add(key);
    const rim = new THREE.DirectionalLight(0x9fd8ff, 0.4);
    rim.position.set(-6, 3, -5);
    scene.add(rim);

    // ── Water ──────────────────────────────────────────────────────────────
    const water = new THREE.Mesh(
      new THREE.CircleGeometry(8, isMobile ? 32 : 64),
      new THREE.MeshStandardMaterial({
        color: 0x4ec9d6,
        roughness: 0.35,
        metalness: 0.15,
        transparent: true,
        opacity: 0.95,
      })
    );
    water.rotation.x = -Math.PI / 2;
    water.position.y = 0.18;
    if (!isMobile) water.receiveShadow = true;
    scene.add(water);
    // lighter foam ring
    const foam = new THREE.Mesh(
      new THREE.RingGeometry(3.1, 3.7, isMobile ? 32 : 64),
      new THREE.MeshBasicMaterial({ color: 0xbdeef2, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
    );
    foam.rotation.x = -Math.PI / 2;
    foam.position.y = 0.2;
    scene.add(foam);

    // ── Island group (this is what rotates) ─────────────────────────────────
    const island = new THREE.Group();
    scene.add(island);

    // organic blob outline → ExtrudeGeometry (green cap, beige bevelled sides)
    const R = 3.1;
    const radii = [1.0, 0.82, 1.08, 0.9, 1.12, 0.86, 1.04, 0.8, 1.1, 0.92, 1.02, 0.88];
    const pts: THREE.Vector2[] = [];
    for (let i = 0; i < radii.length; i++) {
      const a = (i / radii.length) * Math.PI * 2;
      pts.push(new THREE.Vector2(Math.cos(a) * R * radii[i], Math.sin(a) * R * radii[i]));
    }
    const shape = new THREE.Shape();
    shape.moveTo(pts[0].x, pts[0].y);
    shape.splineThru([...pts.slice(1), pts[0]]);

    const extrude = new THREE.ExtrudeGeometry(shape, {
      depth: 0.7,
      bevelEnabled: true,
      bevelThickness: 0.45,
      bevelSize: 0.45,
      bevelSegments: isMobile ? 2 : 4,
      steps: 1,
      curveSegments: isMobile ? 14 : 28,
    });
    extrude.rotateX(-Math.PI / 2);
    extrude.computeVertexNormals();
    const topY = 0.7 + 0.45; // depth + bevel ≈ island top height

    const matTop = new THREE.MeshStandardMaterial({ color: 0x74b55a, roughness: 0.95, flatShading: true });
    const matSide = new THREE.MeshStandardMaterial({ color: 0xe7d6a0, roughness: 1, flatShading: true });
    const islandMesh = new THREE.Mesh(extrude, [matTop, matSide]);
    if (!isMobile) { islandMesh.castShadow = true; islandMesh.receiveShadow = true; }
    island.add(islandMesh);

    // a few low-poly green hills for terrain relief
    const hillMat = new THREE.MeshStandardMaterial({ color: 0x5fa34a, roughness: 0.95, flatShading: true });
    const hills: [number, number, number][] = [
      [0.3, 0.9, -0.2], [-1.0, 0.7, 0.8], [1.1, 0.75, 0.9],
    ];
    for (const [hx, hs, hz] of hills) {
      const hill = new THREE.Mesh(new THREE.IcosahedronGeometry(hs, isMobile ? 0 : 1), hillMat);
      hill.scale.y = 0.55;
      hill.position.set(hx, topY - 0.05, hz);
      if (!isMobile) hill.castShadow = true;
      island.add(hill);
    }

    // ── Pins ─────────────────────────────────────────────────────────────
    const GOLD = 0x0d5eaf;
    const headMeshes: THREE.Mesh[] = [];
    const pinGroups: THREE.Group[] = [];
    SPOTS.forEach((s, i) => {
      const g = new THREE.Group();
      const stem = new THREE.Mesh(
        new THREE.ConeGeometry(0.13, 0.42, 12),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.4 })
      );
      stem.position.y = 0.21;
      stem.rotation.x = Math.PI;
      const head = new THREE.Mesh(
        new THREE.SphereGeometry(0.19, 18, 18),
        new THREE.MeshStandardMaterial({ color: GOLD, roughness: 0.25, emissive: GOLD, emissiveIntensity: 0.18 })
      );
      head.position.y = 0.56;
      head.userData.index = i;
      headMeshes.push(head);
      g.add(stem, head);
      g.position.set(s.x, topY, s.z);
      if (!isMobile) head.castShadow = true;
      island.add(g);
      pinGroups.push(g);
    });

    // ── Interaction state ──────────────────────────────────────────────────
    const ray = new THREE.Raycaster();
    const ndc = new THREE.Vector2();
    let hovered: number | null = null;
    let selected: number | null = null;
    let dragging = false;
    let moved = 0;
    let lastX = 0;
    let velY = 0;            // inertial spin
    let manualUntil = 0;     // pause auto-rotate until this time
    let curZoom = 1;
    const tmp = new THREE.Vector3();

    const setTip = (i: number | null) => setActive(i);

    const pointerNDC = (e: PointerEvent) => {
      const r = renderer.domElement.getBoundingClientRect();
      ndc.x = ((e.clientX - r.left) / r.width) * 2 - 1;
      ndc.y = -((e.clientY - r.top) / r.height) * 2 + 1;
    };

    const pickPin = (): number | null => {
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(headMeshes, false)[0];
      return hit ? (hit.object.userData.index as number) : null;
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      moved = 0;
      lastX = e.clientX;
      manualUntil = performance.now() + 4000;
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    };
    const onMove = (e: PointerEvent) => {
      pointerNDC(e);
      if (dragging) {
        const dx = e.clientX - lastX;
        lastX = e.clientX;
        moved += Math.abs(dx);
        velY = dx * 0.005;
        island.rotation.y += velY;
        manualUntil = performance.now() + 4000;
      } else {
        const p = pickPin();
        if (p !== hovered) {
          hovered = p;
          renderer.domElement.style.cursor = p !== null ? "pointer" : "grab";
          if (selected === null) setTip(p);
        }
      }
    };
    const onUp = (e: PointerEvent) => {
      if (dragging && moved < 6) {
        pointerNDC(e);
        const p = pickPin();
        selected = p;            // select pin or deselect (null)
        setTip(p);
        manualUntil = performance.now() + (p !== null ? 6000 : 1500);
      }
      dragging = false;
    };

    const el = renderer.domElement;
    el.style.cursor = "grab";
    el.style.touchAction = "none";
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", () => {
      if (!dragging && selected === null) { hovered = null; setTip(null); }
    });

    // ── Animate ──────────────────────────────────────────────────────────
    const clock = new THREE.Clock();
    let raf = 0;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();
      const now = performance.now();

      // auto-rotate (paused while interacting / a pin is selected)
      if (!dragging && selected === null && now > manualUntil) {
        island.rotation.y += 0.0035;
      } else if (!dragging) {
        velY *= 0.94;
        island.rotation.y += velY;
      }

      // pin bounce + hover/selected scale
      pinGroups.forEach((g, i) => {
        g.position.y = topY + 0.04 + Math.sin(t * 2 + i) * 0.07;
        const want = i === selected || i === hovered ? 1.35 : 1;
        g.scale.lerp(tmp.set(want, want, want), 0.2);
      });

      // smooth zoom toward target when a pin is selected
      const wantZoom = selected !== null ? 0.72 : 1;
      curZoom += (wantZoom - curZoom) * 0.08;
      camera.position.copy(baseCam).multiplyScalar(curZoom);
      camera.lookAt(target);

      renderer.render(scene, camera);

      // position HTML tooltip over the active pin
      const act = selected ?? hovered;
      const tip = tipRef.current;
      if (tip) {
        if (act !== null) {
          pinGroups[act].getWorldPosition(tmp);
          tmp.y += 0.8;
          tmp.project(camera);
          const sx = (tmp.x * 0.5 + 0.5) * W;
          const sy = (-tmp.y * 0.5 + 0.5) * H;
          tip.style.transform = `translate(-50%,-100%) translate(${sx}px,${sy}px)`;
          tip.style.opacity = tmp.z < 1 ? "1" : "0";
        } else {
          tip.style.opacity = "0";
        }
      }

      // floating ΣΑΛΑΜΙΝΑ label above island
      const lab = labelRef.current;
      if (lab) {
        tmp.set(0, topY + 1.7, 0).project(camera);
        const lx = (tmp.x * 0.5 + 0.5) * W;
        const ly = (-tmp.y * 0.5 + 0.5) * H;
        lab.style.transform = `translate(-50%,-50%) translate(${lx}px,${ly}px)`;
      }
    };
    animate();

    // ── Resize ─────────────────────────────────────────────────────────────
    const onResize = () => {
      if (!mountRef.current) return;
      W = mountRef.current.clientWidth;
      H = mountRef.current.clientHeight;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H);
    };
    window.addEventListener("resize", onResize);

    // ── Cleanup ──────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      renderer.domElement.remove();
      renderer.dispose();
      renderer.forceContextLoss();
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        if (m.geometry) m.geometry.dispose();
        if (m.material) {
          const mats = Array.isArray(m.material) ? m.material : [m.material];
          mats.forEach((mat) => mat.dispose());
        }
      });
    };
  }, []);

  const spot = active !== null ? SPOTS[active] : null;

  return (
    <div className="relative w-full max-w-3xl mx-auto h-[440px] md:h-[540px] select-none">
      {/* Three.js canvas mounts here */}
      <div ref={mountRef} className="absolute inset-0" />

      {/* Floating island label */}
      <div
        ref={labelRef}
        className="absolute top-0 left-0 pointer-events-none font-display text-[#0B2645] tracking-[0.35em] text-lg md:text-xl font-bold"
      >
        ΣΑΛΑΜΙΝΑ
      </div>

      {/* Compass (corner) */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <svg width="44" height="44" viewBox="0 0 44 44" aria-hidden="true">
          <circle cx="22" cy="22" r="18" fill="none" stroke="#0B2645" strokeOpacity="0.35" strokeWidth="1.5" />
          <path d="M22 5 L26 22 L22 39 L18 22 Z" fill="#0B2645" fillOpacity="0.75" />
          <text x="22" y="6" textAnchor="middle" fontSize="9" fontWeight="700" fill="#0B2645">N</text>
        </svg>
      </div>

      {/* Coordinates caption */}
      <p className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[#0B2645]/55 text-[10px] sm:text-xs tracking-[0.35em] uppercase pointer-events-none">
        ΣΑΛΑΜΙΝΑ · ΣΑΡΩΝΙΚΟΣ ΚΟΛΠΟΣ
      </p>

      {/* Tooltip card (positioned via transform in the render loop) */}
      <div
        ref={tipRef}
        className="absolute top-0 left-0 transition-opacity duration-150"
        style={{ opacity: 0 }}
      >
        {spot && (
          <div className="whitespace-nowrap rounded-lg bg-white border border-[#0B2645]/15 shadow-lg px-3.5 py-2.5">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5 text-gold" />
              <span className="font-display font-semibold text-[#0B2645] text-sm leading-tight">
                {spot.gr}
              </span>
            </div>
            <span className="block text-[#0D5EAF] text-[10px] tracking-widest uppercase mt-0.5 ml-5">
              {spot.en}
            </span>
            <a
              href={mapsHref(spot.en)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 mt-2 ml-5 text-[#0B2645]/70 hover:text-gold text-[11px] font-medium transition-colors"
            >
              View on map
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
