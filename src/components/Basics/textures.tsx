"use client";
import { useEffect } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import * as dat from "dat.gui";
import gsap from "gsap";
import doorColorTextureImage from "@/assets/static/textures/minecraft.png";
import doorAlphaTextureImage from "@/assets/static/textures/door/alpha.jpg";
import doorHeightTextureImage from "@/assets/static/textures/door/height.jpg";
import doorNormalTextureImage from "@/assets/static/textures/door/normal.jpg";
import doorAmbiantOcclusionTextureImage from "@/assets/static/textures/door/ambientOcclusion.jpg";
import doorMetalnessTextureImage from "@/assets/static/textures/door/metalness.jpg";
import doorRoughnessTextureImage from "@/assets/static/textures/door/roughness.jpg";

export default function Textures() {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  useEffect(() => {
    // debug gui
    const gui = new dat.GUI({
      width: 400,
    });
    // const gui = new guify()

    const canvas = document.getElementById("webgl");
    // scene
    const scene = new THREE.Scene();

    // debug control ui
    gui.hide();

    const debugObject = {
      color: 0xff0000,
      spin: () => {
        gsap.to(mesh.rotation, {
          y: mesh.rotation.y + 2 * Math.PI,
          duration: 3,
        });
      },
    };

    // texture
    // const image = new Image();
    // const doorColorTexture = new THREE.Texture(image);
    // image.onload = () => {
    //   doorColorTexture.needsUpdate = true
    // };
    // image.src = doorColorTextureImage.src;

    const loadingManager = new THREE.LoadingManager();
    loadingManager.onStart = () => {
      console.log("onStart");
    };
    loadingManager.onLoad = () => {
      console.log("onLoad");
    };
    loadingManager.onProgress = () => {
      console.log("onProgress");
    };
    loadingManager.onError = () => {
      console.log("onError");
    };
    const textureLoader = new THREE.TextureLoader(loadingManager);
    const doorColorTexture = textureLoader.load(
      doorColorTextureImage.src
      // () => {
      //   console.log('load')
      // },
      // () => {
      //   console.log('progress')
      // },
      // () => {
      //   console.log('error')
      // }
    );
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

    // texture transformations
    // doorColorTexture.repeat.x = 2;
    // doorColorTexture.repeat.y = 3;
    // doorColorTexture.wrapS = THREE.MirroredRepeatWrapping;
    // doorColorTexture.wrapT = THREE.RepeatWrapping;

    // doorColorTexture.offset.x = 0.5;
    // doorColorTexture.offset.y = 0.5;

    doorColorTexture.center = new THREE.Vector2(0.5, 0.5);
    doorColorTexture.minFilter = THREE.NearestFilter;
    doorColorTexture.magFilter = THREE.NearestFilter
    doorColorTexture.generateMipmaps = false;

    gui
      .add(doorColorTexture, "rotation")
      .min(0)
      .max(Math.PI * 2)
      .step(0.01)
      .name("Rotation")
      .onChange(() => {
        doorColorTexture.needsUpdate = true;
      });

    // doorColorTexture.rotation = Math.PI / 4

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
      // color: 0xff0000,
      map: doorColorTexture,
      // wireframe: true,
    });
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    // const geometry = new THREE.SphereGeometry(1, 32, 32);
    // const geometry = new THREE.ConeGeometry(1, 1, 32);
    // const geometry = new THREE.TorusGeometry(0.7, 0.35, 32, 100);
    mesh.geometry = geometry;
    mesh.material = material;
    // mesh.position.x = 1;
    gui.add(mesh.position, "y").min(-1.5).max(1.5).step(0.01).name("Elevation");
    gui.add(mesh.position, "x", -1.5, 1.5, 0.01);
    gui.add(mesh, "visible").name("isVisible?");
    gui.add(material, "wireframe").name("EnableWireframe");
    gui
      .addColor(debugObject, "color")
      .name("Cube Color")
      .onChange(() => {
        material.color.set(debugObject.color);
      });
    gui.add(debugObject, "spin");

    scene.add(mesh);

    const progressGroup = new THREE.Group();

    const progressleftFrameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.3, 0.2),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    const progressRightFrameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.3, 0.2),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    progressRightFrameMesh.position.set(0.9, 0, 0);
    const progressTopFrameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.1, 0.2),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    progressTopFrameMesh.position.set(0.45, 0.15, 0);
    const progressBottomFrameMesh = new THREE.Mesh(
      new THREE.BoxGeometry(1, 0.1, 0.2),
      new THREE.MeshBasicMaterial({
        color: 0xff0000,
      })
    );
    progressBottomFrameMesh.position.set(0.45, -0.15, 0);

    const progressGeometry = new THREE.BoxGeometry(0.8, 0.2, 0.2);
    progressGeometry.translate(0, 0, 0);
    const progressMaterial = new THREE.MeshBasicMaterial({});
    const progressMesh = new THREE.Mesh(progressGeometry, progressMaterial);
    progressMesh.position.set(0.45, 0, 0);

    progressGroup.add(progressleftFrameMesh);
    progressGroup.add(progressTopFrameMesh);
    progressGroup.add(progressBottomFrameMesh);
    progressGroup.add(progressRightFrameMesh);
    progressGroup.add(progressMesh);
    scene.add(progressGroup);
    progressGroup.position.set(-0.5, 1.5, 0);

    // gui.add(progressMesh, "scale")

    gui.add(progressMesh.scale, "x").min(0).max(1).name("Progress");

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
        <h1 className="text-3xl font-bold">Textures</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
