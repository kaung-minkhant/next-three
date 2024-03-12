"use client";
import { useEffect } from "react";
import * as THREE from "three";
export default function Scene() {
  useEffect(() => {
    // scene
    const scene = new THREE.Scene();

    // red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    // sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.z = 3;
    scene.add(camera);

    // canvas
    const canvas = document.querySelector("canvas.webgl")

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas!,
    })
    renderer.setSize(sizes.width, sizes.height)

    renderer.render(scene, camera)

  }, []);
  return (
    <>
      <div>
        <canvas className="webgl"></canvas>
      </div>
    </>
  );
}
