"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
export default function Animation() {
  const sizes = {
    width: 800,
    height: 600,
  };
  
  useEffect(() => {
    // scene
    const scene = new THREE.Scene();

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    camera.position.set(0,0,4)
    scene.add(camera);

    // cube and cube group
    const cubeGroup = new THREE.Group()
    scene.add(cubeGroup)
    const cube = new THREE.Mesh(
      new THREE.BoxGeometry(0.5, 0.5, 0.5),
      new THREE.MeshBasicMaterial({
        color: "green",
      })
    );
    cubeGroup.add(cube)

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: document.getElementById("webgl")!,
    });
    renderer.setSize(sizes.width, sizes.height);

    const clock = new THREE.Clock()

    const update = () => {
      const t = clock.getElapsedTime()
      cube.position.x = 2*Math.cos(t);
      cube.position.y = Math.sin(t);
      renderer.render(scene, camera);
      window.requestAnimationFrame(update);
    }
    update();


  }, []);
  return (
    <div className="w-full h-screen">
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold">Transformation</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
