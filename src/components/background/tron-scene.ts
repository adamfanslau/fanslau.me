import * as THREE from "three";

const BG = 0x05060a;
const CYAN = 0x00e5ff;
const MAGENTA = 0xff2ad4;

const GRID_VERTEX = /* glsl */ `
  varying vec3 vWorld;
  void main() {
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorld = wp.xyz;
    gl_Position = projectionMatrix * viewMatrix * wp;
  }
`;

const GRID_FRAGMENT = /* glsl */ `
  varying vec3 vWorld;
  uniform float uTime;

  void main() {
    // Grid coordinates: 4-unit cells, scrolling toward the camera (+z).
    vec2 p = vWorld.xz / 4.0;
    p.y -= uTime * 0.45;

    vec2 cell = abs(fract(p - 0.5) - 0.5);
    // Anti-aliased 1px core line.
    vec2 aa = cell / fwidth(p);
    float core = 1.0 - min(min(aa.x, aa.y), 1.0);
    // Wide soft halo around the line — fake glow, no postprocessing.
    float halo = 1.0 - smoothstep(0.0, 0.16, min(cell.x, cell.y));

    // Cyan near the camera, magenta toward the horizon.
    vec3 cyan = vec3(0.0, 0.898, 1.0);
    vec3 magenta = vec3(1.0, 0.165, 0.831);
    vec3 lineColor = mix(cyan, magenta, smoothstep(20.0, 130.0, -vWorld.z));

    vec3 bg = vec3(0.0196, 0.0235, 0.0392);
    vec3 col = bg * 0.6 + lineColor * (core + halo * 0.3);

    // Distance fog into the background color.
    float fog = smoothstep(50.0, 170.0, length(vWorld.xz));
    col = mix(col, bg, fog);

    gl_FragColor = vec4(col, 1.0);
  }
`;

interface Solid {
  mesh: THREE.LineSegments;
  baseY: number;
  phase: number;
  rotX: number;
  rotY: number;
  drift: number;
}

export function initTronScene(container: HTMLElement): () => void {
  const size = () => ({
    w: container.clientWidth || window.innerWidth,
    h: container.clientHeight || window.innerHeight,
  });

  const renderer = new THREE.WebGLRenderer({
    antialias: false,
    alpha: false,
    powerPreference: "low-power",
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  renderer.setSize(size().w, size().h);
  container.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(BG);

  const camera = new THREE.PerspectiveCamera(
    60,
    size().w / size().h,
    0.1,
    400,
  );
  camera.position.set(0, 2.2, 6);
  camera.lookAt(0, 1, -40);

  // --- Grid plane -----------------------------------------------------------
  const gridUniforms = { uTime: { value: 0 } };
  const gridMaterial = new THREE.ShaderMaterial({
    uniforms: gridUniforms,
    vertexShader: GRID_VERTEX,
    fragmentShader: GRID_FRAGMENT,
  });
  const grid = new THREE.Mesh(new THREE.PlaneGeometry(400, 400), gridMaterial);
  grid.rotation.x = -Math.PI / 2;
  grid.position.z = -140;
  scene.add(grid);

  // --- Horizon glow sprite --------------------------------------------------
  const glowCanvas = document.createElement("canvas");
  glowCanvas.width = 256;
  glowCanvas.height = 256;
  const ctx = glowCanvas.getContext("2d")!;
  const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  gradient.addColorStop(0, "rgba(0, 229, 255, 0.85)");
  gradient.addColorStop(0.4, "rgba(0, 229, 255, 0.22)");
  gradient.addColorStop(1, "rgba(0, 229, 255, 0)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);
  const glowTexture = new THREE.CanvasTexture(glowCanvas);
  const glowSprite = new THREE.Sprite(
    new THREE.SpriteMaterial({
      map: glowTexture,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    }),
  );
  glowSprite.scale.set(160, 24, 1);
  glowSprite.position.set(0, 1.2, -130);
  scene.add(glowSprite);

  // --- Floating wireframe solids --------------------------------------------
  const solidDefs: {
    geo: THREE.BufferGeometry;
    color: number;
    opacity: number;
    pos: [number, number, number];
  }[] = [
    { geo: new THREE.BoxGeometry(1.4, 1.4, 1.4), color: CYAN, opacity: 0.55, pos: [-5, 2.4, -14] },
    { geo: new THREE.OctahedronGeometry(1.1), color: MAGENTA, opacity: 0.5, pos: [4.5, 3.2, -18] },
    { geo: new THREE.BoxGeometry(1, 1, 1), color: MAGENTA, opacity: 0.45, pos: [7.5, 1.9, -30] },
    { geo: new THREE.OctahedronGeometry(0.8), color: CYAN, opacity: 0.5, pos: [-8, 2.8, -26] },
    { geo: new THREE.TetrahedronGeometry(1.2), color: CYAN, opacity: 0.4, pos: [1.5, 3.8, -38] },
  ];
  const solids: Solid[] = solidDefs.map((def, i) => {
    const mesh = new THREE.LineSegments(
      new THREE.EdgesGeometry(def.geo),
      new THREE.LineBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: def.opacity,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }),
    );
    mesh.position.set(...def.pos);
    def.geo.dispose();
    scene.add(mesh);
    return {
      mesh,
      baseY: def.pos[1],
      phase: i * 1.7,
      rotX: 0.1 + i * 0.05,
      rotY: 0.15 - i * 0.02,
      drift: 0.35 + i * 0.12,
    };
  });

  // --- Pointer parallax -------------------------------------------------------
  let targetX = 0;
  let targetY = 0;
  const onPointerMove = (e: PointerEvent) => {
    const { w, h } = size();
    targetX = ((e.clientX / w) * 2 - 1) * 0.6;
    targetY = -((e.clientY / h) * 2 - 1) * 0.25;
  };
  window.addEventListener("pointermove", onPointerMove, { passive: true });

  // --- Animation loop ---------------------------------------------------------
  const clock = new THREE.Clock();
  let elapsed = 0;
  let raf = 0;
  let running = false;

  const frame = () => {
    raf = requestAnimationFrame(frame);
    // Clamp delta so a resumed tab doesn't jump.
    const dt = Math.min(clock.getDelta(), 0.1);
    elapsed += dt;

    gridUniforms.uTime.value = elapsed;

    for (const solid of solids) {
      solid.mesh.rotation.x += solid.rotX * dt;
      solid.mesh.rotation.y += solid.rotY * dt;
      solid.mesh.position.y =
        solid.baseY + Math.sin(elapsed * 0.6 + solid.phase) * 0.3;
      solid.mesh.position.z += solid.drift * dt;
      if (solid.mesh.position.z > 8) solid.mesh.position.z = -60;
    }

    const driftX = Math.sin(elapsed * 0.1) * 0.15;
    const driftY = Math.cos(elapsed * 0.13) * 0.08;
    camera.position.x += (targetX + driftX - camera.position.x) * 0.05;
    camera.position.y += (2.2 + targetY + driftY - camera.position.y) * 0.05;
    camera.lookAt(0, 1, -40);

    renderer.render(scene, camera);
  };

  const startLoop = () => {
    if (running) return;
    running = true;
    clock.getDelta();
    raf = requestAnimationFrame(frame);
  };
  const stopLoop = () => {
    running = false;
    cancelAnimationFrame(raf);
  };

  const onVisibility = () => {
    if (document.hidden) stopLoop();
    else startLoop();
  };
  document.addEventListener("visibilitychange", onVisibility);

  const onContextLost = (e: Event) => {
    e.preventDefault();
    stopLoop();
  };
  const onContextRestored = () => startLoop();
  renderer.domElement.addEventListener("webglcontextlost", onContextLost);
  renderer.domElement.addEventListener(
    "webglcontextrestored",
    onContextRestored,
  );

  let resizeTimer: ReturnType<typeof setTimeout>;
  const onResize = () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      const { w, h } = size();
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    }, 100);
  };
  window.addEventListener("resize", onResize);

  startLoop();

  return () => {
    stopLoop();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("resize", onResize);
    clearTimeout(resizeTimer);
    renderer.domElement.removeEventListener("webglcontextlost", onContextLost);
    renderer.domElement.removeEventListener(
      "webglcontextrestored",
      onContextRestored,
    );
    grid.geometry.dispose();
    gridMaterial.dispose();
    glowTexture.dispose();
    glowSprite.material.dispose();
    for (const solid of solids) {
      solid.mesh.geometry.dispose();
      (solid.mesh.material as THREE.Material).dispose();
    }
    renderer.dispose();
    renderer.domElement.remove();
  };
}
