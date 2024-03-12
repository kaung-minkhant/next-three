"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
export default function Camera() {
  const sizes = {
    width: 800,
    height: 600,
  };
  
  useEffect(() => {
    // scene
    const scene = new THREE.Scene();

    const cursor = {
      x: 0,
      y: 0,
    }
    const handleMouseMove = (event: MouseEvent) => {
      const {clientX, clientY} = event
      cursor.x = clientX / sizes.width - 0.6
      cursor.y = clientY / sizes.height - 0.63
    }
    window.addEventListener('mousemove', handleMouseMove)

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
    camera.position.set(0,0,1)
    scene.add(camera);

    // obit control
    const controls = new OrbitControls(camera, document.getElementById('webgl')! as HTMLElement)
    controls.enableDamping = true
    // controls.target.y = -0.5;
    // controls.update()

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
      controls.update()
      // cube.position.x = 2*Math.cos(t);
      // cube.position.y = Math.sin(t);
      // camera.position.x = Math.cos(cursor.x * Math.PI * 2) * 1
      // camera.position.z = Math.sin(cursor.x * Math.PI * 2) * 1
      // camera.position.y = -cursor.y*5
      // camera.lookAt(cube.position)
      renderer.render(scene, camera);
      window.requestAnimationFrame(update);
    }
    update();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, []);
  return (
    <div className="w-full h-screen">
      <div className="text-center my-5">
        <h1 className="text-3xl font-bold">Camera</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
