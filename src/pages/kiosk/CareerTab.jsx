import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Typography from "../../shared/Typography";

const CAREERS = [
  {
    company: "아이엠티소프트",
    period: "2024.04 - 2025.11",
    role: "Frontend Developer",
    description:
      "• 키오스크 및 포스 프로그램 개발 및 유지보수\n• 아워홈 물류 키오스크 리드 개발\n• 안드로이드 포스 개발\n• 써브웨이 키오스크 유지 보수 및 추가 개발\n• 파파이스 키오스크 유지 보수 및 추가 개발\n• DIT 식수 시스템 개발",
  },
  {
    company: "밀버스",
    period: "2023.09 - 2023.11",
    role: "Backend Enginner",
    description:
      "• 외부 서버에서 데이터를 받아 가공하고 전송하는 중계 서버 개발\n• Apache Airflow를 활용하여 자동화 파이프라인 구축",
  },
  {
    company: "큐로이드",
    period: "2020.04 - 2022.10",
    role: "IT Backup Enginner",
    description:
      "Next.js 기반 커머스 플랫폼 개발.\nTailwind CSS 도입 및 디자인 시스템 정립.\nVitest를 활용한 유닛 테스트 작성.",
  },
];

function ListCard({ company, period, role, description }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      style={{
        borderRadius: 12,
        padding: "0px 20px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        background: "#fff",
      }}
    >
      {/* 헤더 */}
      <button
        onClick={() => setOpen((prev) => !prev)}
        style={{
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "16px 0px",
          background: "none",
          border: "none",
          cursor: "pointer",
          textAlign: "left",
          gap: 12,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          <Typography as="span" size="md" weight="bold" color="#111">
            {company}
          </Typography>
          <Typography as="span" size="sm" color="#9ca3af">
            {period}
          </Typography>
        </div>

        <ChevronDown
          size={18}
          color="#9ca3af"
          style={{
            flexShrink: 0,
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.25s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        />
      </button>

      {/* 상세 내용 */}
      <div
        style={{
          maxHeight: open ? 300 : 0,
          overflow: "hidden",
          transition: "max-height 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        <div
          style={{
            padding: "0 0px 12px",
            borderTop: "1px solid #f3f4f6",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <Typography
            as="span"
            size="sm"
            weight="medium"
            color="#374151"
            style={{ marginTop: 12 }}
          >
            {role}
          </Typography>
          <Typography
            as="p"
            size="sm"
            color="#6b7280"
            lineHeight="relaxed"
            style={{ whiteSpace: "pre-line", margin: 0 }}
          >
            {description}
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default function CareerTab() {
  return (
    <div
      style={{
        padding: "10px",
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        flex: 1,
        height: "100%",
        gap: 6,
      }}
    >
      {CAREERS.map((career) => (
        <ListCard key={career.company} {...career} />
      ))}
    </div>
  );
}
