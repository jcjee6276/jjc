import { Suspense, useRef, useState, useEffect } from "react";
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
        position: "relative",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: "2rem",
          left: "2.5rem",
          zIndex: 10,
          display: "flex",
          flexDirection: "column",
          gap: "0.4rem",
        }}
      >
        <span
          style={{
            fontSize: "1.1rem",
            fontWeight: 700,
            color: "#1a1a1a",
            letterSpacing: "0.02em",
          }}
        >
          전지창
        </span>
        <span
          style={{
            fontSize: "0.85rem",
            color: "#444",
            letterSpacing: "0.04em",
          }}
        >
          Frontend Engineer
        </span>
        <span
          style={{
            fontSize: "0.8rem",
            color: "#666",
            letterSpacing: "0.03em",
            marginTop: "0.2rem",
          }}
        ></span>
      </div>
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
