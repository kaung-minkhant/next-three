'use client'
import { Canvas } from "@react-three/fiber";
import { BoxGeometry } from "three";


interface BoxProps{
  position?: [number, number, number];
  size?: [number, number, number];
  color?: string;
}
const Box = ({ position = [0, 0, 0], size = [1, 1, 1], color="red" }: BoxProps) => {
  return <mesh position={position} >
    <boxGeometry args={size} />
    <meshBasicMaterial color={color} />
  </mesh> 
}
export default function Sample1() {
  return <div>
    <p className="text-center my-5">Sample 1 Canvas</p>
    <Canvas className="border border-foreground">
      {/* <directionalLight position={[0, 0, 5]} /> */}
      <Box size={[3, 3, 3]} position={[2, 0, 0]} color="red"  />
    </Canvas>
  </div>;
}