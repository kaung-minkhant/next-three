"use client";

import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
import doorColorTextureImage from "@/assets/static/textures/door/color.jpg";
import doorAlphaTextureImage from "@/assets/static/textures/door/alpha.jpg";
import doorHeightTextureImage from "@/assets/static/textures/door/height.jpg";
import doorNormalTextureImage from "@/assets/static/textures/door/normal.jpg";
import doorAmbiantOcclusionTextureImage from "@/assets/static/textures/door/ambientOcclusion.jpg";
import doorMetalnessTextureImage from "@/assets/static/textures/door/metalness.jpg";
import doorRoughnessTextureImage from "@/assets/static/textures/door/roughness.jpg";
import gradient from "@/assets/static/textures/gradients/5.jpg";
import matcap from "@/assets/static/textures/matcaps/3.png";
import environmentnx from "@/assets/static/textures/environmentMaps/1/nx.jpg";
import environmentny from "@/assets/static/textures/environmentMaps/1/ny.jpg";
import environmentnz from "@/assets/static/textures/environmentMaps/1/nz.jpg";
import environmentpx from "@/assets/static/textures/environmentMaps/1/px.jpg";
import environmentpy from "@/assets/static/textures/environmentMaps/1/py.jpg";
import environmentpz from "@/assets/static/textures/environmentMaps/1/pz.jpg";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader.js";
import { TextGeometry } from "three/examples/jsm/Addons.js";
export default function Text() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    // loading manager
    const loadingManager = new THREE.LoadingManager();

    // texture loading
    const textureLoader = new THREE.TextureLoader(loadingManager);

    // texture environment
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager);

    const doorColorTexture = textureLoader.load(doorColorTextureImage.src);
    const doorAlphaTexture = textureLoader.load(doorAlphaTextureImage.src);
    const doorHeightTexture = textureLoader.load(doorHeightTextureImage.src);
    const doorNormalTexture = textureLoader.load(doorNormalTextureImage.src);
    const doorAmbiantOcclusionTexture = textureLoader.load(
      doorAmbiantOcclusionTextureImage.src
    );
    const doorMetalnessTexture = textureLoader.load(
      doorMetalnessTextureImage.src
    );
    const doorRoughnessTexture = textureLoader.load(
      doorRoughnessTextureImage.src
    );
    const gradientTexture = textureLoader.load(gradient.src);
    const matcapTexture = textureLoader.load(matcap.src);

    // canvas
    const canvas = document.getElementById("webgl");

    // debug gui
    const gui = new dat.GUI({
      width: 400,
    });

    // camera
    const camera = new THREE.PerspectiveCamera(
      75,
      sizes.width / sizes.height,
      0.1,
      100
    );
    camera.position.set(0, 0, 3);

    // orbit controls
    const orbitControls = new OrbitControls(camera, canvas! as HTMLElement);
    orbitControls.enableDamping = true;
    orbitControls.enabled = true;
    orbitControls.enablePan = true;
    gui.add(orbitControls, "enabled").name("Enable Orbit Controls");

    // scene
    const scene = new THREE.Scene();

    //
    // Start
    //

    // axis helper
    // const axisHelper = new THREE.AxesHelper();
    // scene.add(axisHelper);

    // font loader
    const fontLoader = new FontLoader();

    let mesh: THREE.Mesh;
    fontLoader.load("/fonts/helvetiker_regular.typeface.json", (font) => {
      const textGeometry = new TextGeometry("James Threejs", {
        font,
        size: 0.5,
        height: 0.2,
        curveSegments: 4,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5,
      });

      // center the geometry
      // hard way
      // textGeometry.computeBoundingBox();
      // textGeometry.translate(
      //   -(textGeometry.boundingBox!.max.x - 0.02) * 0.5, // substract beavel size
      //   -(textGeometry.boundingBox!.max.y - 0.02) * 0.5,
      //   -(textGeometry.boundingBox!.max.z - 0.03) * 0.5 // substract beavel thickness
      // );

      // easy way
      textGeometry.center()
      textGeometry.computeBoundingBox();
      // console.log(textGeometry.boundingBox);

      const material = new THREE.MeshMatcapMaterial({
        matcap: matcapTexture
        // wireframe: true,
      });
      mesh = new THREE.Mesh(textGeometry, material);
      scene.add(mesh);

      console.time('donuts')
      const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 32, 64);
      for (let i = 0; i < 500; i++) {
        const donut = new THREE.Mesh(donutGeometry, material);
        donut.position.set(
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
          (Math.random() - 0.5) * 10,
        )
        donut.rotation.y = Math.PI * Math.random()
        donut.rotation.x = Math.PI * Math.random()

        const scale = Math.random()
        donut.scale.set(scale, scale, scale)
        scene.add(donut);
      }
      console.timeEnd('donuts')
    });

    //
    // end
    //

    // renderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas!,
      antialias: true,
    });
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio));
    renderer.setSize(sizes.width, sizes.height);

    // on resize
    window.addEventListener("resize", () => {
      sizes.width = window.innerWidth;
      sizes.height = window.innerHeight;
      const aspect = sizes.width / sizes.height;
      camera.aspect = aspect;
      camera.updateProjectionMatrix();
      renderer.setSize(sizes.width, sizes.height);
    });

    // clock
    const clock = new THREE.Clock();

    // update
    const tick = () => {
      const t = clock.getElapsedTime();
      const rotationYSpeed = 0.2;
      const rotationXSpeed = 0.2;
      const rotationZSpeed = 0.9;
      // update objects

      if (mesh) {
        // mesh.rotation.z = 2 * Math.PI * t;
      }
      orbitControls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return (
    <div className="w-full h-screen relative">
      <div className="text-center left-0 top-0 absolute text-slate-200">
        <h1 className="text-3xl font-bold">Text</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
