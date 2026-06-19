"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ParticleOcean() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Capture the DOM node immediately — mountRef.current becomes null
    // after unmount, so closures (including cleanup) must use this snapshot.
    const mount = mountRef.current;
    if (!mount) return;

    const W = window.innerWidth;
    const H = window.innerHeight;

    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a1628);
    scene.fog = new THREE.FogExp2(0x0a1628, 0.032);

    const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 200);
    camera.position.set(0, 7, 20);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(W, H);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    mount.appendChild(renderer.domElement);

    const PARTICLE_COUNT = 7000;
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 60;
      positions[i3 + 1] = 0;
      positions[i3 + 2] = (Math.random() - 0.5) * 60;

      const t = Math.random();
      if (t < 0.55) {
        // Deep ocean blue
        colors[i3] = 0.08 + Math.random() * 0.08;
        colors[i3 + 1] = 0.25 + Math.random() * 0.12;
        colors[i3 + 2] = 0.5 + Math.random() * 0.2;
      } else if (t < 0.8) {
        // White foam
        colors[i3] = 0.75 + Math.random() * 0.25;
        colors[i3 + 1] = 0.85 + Math.random() * 0.15;
        colors[i3 + 2] = 1.0;
      } else {
        // Greek blue glimmer — #1E88E5
        colors[i3] = 0.118;
        colors[i3 + 1] = 0.533;
        colors[i3 + 2] = 0.898;
      }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

    const material = new THREE.PointsMaterial({
      size: 0.09,
      vertexColors: true,
      transparent: true,
      opacity: 0.85,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(geometry, material);
    scene.add(particles);

    let animId: number;
    const clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      const pos = geometry.attributes.position.array as Float32Array;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const i3 = i * 3;
        const x = pos[i3];
        const z = pos[i3 + 2];
        pos[i3 + 1] =
          Math.sin(x * 0.35 + t * 0.55) * 0.45 +
          Math.cos(z * 0.28 + t * 0.38) * 0.35 +
          Math.sin((x + z) * 0.18 + t * 0.9) * 0.2;
      }
      geometry.attributes.position.needsUpdate = true;

      camera.position.x = Math.sin(t * 0.04) * 2;
      camera.position.y = 7 + Math.sin(t * 0.06) * 0.5;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      // 1. Stop the animation loop first so no further renders fire.
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);

      // 2. Detach the canvas BEFORE disposing WebGL resources.
      //    Element.remove() is a no-op when the node is already detached,
      //    so it can never throw NotFoundError — unlike mount.removeChild().
      renderer.domElement.remove();

      // 3. Release GPU memory and force the WebGL context to be freed
      //    immediately (prevents "too many active WebGL contexts" after
      //    repeated page navigations).
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 w-full h-full" />;
}
