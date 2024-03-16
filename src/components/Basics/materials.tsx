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
import gradient from '@/assets/static/textures/gradients/5.jpg'
import matcap from '@/assets/static/textures/matcaps/4.png'
import environmentnx from '@/assets/static/textures/environmentMaps/1/nx.jpg'
import environmentny from '@/assets/static/textures/environmentMaps/1/ny.jpg'
import environmentnz from '@/assets/static/textures/environmentMaps/1/nz.jpg'
import environmentpx from '@/assets/static/textures/environmentMaps/1/px.jpg'
import environmentpy from '@/assets/static/textures/environmentMaps/1/py.jpg'
import environmentpz from '@/assets/static/textures/environmentMaps/1/pz.jpg'
export default function Materials() {
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
    const cubeTextureLoader = new THREE.CubeTextureLoader(loadingManager)

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
    const gradientTexture = textureLoader.load(gradient.src)
    const matcapTexture = textureLoader.load(matcap.src)

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
    gui.add(orbitControls, "enabled").name("Enable Orbit Controls");

    // scene
    const scene = new THREE.Scene();

    //
    // Start
    //


    // const material = new THREE.MeshBasicMaterial();
    // material.map = doorColorTexture
    // material.color = new THREE.Color(0xff0000);
    // material.color.set(0x00ff00);
    // material.wireframe = true
    // material.transparent = true
    // material.opacity = 0.5
    // material.alphaMap = doorAlphaTexture
    // material.side = THREE.DoubleSide

    // const material = new THREE.MeshNormalMaterial()
    // material.wireframe = true;
    // material.flatShading = true;

    // const material = new THREE.MeshMatcapMaterial();
    // material.matcap = matcapTexture

    // const material = new THREE.MeshDepthMaterial()

    // some materials need light
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const pointLight = new THREE.PointLight(0xffffff, 2, 0, 0);
    pointLight.position.x = 2
    pointLight.position.y = 3
    pointLight.position.z = 4
    scene.add(pointLight)
    // const material = new THREE.MeshLambertMaterial()

    // const material = new THREE.MeshPhongMaterial()
    // material.shininess = 1000
    // material.specular = new THREE.Color(0xff0000)

    // const material = new THREE.MeshToonMaterial();
    // material.gradientMap = gradientTexture
    // gradientTexture.generateMipmaps = false
    // gradientTexture.minFilter = THREE.NearestFilter
    // gradientTexture.magFilter = THREE.NearestFilter

    // const material = new THREE.MeshStandardMaterial()
    // // material.metalness = 0.45
    // material.metalnessMap = doorMetalnessTexture
    // material.roughnessMap = doorRoughnessTexture
    // // material.roughness = 0.45
    // material.map = doorColorTexture
    // material.side = THREE.DoubleSide
    // material.aoMap = doorAmbiantOcclusionTexture
    // material.aoMapIntensity = 5
    // material.displacementMap = doorHeightTexture // height map
    // material.displacementScale = 0.05
    // material.normalMap = doorNormalTexture
    // material.normalScale.set(1, 1)
    // material.alphaMap = doorAlphaTexture
    // material.transparent = true

    // gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness')
    // gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness')
    // gui.add(material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement Scale')
    // gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001).name('AO Map Intensity')

    // const material = new THREE.MeshPhysicalMaterial() // clear coating

    // pointsMaterials => to create points
    // shaderMaterials, rawShaderMaterials => with custom shaders

    // environment maps
    const material = new THREE.MeshStandardMaterial()
    material.metalness = 0.7;
    material.roughness = 0.3;
    // load environment textures
    const environmentMapTexture = cubeTextureLoader.load([
      // px, nx, py, xy, pz, nz
      environmentpx.src, environmentnx.src, environmentpy.src, environmentny.src, environmentpz.src, environmentnz.src
    ])
    material.envMap = environmentMapTexture

    gui.add(material, 'metalness').min(0).max(1).step(0.001).name('Metalness')
    gui.add(material, 'roughness').min(0).max(1).step(0.001).name('Roughness')
    // gui.add(material, 'displacementScale').min(0).max(1).step(0.001).name('Displacement Scale')
    // gui.add(material, 'aoMapIntensity').min(0).max(10).step(0.001).name('AO Map Intensity')

    //
    // end 
    //
    gui.add(material, 'wireframe').name('Wireframe')

    const sphere = new THREE.Mesh(
      new THREE.SphereGeometry(0.5, 64, 64),
      material
    );
    sphere.position.set(-1.5, 0, 0);
    sphere.geometry.setAttribute('uv2', new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

    const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material);
    plane.geometry.setAttribute('uv2', new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

    const torus = new THREE.Mesh(
      new THREE.TorusGeometry(0.5, 0.2, 64, 128),
      material
    );
    torus.position.set(1.5, 0, 0);
    torus.geometry.setAttribute('uv2', new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

    // adding to scene
    scene.add(sphere, plane, torus);

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
      camera.aspect = sizes.width / sizes.height;
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
      // update objects
      sphere.rotation.y = t * rotationYSpeed;
      plane.rotation.y = t * rotationYSpeed;
      torus.rotation.y = t * rotationYSpeed;

      sphere.rotation.x = t * rotationXSpeed;
      plane.rotation.x = t * rotationXSpeed;
      torus.rotation.x = t * rotationXSpeed;

      orbitControls.update();

      renderer.render(scene, camera);
      window.requestAnimationFrame(tick);
    };
    tick();
  }, []);
  return (
    <div className="w-full h-screen relative">
      <div className="text-center left-0 top-0 absolute text-slate-200">
        <h1 className="text-3xl font-bold">Materials</h1>
      </div>
      <div className="w-full">
        <canvas className="m-auto" id="webgl"></canvas>
      </div>
    </div>
  );
}
