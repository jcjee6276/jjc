import { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";

function Model() {
  const { scene } = useGLTF("/kiosk.glb");
  const groupRef = useRef();
  const directionRef = useRef(1);
  const angleRef = useRef(0);

  useFrame(() => {
    angleRef.current += 0.008 * directionRef.current;
    if (angleRef.current >= Math.PI / 8) directionRef.current = -1;
    if (angleRef.current <= -Math.PI / 2) directionRef.current = 1;
    groupRef.current.rotation.y = angleRef.current;
  });

  return (
    <group ref={groupRef}>
      <primitive object={scene} />
    </group>
  );
}

function Home() {
  return (
    <div
      style={{
        width: "100vw",
        height: "100vh",
        background:
          "radial-gradient(ellipse at center, #d8d8d8 0%, #b0b0b0 100%)",
      }}
    >
      <Canvas camera={{ position: [-8, 5, 10], fov: 15 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model />
          <Environment preset="city" />
        </Suspense>
        <OrbitControls enablePan={true} />
      </Canvas>
    </div>
  );
}

export default Home;
