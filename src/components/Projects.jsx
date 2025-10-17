import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ExternalLink, Github, TrendingDown, Clock } from 'lucide-react'

const projects = [
    {
        title: '아워홈 물류 키오스크',
        period: '2025.07 ~ 2025.09',
        description: '물류 센터 프로세스 처리 키오스크 개발',
        challenge: '물류 센터 업무를 처리하는 키오스크로 첫 리딩을 맡아 진행 했으며 ' +
            'storybook, vitest를 첫 도입하여 기능 및 UI 수정 시 유지보수 비용을 향상시켰습니다.',
        solution: [
            '전체 파이프라인 재설계: Canvas → Image → PDF → Spool 방식 폐기',
            '서버에서 HTML 템플릿 사전 로딩, React는 데이터만 전송',
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
    },
    {
        title: '멀티플랫폼 POS 개발',
        period: '2024.09~2025.06',
        description: 'Window / Android 두 가지 플랫폼에서 사용 가능한 POS 개발',
        challenge: '프로젝트 확장에 따라 증가하는 Page와 Modal을 효율적으로 관리하기 위해 Feature-Sliced Design 아키텍처를 도입했습니다. ' +
            '기능과 엔티티별로 API, UI, 로직을 계층적으로 분리하여 코드 구조를 체계화하고, 팀 협업 효율성과 유지보수성을 크게 개선했습니다.',
        solution: [
            '전체 파이프라인 재설계: Canvas → Image → PDF → Spool 방식 폐기',
            '서버에서 HTML 템플릿 사전 로딩, React는 데이터만 전송',
            'PDF를 PCL 형식으로 변환하여 프린터 처리 속도 향상',
            'Java print library 대신 winspool.drv 직접 호출',
            '윈도우 스풀러 우회하여 프린터 직접 전송',
        ],
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Zustand', 'React-query', 'typescript'],
        metrics: [
            { label: '출력 속도 개선', value: '70%', icon: <TrendingDown size={20} /> },
            { label: '최종 출력 시간', value: '7~8초', icon: <Clock size={20} /> },
        ],
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
        result: '7~8초로 목표 달성, 원본 디자인 유지, 추가 비용 없이 프로젝트 성공',
        tech: ['React', 'Zustand', 'React-query', 'typescript'],
        metrics: [
            { label: '출력 속도 개선', value: '70%', icon: <TrendingDown size={20} /> },
            { label: '최종 출력 시간', value: '7~8초', icon: <Clock size={20} /> },
        ],
    },
]

export default function Projects() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [expandedProject, setExpandedProject] = useState(0)

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
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, y: 30}}
                                    animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                                    transition={{duration: 0.6, delay: index * 0.2}}
                                    className="bg-dark-card border border-dark-border rounded-2xl overflow-hidden hover:border-blue-500/50 transition-all duration-300"
                                >
                                    {/* Header */}
                                    <div className="p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10">
                                        <div className="flex items-start justify-between mb-4">
                                            <div>
                                                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                                                <span className="text-sm text-gray-400">{project.period}</span>
                                            </div>
                                        </div>
                                        <p className="text-gray-300">{project.description}</p>
                                    </div>

                                    {/* Metrics */}
                                    {/*<div className="grid grid-cols-2 gap-4 p-6 bg-dark-bg/50">*/}
                                    {/*    {project.metrics.map((metric, i) => (*/}
                                    {/*        <div key={i}*/}
                                    {/*             className="flex items-center gap-3 p-4 bg-dark-card rounded-lg">*/}
                                    {/*            <div className="text-blue-500">{metric.icon}</div>*/}
                                    {/*            <div>*/}
                                    {/*                <div*/}
                                    {/*                    className="text-2xl font-bold text-blue-500">{metric.value}</div>*/}
                                    {/*                <div className="text-sm text-gray-400">{metric.label}</div>*/}
                                    {/*            </div>*/}
                                    {/*        </div>*/}
                                    {/*    ))}*/}
                                    {/*</div>*/}

                                    {/* Content */}
                                    <div className="p-6">
                                        {/* Challenge */}
                                        <div className="mb-6">
                                            <h4 className="text-lg font-semibold text-red-400 mb-2">상세</h4>
                                            <p className="text-gray-400 leading-relaxed">{project.challenge}</p>
                                        </div>

                                        {/* Solution */}
                                        {/*<div className="mb-6">*/}
                                        {/*    <h4 className="text-lg font-semibold text-blue-400 mb-3">💡 해결 방법</h4>*/}
                                        {/*    <ul className="space-y-2">*/}
                                        {/*        {project.solution.map((item, i) => (*/}
                                        {/*            <li key={i} className="flex items-start gap-2 text-gray-400">*/}
                                        {/*                <span className="text-blue-500 mt-1">→</span>*/}
                                        {/*                <span>{item}</span>*/}
                                        {/*            </li>*/}
                                        {/*        ))}*/}
                                        {/*    </ul>*/}
                                        {/*</div>*/}

                                        {/* Result */}
                                        {/*<div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-lg">*/}
                                        {/*    <h4 className="text-lg font-semibold text-green-400 mb-2">✅ 결과</h4>*/}
                                        {/*    <p className="text-gray-300">{project.result}</p>*/}
                                        {/*</div>*/}

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
                            ))}
                        </div>
                        </div>
                </motion.div>
            </div>
        </section>
    )
}