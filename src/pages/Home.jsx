import { Suspense, useRef, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  Environment,
  RenderTexture,
  PerspectiveCamera,
  Text,
} from "@react-three/drei";
import * as THREE from "three";

// state: 'idle' | 'zooming' | 'zoomed' | 'resetting'

const ORIGIN_POS = new THREE.Vector3(-8, 5, 10);
const ORIGIN_LOOK = new THREE.Vector3(0, 0, 0);
const ZOOM_TARGET_POS = new THREE.Vector3(0, 0, 3);
const ZOOM_TARGET_LOOK = new THREE.Vector3(0, 0.1, 0);
const SCREEN_POS = [0, 0.15, 0.12];
const SCREEN_SIZE = [0.33, 0.58]; // 화면 크기 (Three.js 단위)

// 화면 페이지: 'home' | 'info'
function ScreenScene({ page, onNavigate }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <color attach="background" args={["#0d1117"]} />

      <>
        <Text
          position={[0, 1.4, 0]}
          fontSize={0.45}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
          letterSpacing={0.08}
        >
          WELCOME
        </Text>
        <Text
          position={[0, 0.7, 0]}
          fontSize={0.22}
          color="#94a3b8"
          anchorX="center"
          anchorY="middle"
        >
          전지창 포트폴리오
        </Text>

        {/* 시작하기 버튼 */}
        <mesh position={[0, -0.2, 0]} onClick={() => onNavigate("info")}>
          <planeGeometry args={[2.6, 0.65]} />
          <meshBasicMaterial color="#1e40af" />
        </mesh>
        <Text
          position={[0, -0.2, 0.01]}
          fontSize={0.28}
          color="#ffffff"
          anchorX="center"
          anchorY="middle"
        >
          시작하기
        </Text>

        {/* 정보 보기 버튼 */}
        <mesh position={[0, -1.1, 0]} onClick={() => onNavigate("info")}>
          <planeGeometry args={[2.6, 0.65]} />
          <meshBasicMaterial color="#1f2937" />
        </mesh>
        <Text
          position={[0, -1.1, 0.01]}
          fontSize={0.28}
          color="#cbd5e1"
          anchorX="center"
          anchorY="middle"
        >
          정보 보기
        </Text>
      </>
    </>
  );
}

function KioskScreen({ isZoomed }) {
  const [page, setPage] = useState("home");

  //   if (!isZoomed) return null;

  return (
    <mesh position={SCREEN_POS}>
      <planeGeometry args={SCREEN_SIZE} />
      <meshBasicMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <ScreenScene page={page} onNavigate={setPage} />
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
}

function Model({ stateRef, isZoomed }) {
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
      <KioskScreen isZoomed={isZoomed} />
    </group>
  );
}

function CameraZoom({ stateRef, controlsRef, setIsZoomed }) {
  const { camera } = useThree();

  useFrame(() => {
    const state = stateRef.current;

    if (state === "zooming") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      camera.position.lerp(ZOOM_TARGET_POS, 0.05);
      camera.lookAt(ZOOM_TARGET_LOOK);
      if (camera.position.distanceTo(ZOOM_TARGET_POS) < 0.05) {
        stateRef.current = "zoomed";
        setIsZoomed(true);
      }
      return;
    }

    if (state === "resetting") {
      if (controlsRef.current) controlsRef.current.enabled = false;
      setIsZoomed(false);
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
          <Model stateRef={stateRef} isZoomed={isZoomed} />
          <Environment preset="city" />
        </Suspense>
        <CameraZoom
          stateRef={stateRef}
          controlsRef={controlsRef}
          setIsZoomed={setIsZoomed}
        />
        <OrbitControls ref={controlsRef} enablePan={true} />
      </Canvas>
    </div>
  );
}

export default Home;
