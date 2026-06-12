/*
 * @Author: 전지창
 * @Description: /cli-docs — JC-CLI(integration-cli) 문서 페이지 (라이트 전용)
 */
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Menu, Terminal, X, ChevronRight } from "lucide-react";

const GITHUB_URL = "https://github.com/jcjee6276/integration-cli";

const HEADING_GRADIENT =
  "linear-gradient(160deg, rgba(15,17,23,0.92) 0%, rgba(15,17,23,0.52) 100%)";

// ─── 사이드바 내비게이션 정의 ─────────────────────────────────────────────────

const NAV_GROUPS = [
  {
    label: "소개",
    items: [
      { id: "getting-started", title: "Getting Started" },
      { id: "why-jc-cli", title: "Why JC-CLI" },
      { id: "tech-stack", title: "Tech Stack" },
    ],
  },
  {
    label: "핵심 개념",
    items: [
      { id: "agents", title: "에이전트 세션" },
      { id: "tasks", title: "멀티 에이전트 태스크" },
      { id: "harness", title: "하네스 프롬프트" },
      { id: "changelog", title: "변경사항 병합" },
    ],
  },
  {
    label: "CLI",
    items: [
      { id: "jccli-init", title: "jccli init" },
      { id: "jccli-check", title: "jccli check" },
    ],
  },
  {
    label: "레퍼런스",
    items: [
      { id: "structure", title: "프로젝트 구조" },
      { id: "scripts", title: "스크립트" },
      { id: "runtime", title: "런타임 경로" },
    ],
  },
];

const ALL_IDS = NAV_GROUPS.flatMap((g) => g.items.map((i) => i.id));

// ─── 작은 빌딩 블록들 ─────────────────────────────────────────────────────────

function CodeBlock({ title, children }) {
  return (
    <div className="my-4 overflow-hidden rounded-xl border border-gray-900/[0.08]">
      {title && (
        <div className="flex items-center gap-2 border-b border-gray-900/[0.06] bg-gray-900/[0.03] px-4 py-2">
          <Terminal className="h-3.5 w-3.5 text-gray-900/35" />
          <span className="font-mono text-[11px] tracking-wide text-gray-900/45">
            {title}
          </span>
        </div>
      )}
      <pre className="overflow-x-auto bg-gray-900/[0.025] p-4 font-mono text-[13px] leading-relaxed text-gray-900/75">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function InlineCode({ children }) {
  return (
    <code className="rounded-md border border-gray-900/[0.08] bg-gray-900/[0.05] px-1.5 py-0.5 font-mono text-[0.85em] text-orange-600">
      {children}
    </code>
  );
}

function Section({ id, title, children }) {
  return (
    <section
      id={id}
      className="scroll-mt-24 border-b border-gray-900/[0.05] py-10 last:border-b-0"
    >
      <h2
        className="mb-4 text-[1.6rem] font-bold tracking-[-0.02em]"
        style={{
          backgroundImage: HEADING_GRADIENT,
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent",
          backgroundClip: "text",
        }}
      >
        {title}
      </h2>
      <div className="space-y-3 text-[14.5px] leading-7 text-gray-900/65">
        {children}
      </div>
    </section>
  );
}

function FeatureCard({ title, description, accent }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-gray-900/[0.07] bg-gray-900/[0.025] p-4">
      <div
        className={`pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b ${accent} to-transparent opacity-50`}
      />
      <p className="relative text-[14px] font-semibold text-gray-900/85">{title}</p>
      <p className="relative mt-1 text-[12.5px] leading-5 text-gray-900/45">
        {description}
      </p>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function CliDocs() {
  const [activeId, setActiveId] = useState(ALL_IDS[0]);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const observerRef = useRef(null);

  // 스크롤 스파이
  useEffect(() => {
    observerRef.current?.disconnect();
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible.length > 0) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px" }
    );
    ALL_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    observerRef.current = observer;
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (id) => {
    setSidebarOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  const sidebarNav = (
    <nav className="space-y-6">
      {NAV_GROUPS.map((group) => (
        <div key={group.label}>
          <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-900/35">
            {group.label}
          </p>
          <ul className="space-y-0.5">
            {group.items.map((item) => {
              const active = activeId === item.id;
              return (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={[
                      "flex w-full items-center gap-1.5 rounded-lg px-3 py-1.5 text-left text-[13px] transition-all",
                      active
                        ? "bg-orange-500/[0.10] font-medium text-orange-600"
                        : "text-gray-900/50 hover:bg-gray-900/[0.04] hover:text-gray-900/80",
                    ].join(" ")}
                  >
                    {active && <ChevronRight className="h-3 w-3 shrink-0" />}
                    {item.title}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </nav>
  );

  return (
    <div className="relative min-h-screen bg-[#faf8f5] text-gray-900">
      {/* 배경 glow + dot-grid */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[400px] w-[800px] -translate-x-1/2 rounded-full bg-orange-500/[0.04] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-60"
          style={{
            backgroundImage:
              "radial-gradient(circle, rgba(0,0,0,0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
            maskImage:
              "radial-gradient(ellipse 75% 50% at 50% 0%, black 30%, transparent 100%)",
            WebkitMaskImage:
              "radial-gradient(ellipse 75% 50% at 50% 0%, black 30%, transparent 100%)",
          }}
        />
      </div>

      {/* ── 헤더 ──────────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-gray-900/[0.06] bg-[#faf8f5]/80 backdrop-blur-md">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6">
          <div className="flex items-center gap-3">
            <button
              className="rounded-lg p-1.5 text-gray-900/50 hover:bg-gray-900/[0.05] lg:hidden"
              onClick={() => setSidebarOpen((v) => !v)}
              aria-label="메뉴 열기"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            <Link to="/" className="flex items-center gap-2.5">
              <span className="flex h-8 items-center justify-center rounded-[10px] border border-gray-900/[0.10] bg-gray-900/[0.05] px-3 shadow-[inset_0_1px_0_rgba(0,0,0,0.06)]">
                <span className="font-mono text-[11px] font-bold tracking-widest text-gray-900/65">
                  INTEGRATION-CLI
                </span>
              </span>
              <span className="hidden text-[13px] font-medium text-gray-900/35 sm:inline">
                Docs
              </span>
            </Link>
          </div>

          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noreferrer"
            className="rounded-lg p-2 text-gray-900/50 transition-colors hover:bg-gray-900/[0.05] hover:text-gray-900/80"
            aria-label="GitHub"
          >
            <Github className="h-4.5 w-4.5" />
          </a>
        </div>
      </header>

      <div className="relative mx-auto flex max-w-7xl">
        {/* ── 사이드바 (데스크톱) ─────────────────────────────────────────── */}
        <aside className="sticky top-14 hidden h-[calc(100vh-3.5rem)] w-64 shrink-0 overflow-y-auto border-r border-gray-900/[0.06] px-3 py-8 lg:block">
          {sidebarNav}
        </aside>

        {/* ── 사이드바 (모바일 오버레이) ─────────────────────────────────── */}
        {sidebarOpen && (
          <div className="fixed inset-0 z-30 lg:hidden">
            <div
              className="absolute inset-0 bg-black/40 backdrop-blur-sm"
              onClick={() => setSidebarOpen(false)}
            />
            <aside className="absolute left-0 top-14 h-[calc(100vh-3.5rem)] w-72 overflow-y-auto border-r border-gray-900/[0.08] bg-[#faf8f5] px-3 py-6">
              {sidebarNav}
            </aside>
          </div>
        )}

        {/* ── 본문 ──────────────────────────────────────────────────────────── */}
        <main className="min-w-0 flex-1 px-4 pb-24 sm:px-8 lg:px-12">
          {/* 히어로 */}
          <div className="animate-fade-in border-b border-gray-900/[0.05] pb-10 pt-12">
            <p className="mb-3 text-[12px] font-semibold uppercase tracking-[0.08em] text-orange-600">
              Documentation
            </p>
            <h1
              className="text-[2.5rem] font-bold leading-tight tracking-[-0.03em]"
              style={{
                backgroundImage: HEADING_GRADIENT,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              JC-CLI
            </h1>
            <p className="mt-3 max-w-xl text-[15px] leading-7 text-gray-900/50">
              Claude Code, Gemini CLI, Codex CLI 세션과 태스크, 로그, 에이전트
              변경사항을 로컬 웹 환경에서 통합 관리하는 워크스페이스입니다.
            </p>
          </div>

          <Section id="getting-started" title="Getting Started">
            <p>
              JC-CLI는 npm workspaces와 Turborepo 기반 모노레포입니다. Next.js 웹
              클라이언트, NestJS API/WebSocket 서버, 환경 초기화 CLI, 공용
              TypeScript/ESLint 설정 패키지로 구성되어 있습니다.
            </p>
            <p>
              npm에서 전역 설치 후 <InlineCode>jccli init</InlineCode> 한 번으로
              전체 프로젝트를 스캐폴딩하고 개발 서버를 띄울 수 있습니다.
            </p>
            <CodeBlock title="terminal">{`npm install -g @jccli@integration-cli
jccli init my-app
cd my-app
jccli start`}</CodeBlock>
            <p>
              기본 포트는 웹 <InlineCode>3020</InlineCode>이며, 서버 실행 중 API 문서는{" "}
              <InlineCode>http://localhost:3020/docs</InlineCode>에서 확인할 수
              있습니다.
            </p>
          </Section>

          <Section id="why-jc-cli" title="Why JC-CLI">
            <p>
              로컬 AI 코딩 에이전트들을 한 화면에서 다루는 것이 핵심 목적입니다.
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              <FeatureCard
                title="멀티 에이전트 채팅"
                description="Claude Code, Gemini CLI, Codex CLI 세션을 하나의 웹 UI에서 채팅으로 제어합니다."
                accent="from-orange-500/[0.10]"
              />
              <FeatureCard
                title="태스크 오케스트레이션"
                description="요구사항과 역할을 가진 멀티 에이전트 태스크를 생성하고 실행합니다."
                accent="from-blue-500/[0.10]"
              />
              <FeatureCard
                title="실시간 스트리밍"
                description="Socket.IO 기반으로 태스크 실행 출력을 실시간으로 스트리밍합니다."
                accent="from-purple-500/[0.08]"
              />
              <FeatureCard
                title="변경사항 리뷰 & 병합"
                description="changelog와 실행 이력을 확인하고 에이전트가 생성한 파일 변경을 병합합니다."
                accent="from-emerald-500/[0.08]"
              />
            </div>
          </Section>

          <Section id="tech-stack" title="Tech Stack">
            <div className="overflow-hidden rounded-xl border border-gray-900/[0.08]">
              <table className="w-full text-left text-[13.5px]">
                <thead>
                  <tr className="border-b border-gray-900/[0.06] bg-gray-900/[0.03] text-gray-900/45">
                    <th className="px-4 py-2.5 font-medium">영역</th>
                    <th className="px-4 py-2.5 font-medium">스택</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-900/[0.05]">
                  {[
                    ["Monorepo", "npm workspaces, Turborepo"],
                    ["Web", "Next.js 16, React 19, TypeScript, Tailwind CSS, Vitest"],
                    ["Server", "NestJS 11, TypeScript, Socket.IO, TypeORM"],
                    ["Database", "better-sqlite3 기반 SQLite"],
                    ["CLI", "Commander, TypeScript"],
                    ["Tests", "Vitest, Jest"],
                  ].map(([area, stack]) => (
                    <tr key={area}>
                      <td className="px-4 py-2.5 font-medium text-gray-900/75">
                        {area}
                      </td>
                      <td className="px-4 py-2.5 text-gray-900/55">{stack}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Section>

          <Section id="agents" title="에이전트 세션">
            <p>
              Claude Code, Gemini CLI, Codex CLI 각각에 대해 인증 상태를 확인하고
              세션을 시작할 수 있습니다. 인증은 OAuth 디바이스 로그인 또는 API
              키 저장 방식을 지원하며, 에이전트를 하나 이상 인증해야 채팅을
              시작할 수 있습니다.
            </p>
            <p>
              각 세션의 대화는 SQLite에 저장되어 서버 재시작 후에도 이어서 작업할
              수 있습니다.
            </p>
          </Section>

          <Section id="tasks" title="멀티 에이전트 태스크">
            <p>
              태스크는 요구사항(requirements)과 역할 배정(role assignments)으로
              구성됩니다. 여러 에이전트에게 역할을 나눠 하나의 작업을 협업으로
              수행하게 할 수 있으며, 실행 출력은 Socket.IO를 통해 실시간으로
              웹에 스트리밍됩니다.
            </p>
            <p>
              실행 이력(run history)이 보존되므로 각 실행의 결과를 비교하고
              재실행할 수 있습니다.
            </p>
          </Section>

          <Section id="harness" title="하네스 프롬프트">
            <p>
              역할별 하네스 프롬프트(per-role harness prompt)를 설정하면 에이전트
              실행 시 자동으로 주입됩니다. 예를 들어 리뷰어 역할에는 코드 리뷰
              기준을, 구현 역할에는 코드 스타일 규칙을 정의해 둘 수 있습니다.
            </p>
            <p>
              하네스 설정 파일은 <InlineCode>~/.ji/harness/</InlineCode> 아래에
              저장됩니다.
            </p>
          </Section>

          <Section id="changelog" title="변경사항 병합">
            <p>
              에이전트가 생성한 파일 변경은 곧바로 작업 디렉토리에 반영되지 않고
              changelog로 기록됩니다. 웹 UI에서 diff를 검토한 뒤 선택적으로
              병합할 수 있어, 에이전트 출력에 대한 안전한 리뷰 게이트 역할을
              합니다. 격리 실행을 위한 worktree는{" "}
              <InlineCode>~/.ji/worktrees/</InlineCode>에 생성됩니다.
            </p>
          </Section>

          

          <Section id="jccli-check" title="jccli check">
            <p>
              현재 환경이 JC-CLI 실행 조건을 만족하는지 점검합니다. Node 버전,
              에이전트 CLI 설치 및 인증 상태, <InlineCode>~/.ji</InlineCode>{" "}
              런타임 디렉토리 상태를 확인합니다.
            </p>
            <CodeBlock title="terminal">{`jccli check`}</CodeBlock>
          </Section>

          <Section id="structure" title="프로젝트 구조">
            <CodeBlock title="repository">{`.
├── apps/
│   ├── web/                 # Next.js 프론트엔드
│   └── server/              # NestJS 백엔드
├── packages/
│   ├── cli/                 # jccli 초기화·점검 CLI
│   ├── eslint-config/       # 공용 ESLint 설정
│   └── typescript-config/   # 공용 tsconfig preset
├── package.json             # 워크스페이스 스크립트
└── turbo.json               # Turborepo 파이프라인`}</CodeBlock>
            <p>
              웹은 App Router(<InlineCode>src/app</InlineCode>) + 기능별{" "}
              <InlineCode>src/features</InlineCode> 구조이고, 서버 Nest 모듈은
              agents, tasks, sessions, conversations, harness, changelog
              도메인으로 나뉩니다.
            </p>
          </Section>

          <Section id="scripts" title="스크립트">
            <p>저장소 루트에서 실행하며, Turborepo가 각 워크스페이스의 스크립트를 실행합니다.</p>
            <CodeBlock title="terminal">{`npm run dev          # 전체 개발 서버
npm run build        # 빌드
npm run lint         # 린트
npm run test         # 테스트
npm run format       # 포맷

# 앱별 실행
npm run dev --workspace=@ji/web
npm run dev --workspace=@ji/server`}</CodeBlock>
          </Section>

          <Section id="runtime" title="런타임 경로">
            <p>
              SQLite 데이터와 로컬 런타임 파일은 모두{" "}
              <InlineCode>~/.ji</InlineCode> 아래에 저장됩니다.
            </p>
            <CodeBlock title="~/.ji">{`~/.ji/
├── ji.db                # SQLite 데이터베이스
├── logs/server.log      # 서버 로그
├── worktrees/           # 태스크 격리 실행용 worktree
├── harness/             # 역할별 하네스 프롬프트
└── agents/
    ├── gemini/
    └── codex/`}</CodeBlock>
          </Section>

          {/* 푸터 */}
          <footer className="mt-4 flex items-center justify-between pt-8 text-[12px] text-gray-900/30">
            <span>© 2026 전지창 · JC-CLI Documentation</span>
            <Link to="/" className="transition-colors hover:text-gray-900/60">
              포트폴리오로 돌아가기 →
            </Link>
          </footer>
        </main>
      </div>
    </div>
  );
}
