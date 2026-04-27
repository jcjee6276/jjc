import { useState } from "react";
import { Html } from "@react-three/drei";
import { FixedBottomCTA } from "../shared/FixedBottomCTA";
import Test from "../pages/About";

const SCREEN_POS = [0, 0.15, 0.08];
const SCREEN_ROT = [-0.14, 0, 0];

// Html transform 기준 픽셀 크기 (distanceFactor로 스케일 조정)
const SCREEN_WIDTH = 340;
const SCREEN_HEIGHT = 650;

function HomePage({ onNavigate }) {
  return (
    <>
      <p
        style={{
          marginTop: "10px",
          fontSize: 28,
          color: "#64748B",
          fontWeight: 900,
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        Frontend
      </p>
      <p
        style={{
          fontSize: 28,
          color: "#64748B",
          fontWeight: 900,
          letterSpacing: "0.08em",
          margin: 0,
        }}
      >
        Engineer
      </p>
      <p style={{ fontSize: 14, color: "#94a3b8", margin: "8px 0 0" }}>
        전지창 포트폴리오
      </p>
      <div
        style={{
          marginTop: "auto",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        <FixedBottomCTA onClick={() => onNavigate("info")}>
          시작하기
        </FixedBottomCTA>
        <FixedBottomCTA onClick={() => onNavigate("info")} bgColor="#1f2937">
          프로젝트 보기
        </FixedBottomCTA>
      </div>
    </>
  );
}

function InfoPage({ onNavigate }) {
  return (
    <>
      <p
        style={{
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: "0.05em",
          olor: "#FF6600",
          margin: 0,
        }}
      >
        Frontend Engineer
      </p>
      <p
        style={{
          fontSize: 14,
          color: "#94a3b8",
          margin: "12px 0 0",
          lineHeight: 1.8,
          textAlign: "center",
        }}
      >
        React · Three.js
        <br />
        UI/UX · Web3D
      </p>
      <div style={{ marginTop: "auto", width: "100%" }}>
        <FixedBottomCTA onClick={() => onNavigate("home")} bgColor="#374151">
          ← 돌아가기
        </FixedBottomCTA>
      </div>
    </>
  );
}

export function KioskScreen({ isZoomed, stateRef }) {
  const [page, setPage] = useState("home");

  const handleScreenClick = () => {
    if (
      !isZoomed &&
      (stateRef.current === "idle" || stateRef.current === "resetting")
    ) {
      stateRef.current = "zooming";
    }
  };

  return (
    <Html
      position={SCREEN_POS}
      rotation={SCREEN_ROT}
      transform
      occlude
      distanceFactor={0.38}
    >
      <div
        onClick={handleScreenClick}
        style={{
          width: SCREEN_WIDTH,
          height: SCREEN_HEIGHT,
          background: "#F0F0F0",
          borderRadius: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start",
          padding: "0 0px 0px",
          boxSizing: "border-box",
          color: "#ffffff",
          fontFamily: "sans-serif",
          overflow: "hidden",
          cursor: isZoomed ? "default" : "pointer",
        }}
      >
        {page === "home" && (
          <HomePage onNavigate={isZoomed ? setPage : undefined} />
        )}
        {page === "info" && (
          // <InfoPage onNavigate={isZoomed ? setPage : undefined} />
          <Test />
        )}
      </div>
    </Html>
  );
}
