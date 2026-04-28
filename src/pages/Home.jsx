import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import { KioskScreen } from "../components/Kiosk";
import { LoadingScreen } from "../components/LoadingScreen";
import * as THREE from "three";
import { useNavigate } from "react-router-dom";

// state: 'idle' | 'zooming' | 'zoomed' | 'resetting'

const ORIGIN_POS = new THREE.Vector3(-8, 5, 10);
const ORIGIN_LOOK = new THREE.Vector3(0, 0, 0);
const ZOOM_TARGET_POS = new THREE.Vector3(0, 0, 3);
const ZOOM_TARGET_LOOK = new THREE.Vector3(0, 0.1, 0);

// function BackgroundModal() {
//   const { scene } = useGLTF("/background-transformed.glb");
//   return <primitive object={scene} scale={2} />;
// }

export function BackgroundModal(props) {
  const { nodes, materials } = useGLTF("/background-transformed.glb");
  return (
    <group {...props} dispose={null}>
      <mesh
        scale={2}
        geometry={nodes.input.geometry}
        material={materials.material_0}
        rotation={[Math.PI / 2, 0, 1.5]}
        position={[0.7, 0.1, -0.7]}
      />
    </group>
  );
}

useGLTF.preload("/background-transformed.glb");

function Model({ stateRef, isZoomed }) {
  const { scene } = useGLTF("/kiosk-transformed.glb");
  const groupRef = useRef();
  const directionRef = useRef(1);
  const angleRef = useRef(0);
  const kioskRef = useRef();

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

    // angleRef.current += 0.008 * directionRef.current;
    // if (angleRef.current >= Math.PI / 8) directionRef.current = -1;
    // if (angleRef.current <= -Math.PI / 2) directionRef.current = 1;
    // groupRef.current.rotation.y = angleRef.current;
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

      <KioskScreen isZoomed={isZoomed} stateRef={stateRef} />
    </group>
  );
}

function CameraZoom({ stateRef, controlsRef, setIsZoomed, isZoomed }) {
  const { camera } = useThree();

  useFrame(() => {
    const state = stateRef.current;

    if (state === "zooming") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      camera.position.lerp(ZOOM_TARGET_POS, 0.05);
      camera.lookAt(ZOOM_TARGET_LOOK);
      if (camera.position.distanceTo(ZOOM_TARGET_POS) < 0.05) {
        stateRef.current = "zoomed";
        setIsZoomed(() => true);
      }
      return;
    }

    if (state === "resetting") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      camera.position.lerp(ORIGIN_POS, 0.05);
      camera.lookAt(ORIGIN_LOOK);
      if (camera.position.distanceTo(ORIGIN_POS) < 0.1) {
        stateRef.current = "idle";
        setIsZoomed(false);
        if (controlsRef.current) controlsRef.current.enabled = true;
      }
    }
  });

  return null;
}

function Home() {
  const stateRef = useRef("idle");
  const controlsRef = useRef();
  const navigate = useNavigate();
  const [isZoomed, setIsZoomed] = useState(false);

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
      <LoadingScreen />
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
        <div
          onClick={() => navigate("/about")}
          style={{
            backgroundColor: "#000",
            fontSize: "0.85rem",
            textAlign: "center",
            padding: "5px",
            fontWeight: 500,
            color: "#FFF",
            letterSpacing: "0.04em",
            cursor: "pointer",
          }}
        >
          간단하게 보기
        </div>
      </div>

      <Canvas
        camera={{ position: [-8, 5, 10], fov: 15 }}
        dpr={(Math.min(window.devicePixelRatio), 1.5)}
        performance={{ min: 0.5 }}
        onPointerMissed={(e) => {
          // HTML 요소를 클릭한 게 아닐 때만 작동
          if (e.target.tagName !== "CANVAS") return;

          const state = stateRef.current;
          if (state === "zoomed") {
            stateRef.current = "resetting";
          }
        }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Suspense fallback={null}>
          <BackgroundModal />
          <Model stateRef={stateRef} isZoomed={isZoomed} />
          <Environment preset="city" />
        </Suspense>
        <CameraZoom
          stateRef={stateRef}
          isZoomed={isZoomed}
          controlsRef={controlsRef}
          setIsZoomed={setIsZoomed}
        />
        <OrbitControls ref={controlsRef} enablePan={true} />
      </Canvas>
    </div>
  );
}

export default Home;
