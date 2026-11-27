"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/lib/usePrefersReducedMotion";
import { PartnerTile, type Partner } from "./PartnerTile";

/* A partner's app icon as a real 3D object, drawn live in the page with three.js.

   The tile and the mark on it are built from the partner's own logo file: the
   outline is extruded into a solid, in the partner's own colours, and nothing
   about its shape is redrawn. It turns slowly on its own, leans toward the
   pointer, and gives a little when pressed.

   It draws only while it is on screen. With reduced motion it is a single still
   frame. If the browser cannot draw 3D at all, the flat tile stands in.

   three.js (about 190 KB compressed) is loaded only here, and only once the
   stage is within a screen of the window, so no other page pays for it and
   neither does a visitor who never scrolls this far. */

const LOOK: Record<Partner, { tile: number; file: string; rim: number; mark: number }> = {
  // Stripe's S, white, on Stripe's own purple.
  stripe: { tile: 0x635bff, file: "/logos/stripe-mark.svg", rim: 0x8d86ff, mark: 0.5 },
  // BTCPay's mark in its own greens, on white.
  btcpay: { tile: 0xf6f6f2, file: "/btcpay-logo.svg", rim: 0x9ee04a, mark: 0.62 },
};

export function PartnerIcon3D({ partner, label }: { partner: Partner; label: string }) {
  const host = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const [flat, setFlat] = useState(false);

  useEffect(() => {
    const el = host.current;
    if (!el) return;
    let gone = false;
    let teardown = () => {};

    const start = async () => {
      const THREE = await import("three");
      const { SVGLoader } = await import("three/examples/jsm/loaders/SVGLoader.js");
      const { RoomEnvironment } = await import("three/examples/jsm/environments/RoomEnvironment.js");
      const svg = await (await fetch(LOOK[partner].file)).text();
      if (gone) return;

      let renderer: InstanceType<typeof THREE.WebGLRenderer>;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
      } catch {
        setFlat(true);
        return;
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      // Neutral tone mapping keeps a colour the colour it was given, so Stripe's
      // purple and BTCPay's greens stay their own instead of washing toward white.
      renderer.toneMapping = THREE.NeutralToneMapping;
      renderer.toneMappingExposure = 1;
      const canvas = renderer.domElement;
      canvas.style.cssText = "display:block;width:100%;height:100%;touch-action:pan-y";
      el.appendChild(canvas);

      const look = LOOK[partner];
      const scene = new THREE.Scene();
      const pmrem = new THREE.PMREMGenerator(renderer);
      const room = new RoomEnvironment();
      scene.environment = pmrem.fromScene(room, 0.04).texture;
      scene.environmentIntensity = 0.34;

      const camera = new THREE.PerspectiveCamera(28, 1, 0.1, 50);
      camera.position.set(0, 0, 8.4);

      const key = new THREE.DirectionalLight(0xffffff, 1.25);
      key.position.set(-3.5, 4.5, 6);
      scene.add(key);
      const fill = new THREE.DirectionalLight(0xffffff, 0.3);
      fill.position.set(4, -1, 5);
      scene.add(fill);
      // A soft lamp close to the upper left of the face, so the light falls off
      // gently across it instead of lying flat.
      const lamp = new THREE.PointLight(0xffffff, 26, 14);
      lamp.position.set(-2.6, 2.8, 3.4);
      scene.add(lamp);
      // Lights in the partner's own colour, from behind, to catch the edges.
      const rim = new THREE.PointLight(look.rim, 160, 26);
      rim.position.set(3.4, -2.4, -2.2);
      scene.add(rim);
      const rimTop = new THREE.PointLight(look.rim, 70, 26);
      rimTop.position.set(-3.6, 3, -2.6);
      scene.add(rimTop);

      /* The tile: a squircle, the continuous curve an app icon has, not a square
         with round corners. Its edge is deep and round, so it reads as a soft,
         solid thing with some weight to it. */
      const size = 2.3;
      const half = size / 2;
      const depth = 0.34;
      const bevel = 0.17;
      const power = 2 / 4.6;
      const outline = new THREE.Shape(
        Array.from({ length: 160 }, (_, i) => {
          const angle = (i / 160) * Math.PI * 2;
          const cos = Math.cos(angle);
          const sin = Math.sin(angle);
          return new THREE.Vector2(
            Math.sign(cos) * Math.pow(Math.abs(cos), power) * half,
            Math.sign(sin) * Math.pow(Math.abs(sin), power) * half,
          );
        }),
      );
      const tileGeometry = new THREE.ExtrudeGeometry(outline, {
        depth,
        bevelEnabled: true,
        bevelThickness: bevel,
        bevelSize: bevel,
        bevelSegments: 20,
        curveSegments: 48,
      });
      tileGeometry.center();
      const tileMaterial = new THREE.MeshPhysicalMaterial({
        color: look.tile,
        roughness: 0.22,
        metalness: 0,
        clearcoat: 1,
        clearcoatRoughness: 0.06,
      });
      const icon = new THREE.Group();
      icon.add(new THREE.Mesh(tileGeometry, tileMaterial));

      /* The mark: the logo file's own outlines, raised off the tile's face. */
      const parsed = new SVGLoader().parse(svg);
      // BTCPay's file is the mark followed by the wordmark; the mark is the first six shapes.
      const paths = partner === "btcpay" ? parsed.paths.slice(0, 6) : parsed.paths;
      const inner = new THREE.Group();
      const disposables: { dispose: () => void }[] = [tileGeometry, tileMaterial];
      paths.forEach((path, index) => {
        const geometry = new THREE.ExtrudeGeometry(SVGLoader.createShapes(path), {
          // Later shapes sit a touch prouder, in the order the logo stacks them.
          depth: 1 + index * 0.22,
          bevelEnabled: true,
          bevelThickness: 0.22,
          bevelSize: 0.16,
          bevelSegments: 5,
          curveSegments: 28,
        });
        const material = new THREE.MeshPhysicalMaterial({
          color: partner === "stripe" ? 0xffffff : path.color,
          roughness: 0.26,
          metalness: 0,
          clearcoat: 1,
          clearcoatRoughness: 0.1,
        });
        disposables.push(geometry, material);
        inner.add(new THREE.Mesh(geometry, material));
      });
      const bounds = new THREE.Box3().setFromObject(inner);
      const extent = bounds.getSize(new THREE.Vector3());
      const middle = bounds.getCenter(new THREE.Vector3());
      inner.position.set(-middle.x, -middle.y, 0);
      const mark = new THREE.Group();
      mark.add(inner);
      const scale = (size * look.mark) / extent.y;
      // The file's y runs downward, so the mark is turned the right way up.
      mark.scale.set(scale, -scale, scale);
      mark.position.z = depth / 2 + bevel - 0.02;
      icon.add(mark);
      scene.add(icon);

      /* Motion: a slow turn of its own, a lean toward the pointer, a give when pressed. */
      const want = { x: 0, y: 0, press: 0 };
      const now = { x: 0, y: 0, press: 0, pressSpeed: 0, arrive: reduced ? 1 : 0 };
      let seen = false;
      let frame = 0;
      let last = performance.now();
      const start = last;

      const draw = (time: number) => {
        const dt = Math.min(0.05, (time - last) / 1000);
        last = time;
        const t = (time - start) / 1000;
        const ease = 1 - Math.exp(-dt * 7);
        now.x += (want.x - now.x) * ease;
        now.y += (want.y - now.y) * ease;
        // The press is a spring a little short of fully damped: it gives quickly
        // and comes back with the slightest overshoot, like a real key.
        now.pressSpeed += ((want.press - now.press) * 320 - now.pressSpeed * 24) * dt;
        now.press += now.pressSpeed * dt;
        if (seen && now.arrive < 1) now.arrive = Math.min(1, now.arrive + dt / 1.2);
        // Exponential ease-out, the site's own arrival curve.
        const arrive = 1 - Math.pow(2, -10 * now.arrive);
        const idle = reduced ? 0 : 1;
        icon.rotation.y = -0.34 + Math.sin(t * 0.42) * 0.13 * idle + now.x * 0.5 - (1 - arrive) * 1.4;
        icon.rotation.x = 0.13 + Math.sin(t * 0.33 + 1.3) * 0.05 * idle + now.y * 0.36;
        icon.position.y = 0.08 + Math.sin(t * 0.62) * 0.045 * idle - (1 - arrive) * 0.7;
        icon.scale.setScalar((0.82 + 0.18 * arrive) * (1 - 0.06 * now.press));
        canvas.style.opacity = String(Math.min(1, arrive * 1.6));
        renderer.render(scene, camera);
      };
      const loop = (time: number) => {
        draw(time);
        frame = requestAnimationFrame(loop);
      };
      const play = () => {
        if (frame || reduced) return;
        last = performance.now();
        frame = requestAnimationFrame(loop);
      };
      const pause = () => {
        cancelAnimationFrame(frame);
        frame = 0;
      };

      const fit = () => {
        const { clientWidth: w, clientHeight: h } = el;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // On a narrow stage, step back so the whole tile stays in frame.
        camera.position.z = w / h < 1 ? 8.4 / (w / h) : 8.4;
        camera.updateProjectionMatrix();
        if (!frame) draw(performance.now());
      };
      const resize = new ResizeObserver(fit);
      resize.observe(el);
      fit();

      const watch = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            seen = true;
            play();
          } else pause();
        },
        { threshold: 0.25 },
      );
      watch.observe(el);

      const onMove = (e: PointerEvent) => {
        const box = el.getBoundingClientRect();
        want.x = ((e.clientX - box.left) / box.width) * 2 - 1;
        want.y = ((e.clientY - box.top) / box.height) * 2 - 1;
      };
      const onLeave = () => {
        want.x = 0;
        want.y = 0;
        want.press = 0;
      };
      const onDown = () => (want.press = 1);
      const onUp = () => (want.press = 0);
      if (!reduced) {
        el.addEventListener("pointermove", onMove);
        el.addEventListener("pointerleave", onLeave);
        el.addEventListener("pointerdown", onDown);
        el.addEventListener("pointerup", onUp);
        el.addEventListener("pointercancel", onLeave);
      }

      teardown = () => {
        pause();
        resize.disconnect();
        watch.disconnect();
        el.removeEventListener("pointermove", onMove);
        el.removeEventListener("pointerleave", onLeave);
        el.removeEventListener("pointerdown", onDown);
        el.removeEventListener("pointerup", onUp);
        el.removeEventListener("pointercancel", onLeave);
        for (const item of disposables) item.dispose();
        room.dispose();
        pmrem.dispose();
        scene.environment?.dispose();
        renderer.dispose();
        canvas.remove();
      };
      if (gone) teardown();
    };

    // The 3D library is fetched only when the stage is within about a screen of
    // the window, so a visitor who never scrolls this far never downloads it.
    const near = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        near.disconnect();
        start();
      },
      { rootMargin: "100% 0px" },
    );
    near.observe(el);

    return () => {
      gone = true;
      near.disconnect();
      teardown();
    };
  }, [partner, reduced]);

  return (
    <div ref={host} role="img" aria-label={label} className="absolute inset-0">
      {flat && (
        <div className="flex h-full w-full items-center justify-center">
          <PartnerTile partner={partner} className="aspect-square h-[46%]" />
        </div>
      )}
    </div>
  );
}
