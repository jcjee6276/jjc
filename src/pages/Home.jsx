import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment, Html } from "@react-three/drei";
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

// 키오스크 기준 힌트 위치: 120도 방향, 반경/바닥 높이
const HINT_ANGLE = (0 * Math.PI) / 180;
const HINT_RADIUS = 0.75;
const HINT_FLOOR_Y = -0.5;
const HINT_X = Math.sin(HINT_ANGLE) * HINT_RADIUS;
const HINT_Z = Math.cos(HINT_ANGLE) * HINT_RADIUS;
// 바닥에 눕힌 평면(html 기준 위쪽 = 월드 -z)에서 키오스크를 향하는 회전각
const HINT_ARROW_ROT = Math.atan2(-HINT_X, HINT_Z);

function ClickHint({ stateRef }) {
  const wrapperRef = useRef();

  // stateRef는 리렌더를 일으키지 않으므로 매 프레임 DOM 스타일로 표시 여부 갱신
  useFrame(() => {
    if (!wrapperRef.current) return;
    const idle =
      stateRef.current === "idle" || stateRef.current === "resetting";
    wrapperRef.current.style.opacity = idle ? "1" : "0";
  });

  return (
    <Html
      position={[HINT_X, HINT_FLOOR_Y, HINT_Z]}
      rotation={[-Math.PI / 2, 0, 0]}
      transform
      zIndexRange={[5, 0]}
      distanceFactor={1.6}
      style={{ pointerEvents: "none" }}
    >
      <div
        ref={wrapperRef}
        style={{
          pointerEvents: "none",
          transition: "opacity 0.3s ease",
          userSelect: "none",
          transform: `rotate(${HINT_ARROW_ROT}rad)`,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "6px",
        }}
      >
        <style>{`
          @keyframes click-hint-slide {
            0%, 100% { transform: translateY(0); opacity: 1; }
            50% { transform: translateY(-22px); opacity: 0.6; }
          }
        `}</style>
        <svg
          width="90"
          height="90"
          viewBox="0 0 24 24"
          fill="none"
          style={{ animation: "click-hint-slide 1.3s ease-in-out infinite" }}
        >
          <path
            d="M12 20V4m0 0l-7 7m7-7l7 7"
            stroke="#1a1a1a"
            strokeWidth="4.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <span
          style={{
            fontSize: "48px",
            fontWeight: 700,
            color: "#1a1a1a",
            background: "rgba(255, 255, 255, 0.85)",
            padding: "8px 20px",
            borderRadius: "999px",
            letterSpacing: "0.04em",
            whiteSpace: "nowrap",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
          }}
        >
          CLICK
        </span>
      </div>
    </Html>
  );
}

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
      <ClickHint stateRef={stateRef} />
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
