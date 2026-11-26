import * as THREE from 'three';

export function mountCore(target: HTMLElement, onReady: (ready: boolean) => void) {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 40);
  camera.position.z = 7.3;
  const core = new THREE.Group();
  scene.add(core);

  const sphere = new THREE.IcosahedronGeometry(1.08, 3);
  const wire = new THREE.WireframeGeometry(sphere);
  const wireMaterial = new THREE.LineBasicMaterial({ color: 0x44d5f5, transparent: true, opacity: 0.47 });
  core.add(new THREE.LineSegments(wire, wireMaterial));
  const pointMaterial = new THREE.PointsMaterial({ color: 0xbaf7ff, size: 0.035, transparent: true, opacity: 0.9 });
  core.add(new THREE.Points(sphere, pointMaterial));
  const inner = new THREE.IcosahedronGeometry(0.81, 1);
  const innerMaterial = new THREE.MeshBasicMaterial({ color: 0x41c9ed, wireframe: true, transparent: true, opacity: 0.22 });
  core.add(new THREE.Mesh(inner, innerMaterial));

  const ring = new THREE.TorusGeometry(1.53, 0.006, 5, 128);
  const ringMaterial = new THREE.MeshBasicMaterial({ color: 0x92edff, transparent: true, opacity: 0.65 });
  for (const [x, y] of [[0.75, 0.3], [1.25, -0.55], [0.45, 0.96]]) {
    const orbit = new THREE.Mesh(ring, ringMaterial);
    orbit.rotation.set(x, y, 0);
    core.add(orbit);
  }

  target.append(renderer.domElement);
  const cursor = new THREE.Vector2();
  const instrument = target.parentElement ?? target;
  function move(event: PointerEvent) {
    const bounds = instrument.getBoundingClientRect();
    cursor.set((event.clientX - bounds.left) / bounds.width - 0.5, (event.clientY - bounds.top) / bounds.height - 0.5);
  }
  function reset() { cursor.set(0, 0); }
  instrument.addEventListener('pointermove', move);
  instrument.addEventListener('pointerleave', reset);

  const resize = new ResizeObserver(() => {
    if (!target.clientWidth || !target.clientHeight) return;
    camera.aspect = target.clientWidth / target.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(target.clientWidth, target.clientHeight);
  });
  resize.observe(target);

  let frame = 0;
  let startedAt = 0;
  let visible = false;
  let lost = false;
  function render(time: number) {
    frame = 0;
    if (!visible || document.hidden || lost) return;
    if (!startedAt) startedAt = time;
    core.rotation.y = (time - startedAt) / 8600 + cursor.x * 0.42;
    core.rotation.x += (cursor.y * 0.52 - core.rotation.x) * 0.04;
    renderer.render(scene, camera);
    frame = requestAnimationFrame(render);
  }
  function sync() {
    if (visible && !document.hidden && !lost && !frame) frame = requestAnimationFrame(render);
  }
  function contextLost() {
    lost = true;
    onReady(false);
  }
  renderer.domElement.addEventListener('webglcontextlost', contextLost);
  const observer = new IntersectionObserver(entries => {
    visible = entries[0].isIntersecting;
    sync();
  });
  observer.observe(target);
  document.addEventListener('visibilitychange', sync);
  onReady(true);

  return () => {
    cancelAnimationFrame(frame);
    observer.disconnect();
    resize.disconnect();
    document.removeEventListener('visibilitychange', sync);
    instrument.removeEventListener('pointermove', move);
    instrument.removeEventListener('pointerleave', reset);
    renderer.domElement.removeEventListener('webglcontextlost', contextLost);
    for (const resource of [sphere, wire, wireMaterial, pointMaterial, inner, innerMaterial, ring, ringMaterial]) resource.dispose();
    renderer.dispose();
    renderer.forceContextLoss();
    renderer.domElement.remove();
  };
}
