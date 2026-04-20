import { useState } from "react";
import { RenderTexture, PerspectiveCamera, Text } from "@react-three/drei";

const SCREEN_POS = [0, 0.15, 0.08];
const SCREEN_SIZE = [0.33, 0.62];
const SCREEN_ROT = [-0.14, 0, 0];

function ScreenScene({ page, onNavigate }) {
  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 5]} />
      <color attach="background" args={["#0d1117"]} />

      {page === "home" && (
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
      )}

      {page === "info" && (
        <>
          <Text
            position={[0, 1.4, 0]}
            fontSize={0.38}
            color="#ffffff"
            anchorX="center"
            anchorY="middle"
            letterSpacing={0.05}
          >
            Frontend Engineer
          </Text>
          <Text
            position={[0, 0.6, 0]}
            fontSize={0.22}
            color="#94a3b8"
            anchorX="center"
            anchorY="middle"
            maxWidth={3}
            textAlign="center"
            lineHeight={1.5}
          >
            {"React · Three.js\nUI/UX · Web3D"}
          </Text>

          <mesh position={[0, -1.1, 0]} onClick={() => onNavigate("home")}>
            <planeGeometry args={[2.6, 0.65]} />
            <meshBasicMaterial color="#374151" />
          </mesh>
          <Text
            position={[0, -1.1, 0.01]}
            fontSize={0.28}
            color="#cbd5e1"
            anchorX="center"
            anchorY="middle"
          >
            ← 돌아가기
          </Text>
        </>
      )}
    </>
  );
}

export function KioskScreen() {
  const [page, setPage] = useState("home");

  return (
    <mesh position={SCREEN_POS} rotation={SCREEN_ROT}>
      <planeGeometry args={SCREEN_SIZE} />
      <meshBasicMaterial>
        <RenderTexture attach="map" anisotropy={16}>
          <ScreenScene page={page} onNavigate={setPage} />
        </RenderTexture>
      </meshBasicMaterial>
    </mesh>
  );
}
