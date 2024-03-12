"use client";
import { useEffect } from "react";
import * as THREE from "three";
export default function Transformation() {
  useEffect(() => {
    // scene
    const scene = new THREE.Scene();

    // red cube
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    const mesh = new THREE.Mesh(geometry, material);
    // position
    // mesh.position.x = 1;
    // mesh.position.y = -1;
    // mesh.position.z = -1;
    mesh.position.set(0,0,0);
    // scale
    mesh.scale.x = 0.5
    mesh.scale.set(3, 0.5, 1)
    scene.add(mesh);
    // rotation
    mesh.rotation.reorder('ZXY')
    mesh.rotation.y = Math.PI / 4;
    mesh.rotation.z = Math.PI / 4;

    // console.log(mesh.position.normalize())
    // console.log(mesh.position.length())

    // axes helper
    const axesHelper = new THREE.AxesHelper(3);
    scene.add(axesHelper);

    // sizes
    const sizes = {
      width: 800,
      height: 600,
    };

    // camera
    const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);
    // camera.position.x = 1;
    // camera.position.y = 1;
    // camera.position.z = 3;
    camera.position.set(1, 1, 3);
    scene.add(camera);
    // console.log(mesh.position.distanceTo(camera.position))

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