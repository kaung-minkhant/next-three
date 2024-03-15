"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
export default function Geometry() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    const canvas = document.getElementById('webgl')
    // scene
    const scene = new THREE.Scene();

    const cursor = {
      x: 0,
      y: 0,
    };
    const handleMouseMove = (event: MouseEvent) => {
      const { clientX, clientY } = event;
      cursor.x = clientX / sizes.width - 0.6;
      cursor.y = clientY / sizes.height - 0.63;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, 1);
    scene.add(camera);

    // obit control
    const controls = new OrbitControls(
      camera,
      canvas! as HTMLElement
    );
    controls.enableDamping = true;
    controls.enabled = true;


    const mesh = new THREE.Mesh();
    const geometry = new THREE.BufferGeometry()
    
    const positionsArray = new Float32Array([
      0, 0, 0,
      0, 1, 0,
      1, 0, 0,
    ])

    const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
    geometry.setAttribute('position', positionsAttribute)

    const material = new THREE.MeshBasicMaterial({
      color: '#f00',
      wireframe: true
    })

    mesh.geometry = geometry;
    mesh.material = material;

    scene.add(mesh)


    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas!,
      antialias: true,
    });
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;

      // update camera
      camera.aspect = sizes.width / sizes.height;
      camera.updateProjectionMatrix();

      // update renderer
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(sizes.width, sizes.height);
    });

    window.addEventListener('dblclick', () => {
      if (!document.fullscreenElement) {
        canvas?.requestFullscreen()
      } else {
        document.exitFullscreen()
      }
    })

    const clock = new THREE.Clock();

    const update = () => {
      const t = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(update);
    };
    update();

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);
  return (
    <div className="w-full h-screen relative">
      <div className="text-center left-0 top-0 absolute text-slate-200">
        <h1 className="text-3xl font-bold">Full Screen</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}