import { useProgress } from "@react-three/drei";
import { useEffect, useState } from "react";

export function LoadingScreen() {
  const { progress, active } = useProgress();
  const [visible, setVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    if (!active && progress === 100) {
      // 잠깐 딜레이 후 페이드 아웃
      const timer = setTimeout(() => setFadeOut(true), 0);
      return () => clearTimeout(timer);
    }
  }, [active, progress]);

  useEffect(() => {
    if (fadeOut) {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [fadeOut]);

  if (!visible) return null;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9999,
        background: "#0c0c0c",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        opacity: fadeOut ? 0 : 1,
        transition: "opacity 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
        pointerEvents: fadeOut ? "none" : "all",
      }}
    >
      {/* 상단 레이블 */}
      <div
        style={{
          position: "absolute",
          top: "2.5rem",
          left: "2.5rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.3rem",
        }}
      >
        <span
          style={{
            fontSize: "0.7rem",
            color: "#555",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          Portfolio
        </span>
        <span
          style={{
            fontSize: "1rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "0.05em",
          }}
        >
          전지창
        </span>
      </div>

      {/* 중앙 콘텐츠 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "3rem",
        }}
      >
        {/* 퍼센트 */}
        <div
          style={{
            fontFamily: "'Courier New', monospace",
            fontSize: "5rem",
            fontWeight: 700,
            color: "#fff",
            letterSpacing: "-0.02em",
            lineHeight: 1,
            minWidth: "3ch",
            textAlign: "right",
          }}
        >
          {Math.floor(progress)}
          <span
            style={{
              fontSize: "1.5rem",
              color: "#555",
              marginLeft: "0.2rem",
            }}
          >
            %
          </span>
        </div>

        {/* 진행 바 */}
        <div
          style={{
            width: "240px",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
          }}
        >
          {/* 트랙 */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "#2a2a2a",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* 채워지는 바 */}
            <div
              style={{
                position: "absolute",
                left: 0,
                top: 0,
                height: "100%",
                width: `${progress}%`,
                background: "#fff",
                transition: "width 0.3s ease",
              }}
            />
          </div>

          {/* 하단 텍스트 */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.65rem",
                color: "#555",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Loading
            </span>
            <span
              style={{
                fontSize: "0.65rem",
                color: "#555",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
              }}
            >
              Frontend Engineer
            </span>
          </div>
        </div>
      </div>

      {/* 하단 */}
      <div
        style={{
          position: "absolute",
          bottom: "2.5rem",
          right: "2.5rem",
        }}
      >
        <span
          style={{
            fontSize: "0.65rem",
            color: "#333",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
          }}
        >
          3D Portfolio
        </span>
      </div>
    </div>
  );
}
