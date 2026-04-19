import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";

// state: 'idle' | 'zooming' | 'zoomed' | 'resetting'

const ORIGIN_POS = new THREE.Vector3(-8, 5, 10);
const ORIGIN_LOOK = new THREE.Vector3(0, 0, 0);
const ZOOM_TARGET_POS = new THREE.Vector3(0, 0, 3);
const ZOOM_TARGET_LOOK = new THREE.Vector3(0, 0.1, 0);

function Model({ stateRef }) {
  const { scene } = useGLTF("/kiosk.glb");
  const groupRef = useRef();
  const directionRef = useRef(1);
  const angleRef = useRef(0);

  useFrame(() => {
    const state = stateRef.current;

    if (state === "zooming") {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        0,
        0.05
      );
      return;
    }

    if (state === "resetting") {
      angleRef.current = groupRef.current.rotation.y;
      return;
    }

    if (state === "zoomed") return;

    // idle: oscillate
    angleRef.current += 0.008 * directionRef.current;
    if (angleRef.current >= Math.PI / 8) directionRef.current = -1;
    if (angleRef.current <= -Math.PI / 2) directionRef.current = 1;
    groupRef.current.rotation.y = angleRef.current;
  });

  const handleClick = (e) => {
    e.stopPropagation();
    const state = stateRef.current;
    if (state === "idle" || state === "resetting") {
      stateRef.current = "zooming";
    }
  };

  return (
    <group ref={groupRef} onClick={handleClick}>
      <primitive object={scene} />
    </group>
  );
}

function CameraZoom({ stateRef, controlsRef }) {
  const { camera } = useThree();

  useFrame(() => {
    const state = stateRef.current;

    if (state === "zooming") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      camera.position.lerp(ZOOM_TARGET_POS, 0.05);
      camera.lookAt(ZOOM_TARGET_LOOK);
      if (camera.position.distanceTo(ZOOM_TARGET_POS) < 0.05) {
        stateRef.current = "zoomed";
      }
      return;
    }

    if (state === "resetting") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      camera.position.lerp(ORIGIN_POS, 0.05);
      camera.lookAt(ORIGIN_LOOK);
      if (camera.position.distanceTo(ORIGIN_POS) < 0.1) {
        stateRef.current = "idle";
        if (controlsRef.current) controlsRef.current.enabled = true;
      }
    }
  });

  return null;
}

function KoreanClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("ko-KR", {
          timeZone: "Asia/Seoul",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return <span>{time} KST</span>;
}

function Home() {
  const stateRef = useRef("idle");
  const controlsRef = useRef();

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
        >
          <KoreanClock />
        </span>
      </div>

      <Canvas
        camera={{ position: [-8, 5, 10], fov: 15 }}
        onPointerMissed={() => {
          const state = stateRef.current;
          if (state === "zooming" || state === "zoomed") {
            stateRef.current = "resetting";
          }
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <Model stateRef={stateRef} />
          <Environment preset="city" />
        </Suspense>
        <CameraZoom stateRef={stateRef} controlsRef={controlsRef} />
        <OrbitControls ref={controlsRef} enablePan={true} />
      </Canvas>
    </div>
  );
}

export default Home;
