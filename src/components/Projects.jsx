import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { TrendingDown, Clock, X } from 'lucide-react'

const projects = [
    {
        title: '물류 키오스크',
        period: '2025.07 ~ 2025.08',
        description: '물류 센터 프로세스 처리 키오스크 개발',
        challenge: '물류 센터 업무를 처리하는 키오스크로 첫 리딩을 맡아 진행 했으며\n' +
            '바코드 스캔(USB, Serial)으로 업무 프로세스 처리\n' +
            '각 물류 센터별 환경 설정\n' +
            '관리자 페이지\n' +
            '프린터 연동과 같은 기능을 개발 했습니다.',
        solution: [
            '전체 파이프라인 재설계: Canvas → Image → PDF → Spool 방식 폐기',
            'Kotlin 서버에서 HTML 템플릿 생성 후 사전 로딩, React는 데이터만 전송하는 로직 작성',
            'PDF를 PCL 형식으로 변환하여 프린터 처리 속도 향상',
            'Java print library 대신 winspool.drv 직접 호출',
            '윈도우 스풀러 우회하여 프린터 직접 전송',
        ],
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Storybook', 'Vitest', 'Windows API', 'Kotlin'],
        metrics: [
            { label: '출력 속도 개선', value: '70%', icon: <TrendingDown size={20} /> },
            { label: '최종 출력 시간', value: '7~8초', icon: <Clock size={20} /> },
        ],
        detail: true,
        detailContent: {
            background: '물류 센터에서 사용되는 키오스크의 프린터 출력 속도가 고객 만족도에 직접적인 영향을 미치는 상황이었습니다.',
            technicalDeepDive: [
                '기존 방식의 병목 지점 분석: Canvas 렌더링 → Image 변환 → 서버 전송 → PDF 생성 각 단계별 소요 시간 측정',
                'PCL(Printer Command Language) 형식 도입으로 프린터가 직접 해석 가능한 명령어로 변환',
                'Windows 스풀러 큐를 거치지 않고 직접 프린터 포트로 데이터 전송하는 low-level 접근',
            ],
            impact: '프로젝트 비용 정산 및 전 물류 센터에 배포하여 프로젝트 마무리',
        }
    },
    {
        title: '멀티플랫폼 POS 개발',
        period: '2024.09~2025.06',
        description: 'Window / Android 두 가지 플랫폼에서 사용 가능한 POS 개발',
        challenge: '프로젝트 확장에 따라 증가하는 Page와 Modal을 효율적으로 관리하기 위해 Feature-Sliced Design 아키텍처를 도입했습니다. ' +
            '기능과 엔티티별로 API, UI, 로직을 계층적으로 분리하여 코드 구조를 체계화하고, 팀 협업 효율성과 유지보수성을 크게 개선했습니다.',
        solution: [
            'FSD 아키텍처를 도입하여 폴더 구조 개선',
            'UI와 Business logic 분리',
        ],
        detail: true,
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Zustand', 'React-query', 'typescript'],
        metrics: [
        ],
        detailContent: {
            background: '기존 레거시 폴더구조(pages/components)에서는 개발이 진행되면서 늘어나는 page와 modal을 관리하기가 너무 벅찼습니다. 특히나 modal의 경우 50개가 넘어가며 특정 모달을 찾기에도 번거로웠습니다.',
            technicalDeepDive: [
                '현 프로젝트 구조를 고려 하여 layers는 app, features, entities, shared 4개의 layer로 구성',
                '도메인, 기능 별 Slice를 구성하고 Segment api , model, ui 생성',
                'ui / business 분리를 위해 Container/Presentaition design pattern 도입',
            ],
            impact: '기능별 독립적인 폴더 구조로 유지보수성과 확장성 개선 \n비즈니스 로직(Container)과 UI(Presentation) 명확히 구분하여 관심사 분리를 통한 코드 가독성 향상 \n코드 재사용성 증대 및 Storybook 연동 용이',
        }
    },
    {
        title: 'DIT 식수 입장관리',
        period: '2025.01~2025.01',
        description: 'DIT 식수 시스템 화면 개발',
        challenge: 'Angular를 이용한 기존 사내 프로젝트에서 UI 전면 변경과 기능 수정 및 기능을 추가 하였습니다. ',
        solution: [
            '전체 파이프라인 재설계: Canvas → Image → PDF → Spool 방식 폐기',
            '서버에서 HTML 템플릿 사전 로딩, React는 데이터만 전송',
            'PDF를 PCL 형식으로 변환하여 프린터 처리 속도 향상',
            'Java print library 대신 winspool.drv 직접 호출',
            '윈도우 스풀러 우회하여 프린터 직접 전송',
        ],
        detail: false,
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Zustand', 'React-query', 'typescript'],
        metrics: [
            { label: '출력 속도 개선', value: '70%', icon: <TrendingDown size={20} /> },
            { label: '최종 출력 시간', value: '7~8초', icon: <Clock size={20} /> },
        ],
    },
    {
        title: '키오스크 운영 및 유지 보수',
        period: '2024.04~ 진행 중',
        description: '써브웨이, 파파이스, 캘리스코 운영 및 유지 보수',
        challenge: '자사 서비스인 키오스크, 파파이스, 캘리스코 등을 운영 했으며, 키오스크 담당이었지만 점차' +
            '업무 이해도가 올라감에 따라 담당 팀원들이 부재 중이거나 다른 업무가 있으면 해당 팀원의 운영 업무를 도와줬습니다.',
        solution: [
            '전체 파이프라인 재설계: Canvas → Image → PDF → Spool 방식 폐기',
            '서버에서 HTML 템플릿 사전 로딩, React는 데이터만 전송',
            'PDF를 PCL 형식으로 변환하여 프린터 처리 속도 향상',
            'Java print library 대신 winspool.drv 직접 호출',
            '윈도우 스풀러 우회하여 프린터 직접 전송',
        ],
        detail: false,
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Zustand', 'React-query', 'typescript'],
        metrics: [
            { label: '출력 속도 개선', value: '70%', icon: <TrendingDown size={20} /> },
            { label: '최종 출력 시간', value: '7~8초', icon: <Clock size={20} /> },
        ],
    },
]


function ProjectModal({ project, onClose }) {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4"
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-dark-card border border-dark-border rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            >
                {/* Header */}
                <div className="sticky top-0 bg-dark-card border-b border-dark-border p-6 flex items-center justify-between z-10">
                    <h3 className="text-2xl font-bold">{project.title}</h3>
                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-dark-bg rounded-full transition-colors"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Challenge */}
                    <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                        <h4 className="text-lg font-semibold text-red-400 mb-2">⚠️ 문제 상황</h4>
                        <p className="text-gray-300">{project.detailContent.background}</p>
                    </div>

                    {/* Technical Deep Dive */}
                    <div>
                        <h4 className="text-lg font-semibold text-purple-400 mb-3">🔧 기술적 상세</h4>
                        <ul className="space-y-3">
                            {project.detailContent.technicalDeepDive.map((item, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-400">
                                    <span className="text-purple-500 mt-1 font-bold">{i + 1}.</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>


                    {/* Solution */}
                    <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">💡 해결 방법</h4>
                        <ul className="space-y-2">
                            {project.solution.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-400">
                                    <span className="text-blue-500 mt-1">→</span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Impact */}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-400 mb-2 ">📊 영향</h4>
                        <p className="text-gray-300 mb-3 whitespace-pre-wrap">{project.detailContent.impact}</p>
                        <div className="grid grid-cols-2 gap-4">
                            {project.metrics.map((metric, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="text-green-500">{metric.icon}</div>
                                    <div>
                                        <div className="text-2xl font-bold text-green-400">{metric.value}</div>
                                        <div className="text-sm text-gray-400">{metric.label}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">기술 스택</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
                                >
                  {tech}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    )
}

function ProjectCard({ project, index, isInView, onOpenModal  }) {
    const [isHovering, setIsHovering] = useState(false)
    const [progress, setProgress] = useState(0)
    const [isClick, setIsClick] = useState(false)

    const timerRef = useRef(null)

    useEffect(() => {
        if (isHovering && project.detail) {
            const startTime = Date.now()
            const duration = 1500 // 1.5초

            timerRef.current = setInterval(() => {
                const elapsed = Date.now() - startTime
                const newProgress = Math.min((elapsed / duration) * 100, 100)
                setProgress(newProgress)

                if (newProgress >= 100 || isClick) {
                    clearInterval(timerRef.current)
                    onOpenModal() // 부모 컴포넌트의 모달 열기 함수 호출
                    setIsHovering(false)
                    setProgress(0)
                }
            }, 16) // ~60fps

            return () => {
                if (timerRef.current) {
                    clearInterval(timerRef.current)
                }
            }
        } else {
            if (timerRef.current) {
                clearInterval(timerRef.current)
            }
            setProgress(0)
        }
    }, [isHovering, project.detail, onOpenModal])

    const handleMouseEnter = () => {
        if (project.detail) {
            setIsHovering(true)
        }
    }

    const handleMouseLeave = () => {
        setIsHovering(false)
    }

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300 relative"
            >
                {/* Hover Progress Bar */}
                {project.detail && (
                    <div className="absolute top-0 left-0 right-0 h-1 bg-dark-bg overflow-hidden z-20">
                        <motion.div
                            className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
                            style={{ width: `${progress}%` }}
                            transition={{ duration: 0.016 }}
                        />
                    </div>
                )}

                {/* Hover Overlay */}
                {project.detail && isHovering && (
                    <motion.div
                        onClick={onOpenModal}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 z-10 flex items-center justify-center"
                    >
                        <div className="text-center" >
                            <div className="text-white text-lg font-semibold mb-2">상세 내용 보기</div>
                        </div>
                    </motion.div>
                )}

                {/* Header */}
                <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                    <div className="flex items-start justify-between mb-4">
                        <div>
                            <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                            <span className="text-sm text-gray-400">{project.period}</span>
                        </div>
                        {project.detail && (
                            <div className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                                상세보기 가능
                            </div>
                        )}
                    </div>
                    <p className="text-gray-300">{project.description}</p>
                </div>

                {/* Content */}
                <div className="p-6">
                    {/* Challenge */}
                    <div className="mb-6">
                        <h4 className="text-lg font-semibold text-red-400 mb-2">프로젝트 내용</h4>
                        <p className="text-gray-400 leading-relaxed whitespace-pre-wrap">{project.challenge}</p>
                    </div>

                    {/* Tech Stack */}
                    <div>
                        <h4 className="text-sm font-semibold text-gray-500 mb-2">기술 스택</h4>
                        <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, i) => (
                                <span
                                    key={i}
                                    className="px-3 py-1 text-sm bg-blue-500/20 text-blue-400 rounded-full"
                                >
                  {tech}
                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [activeModal, setActiveModal] = useState(null)

    useEffect(() => {
        if(activeModal !== null) {
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.body.style.overflow = '';
        }
    }, [activeModal]);

    return (
        <section id="projects" className="min-h-screen flex items-center py-20 px-4">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Projects
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-16">주요 프로젝트</p>

                    <div className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            {projects.map((project, index) => (
                                <ProjectCard
                                    key={index}
                                    project={project}
                                    index={index}
                                    isInView={isInView}
                                    onOpenModal={() => setActiveModal(index)}
                                />
                            ))}
                        </div>
                    </div>
                </motion.div>

                <AnimatePresence>
                    {activeModal !== null && (
                        <ProjectModal
                            project={projects[activeModal]}
                            onClose={() => setActiveModal(null)}
                        />
                    )}
                </AnimatePresence>
            </div>
        </section>
    )
}