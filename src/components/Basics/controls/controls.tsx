"use client";
import { useEffect, useState } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import guify from 'guify'
export default function Controls() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {

    // debug gui

    // const gui = new guify()

    const canvas = document.getElementById("webgl");
    // scene
    const scene = new THREE.Scene();

    // debug control ui
    const gui = new dat.GUI({
      width: 400
    });
    gui.hide()

    const debugObject = {
      color: 0xff0000,
      spin: () => {
        gsap.to(mesh.rotation, {
          y: mesh.rotation.y + 2 * Math.PI,
          duration: 3,
        })
      }
    };

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);
    scene.add(camera);

    // obit control
    const controls = new OrbitControls(camera, canvas! as HTMLElement);
    controls.enableDamping = true;
    controls.enabled = true;

    const mesh = new THREE.Mesh();
    const material = new THREE.MeshBasicMaterial({
      color: 0xff0000,
      // wireframe: true,
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    mesh.geometry = geometry;
    mesh.material = material;
    // gui.Register([
    //   {
    //     type: 'range', label: 'Position X',
    //     min: -1.5, max: 1.5, step: 0.01,
    //     object: mesh.position, property: 'y'
    //   }
    // ])
    gui.add(mesh.position, "y").min(-1.5).max(1.5).step(0.01).name("Elevation");
    gui.add(mesh.position, "x", -1.5, 1.5, 0.01);
    gui.add(mesh, "visible").name("isVisible?");
    gui.add(material, "wireframe").name("EnableWireframe");
    gui
      .addColor(debugObject, "color")
      .name("Cube Color")
      .onChange(() => {
        material.color.set(debugObject.color)
      });
    gui.add(debugObject, 'spin')

    scene.add(mesh);

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

    window.addEventListener("dblclick", () => {
      // if (!document.fullscreenElement) {
      //   canvas?.requestFullscreen();
      // } else {
      //   document.exitFullscreen();
      // }
    });

    const clock = new THREE.Clock();

    const update = () => {
      const t = clock.getElapsedTime();
      controls.update();
      renderer.render(scene, camera);
      window.requestAnimationFrame(update);
    };
    update();

    return () => {};
  }, []);
  return (
    <div className="w-full h-screen relative">
      <div className="text-center left-0 top-0 absolute text-slate-200">
        <h1 className="text-3xl font-bold">Debug Controls</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
