'use client';

import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export function createRenderer(canvas: HTMLCanvasElement) {
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  return renderer;
}

export function createScene() {
  return new THREE.Scene();
}

export function createCamera(aspect: number) {
  const camera = new THREE.PerspectiveCamera(35, aspect, 0.1, 100);
  camera.position.set(0, 0.3, 6);
  return camera;
}

export function addBaseLights(scene: THREE.Scene, accentColor = 0x4ea8ff) {
  scene.add(new THREE.HemisphereLight(0xffffff, 0x1a2230, 0.9));
  const key = new THREE.DirectionalLight(0xffffff, 1.2);
  key.position.set(3, 4, 5);
  scene.add(key);
  const rimLight = new THREE.PointLight(accentColor, 2.4, 20);
  rimLight.position.set(-3, 1.2, -2);
  scene.add(rimLight);
  return { rimLight };
}

const glbCache: Record<string, THREE.Object3D> = {};
const loader = new GLTFLoader();
export function loadGLBCached(path: string): Promise<THREE.Object3D> {
  if (glbCache[path]) return Promise.resolve(glbCache[path].clone(true));
  return new Promise((resolve, reject) => {
    loader.load(
      path,
      (gltf) => {
        glbCache[path] = gltf.scene;
        resolve(gltf.scene.clone(true));
      },
      undefined,
      reject
    );
  });
}
