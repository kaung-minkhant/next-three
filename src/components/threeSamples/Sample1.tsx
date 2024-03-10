"use client";
import { MeshWobbleMaterial, OrbitControls, useHelper } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { Leva, useControls } from "leva";
import { useRef, useState } from "react";
import { DirectionalLight, DirectionalLightHelper, Mesh } from "three";

interface GeometryProps {
  color?: string;
  position?: [number, number, number];
}
interface BoxProps extends GeometryProps {
  size?: [number, number, number];
  wobble?: boolean;
}
const Box = ({
  position = [0, 0, 0],
  size = [1, 1, 1],
  color,
  wobble = false,
}: BoxProps) => {
  const [isClicked, setIsClicked] = useState(false);
  const [isDoubleClicked, setIsDoubleClicked] = useState(false);
  const ref = useRef<Mesh>(null);
  const xDirection = isClicked ? -1 : 1;
  const speed = isDoubleClicked ? 2 : 1;
  useFrame((state, delta) => {
    ref.current!.rotation.x += delta * xDirection * speed;
  });
  let material;
  if (wobble) {
    material = <MeshWobbleMaterial color={color} factor={3} speed={3} />;
  } else {
    material = <meshStandardMaterial color={color} />;
  }
  return (
    <mesh
      position={position}
      ref={ref}
      onClick={() => setIsClicked(!isClicked)}
      onDoubleClick={() => setIsDoubleClicked(!isDoubleClicked)}
    >
      <boxGeometry args={size} />
      {material}
    </mesh>
  );
};

interface SphereProps extends GeometryProps {
  size?: [
    radius?: number,
    widthSegments?: number,
    heightSegments?: number,
    phiStart?: number,
    phiLength?: number,
    thetaStart?: number,
    thetaLength?: number
  ];
}
const Sphere = ({ position, size, color }: SphereProps) => {
  const ref = useRef<Mesh>(null);
  useFrame((state, delta) => {
    ref.current!.rotation.x += delta;
  });
  return (
    <mesh position={position} ref={ref}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
      {/* <MeshWobbleMaterial /> */}
    </mesh>
  );
};

const Scene = () => {
  const directionalLightRef = useRef<DirectionalLight>(null!);

  useHelper(directionalLightRef, DirectionalLightHelper, 0.5, "red");

  const {lightColor, lightIntensity} = useControls({
    lightColor: "red",
    lightIntensity: {
      value: 0.5,
      min: 0,
      max: 5,
      step: 0.1,
    },
  });

  const {radius} = useControls({
    radius: {
      value: 1,
      min: 1,
      max: 4,
      step: 0.1
    }
  })
  return (
    <>
      <directionalLight position={[0, 0, 5]} ref={directionalLightRef} color={lightColor} intensity={lightIntensity} />
      <directionalLight position={[0, 0, -5]} />
      <Box size={[1, 1, 1]} position={[-2, 0, 0]} wobble />
      <Box size={[1, 1, 1]} position={[2, 0, 0]}/>
      <Sphere
        size={[radius, 32, 32, 0, Math.PI * 2, 0, Math.PI * 2]}
        position={[0, -2, 0]}
        color="red"
      />
      <Box size={[1, 1, 1]} position={[0, 2, 0]} color="red" />

      <OrbitControls enableZoom={false} />
    </>
  );
};
export default function Sample1() {
  return (
    <div className="flex flex-col h-screen w-full">
      <Leva />
      <p className="text-center my-5">Sample 1 Canvas</p>
      <div className="flex-grow m-5 mt-0">
        <Canvas className="border border-foreground">
          <Scene />
        </Canvas>
      </div>
    </div>
  );
}
