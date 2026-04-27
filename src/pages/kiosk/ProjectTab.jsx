/*
 * @Author: 전지창
 * @Date: 2026-04-24 14:54:14
 * @LastEditTime: 2026-04-27 19:50:50
 * @LastEditors: 전지창
 * @Description: 프로젝트
 */
import { useState } from "react";
import Typography from "../../shared/Typography";
import Modal from "../../shared/Modal";

const PROJECTS = [
  {
    title: "물류 키오스크 프로젝트 리딩",
    description: "물류센터 프로세스 처리 키오스크 개발",
    subTitle: "프로젝트 내용",
    detail:
      "프로젝트 아키텍처 설계 및 일정 관리\n바코드 연동 개발 및 물류 프로세스 처리 구현\n프린트 연동 개발 및 출력물 템플릿 개발\n고객사 API 연동 및 로직 개발",
    problem: "문제 상황",
    problemDetail:
      "- 통합테스트 첫 날, 고객사 내부 회의로 인한 프로젝트 대규모 수정\n- 프로젝트 운영까지 2주 전, 통합테스트 1일 차 테스트 케이스 80건 중 18 PASS (23%)로 시작 ",
    result: "해결 방법",
    resultDetail:
      "- 고객사로 상주하며 상주 인원들과 적극 소통하며 화면 및 로직 수정\n1일차: 78건 중 18건 PASS (23%)\n2일차: 79건 중 45건 PASS (57%)\n3일차: 80건 중 70건 PASS (88%)\n4일차: 80건 중 80건 PASS (100%)\n달성하며 예정된 일정으로 프로젝트 운영 후 한 달간 모니터링 결과 UI 수정 외 기능적 결함 발생하지 않으며 프로젝트 완수",
  },
  {
    title: "프린터 출력 파이프라인 재설계",
    description: "파이프라인 분석 및 재설계를 통한 핵심 기능 개선",
    problem: "문제 상황",
    problemDetail:
      "장비 사양 하향 및 출력물 UI 운영 비용 증가로 인한 프린팅 성능(Target Speed) 병목 상황",
    approch: "기술적 상세",
    approchDetail:
      "- 기존 방식의 병목 지점 분석: Canvas 렌더링 → Image 변환 → 서버 전송 → PDF 생성 각 단계별 소요 시간 측정\n- PCL(Printer Command Language) 형식 도입으로 프린터가 직접 해석 가능한 명령어로 변환\n- Windows 스풀러 큐를 거치지 않고 직접 프린터 포트로 데이터 전송하는 low-level 접근",
    result: "해결 방법",
    resultDetail:
      "- 기존 방식을 폐기하고 서버에서 HTML 템플릿 생성 후 Pre-loading, React는 데이터만 전송하는 로직으로 전환\n- winspool.drv를 호출하여 스풀러를 거치지 않고 프린터로 직접 전송하는 로직 작성\n- 최종 출력 시간 7~8초로 출력 속도 70% 개선",
  },
  {
    title: "아키텍처 설계",
    description:
      "Custom Hooks와 Container/Presentation pattern 적용하여 로직, 화면 분리",
    subTitle: "프로젝트 내용",
    detail:
      "- 비즈니스 로직 분리: API 호출, 상태 관리, 복잡한 데이터 가공 로직을 Custom Hooks로 캡슐화하여 재사용성 증가\n- 관심사 분리: 데이터 흐름을 제어하는 Container와 순수하게 UI 렌더링만 담당하는 Presenter로 역할을 명확히 구분",
    result: "영향",
    resultDetail:
      "- 가독성 및 테스트 용이성: 로직과 UI가 분리됨에 따라 단위 테스트(Vitest), UI 테스트(Storybook) 작성에 용이 해지고, 컴포넌트 복잡도를 감소시킴",
  },
  {
    title: "멀티플랫폼 POS 개발",
    description:
      "Windows / Android 두 가지 플랫폼에서 사용가능한 POS 시스템 개발",
    subTitle: "프로젝트 내용",
    detail:
      "- 후불모드 화면 개발 및 기능 개발\n- API 설계 및 화면 마크업\n- 결제 및 현금영수증 기능 개발",
    // problem: "문제 상황",
    // problemDetail: "개발 기간이 늘어날수록 기존 레거시 폴더 구조로는 ",
  },
  {
    title: "키오스크 운영 및 유지 보수",
    description:
      "자사 서비스 써브웨이, 파파이스, 캘리스코 등 키오스크 및 POS 운영, 유지보수",
    subTitle: "프로젝트 내용",
    detail:
      "- 자사 서비스 운영 및 유지보수\n- 사내 콜센터 업무도 병행하여 고객과의 직접 소통을 통해 서비스 안정성 강화에 기여",
    result: "영향",
    resultDetail:
      "커뮤니케이션 스킬, 고객 응대, 빠른 원인 파악 및 문제 해결 등으로 소프트 스킬업",
  },
];

function ProjectCard({ title, description, dimmed, onClick }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
      style={{
        padding: "16px 18px",
        borderRadius: 12,
        border: "1px solid",
        borderColor: hovered ? "#111" : "#e5e7eb",
        background: "#fff",
        cursor: "pointer",
        opacity: dimmed && !hovered ? 0.35 : 1,
        transform: hovered ? "translateY(-2px)" : "translateY(0px)",
        transition: "opacity 0.2s, transform 0.2s, border-color 0.2s",
        display: "flex",
        flexDirection: "column",
        gap: 6,
      }}
    >
      <Typography as="span" size="md" weight="bold" color="#111">
        {title}
      </Typography>
      <Typography as="span" size="sm" color="#6b7280" lineHeight="snug">
        {description}
      </Typography>
    </div>
  );
}

export default function ProjectTab() {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedProject, setSelectedProject] = useState(null);

  return (
    <>
      <div
        style={{
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {PROJECTS.map((project, index) => (
          <div
            key={project.title}
            onMouseEnter={() => setHoveredIndex(index)}
            onMouseLeave={() => setHoveredIndex(null)}
          >
            <ProjectCard
              {...project}
              dimmed={hoveredIndex !== null && hoveredIndex !== index}
              onClick={() => setSelectedProject(project)}
            />
          </div>
        ))}
      </div>

      <Modal
        open={!!selectedProject}
        onClose={() => setSelectedProject(null)}
        title={selectedProject?.title}
      >
        <Typography as="span" size="md" weight="bold" color="#111">
          {selectedProject?.subTitle}
        </Typography>
        <Typography
          as="p"
          size="sm"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ whiteSpace: "pre-line", margin: 0 }}
        >
          {selectedProject?.detail}
        </Typography>
        <Typography as="span" size="md" weight="bold" color="#111">
          {selectedProject?.problem}
        </Typography>
        <Typography
          as="p"
          size="sm"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ whiteSpace: "pre-line", margin: 0 }}
        >
          {selectedProject?.problemDetail}
        </Typography>
        <Typography as="span" size="md" weight="bold" color="#111">
          {selectedProject?.approch}
        </Typography>
        <Typography
          as="p"
          size="sm"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ whiteSpace: "pre-line", margin: 0 }}
        >
          {selectedProject?.approchDetail}
        </Typography>
        <Typography as="span" size="md" weight="bold" color="#111">
          {selectedProject?.result}
        </Typography>
        <Typography
          as="p"
          size="sm"
          color="#6b7280"
          lineHeight="relaxed"
          style={{ whiteSpace: "pre-line", margin: 0 }}
        >
          {selectedProject?.resultDetail}
        </Typography>
      </Modal>
    </>
  );
}
