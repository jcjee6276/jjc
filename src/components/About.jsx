import {AnimatePresence, motion} from 'framer-motion'
import { useInView } from 'framer-motion'
import {useEffect, useRef, useState} from 'react'
import {Code, Zap, Target, X} from 'lucide-react'

const features = [
    {
        icon: <Code size={24} />,
        title: '성능 최적화',
        description: 'UI/Logic 분리, Vite 번들러 도입',
        detail: true,
        link: 'https://www.notion.so/29480a7066de80a086edcc1607917fab?source=copy_link',
        linkName: '디자인 패턴 설계 회고',
        details: [
            {
                subtitle: "UI/Logic 분리를 위해 Atomic Design + Data Fetching Layer 기반의 계층적 컴포넌트를 설계",
                content: "React Query Custom Hook으로 데이터 로직을 캡슐화하고" +
                    "Figma MCP를 사용하여 Atomic 단위로 UI를 Presentation Pattern으로 Code Generate 이후 Layout Layer에서 구조 정의 및 React query 상태에 맞게 조합\n" +
                    "Named Export를 통해 IDE의 자동완성과 타입 추론을 강화하고, 각 Layout Layer 컴포넌트를 독립적으로 Storybook 문서화\n",
                result: "· 컴포넌트 재 사용률 향상, Storybook 스토리 작성 시간 단축 및 러닝 커브 완화"
            },
            {
                subtitle: "Webpack → Vite 마이그레이션으로 개발 생산성 향상",
                content: "기존 Webpack 번들러의 느린 빌드 속도로 인한 개발 병목을 해결하기 위해 Vite로 마이그레이션\n " +
                    "Vite의 ESM 기반 개발 서버와 esbuild를 활용한 사전 번들링으로 개발 환경 구동 시간을 대폭 단축",
                result: "· 프로덕션 빌드 시간 30초 → 5초 이내로 개선, HMR(Hot Module Replacement) 속도 2초 → 0.2초로 개발 경험 향상"
            }
        ]
    },
    {
        icon: <Zap size={24} />,
        title: '문제 해결',
        description: '근본 원인을 파고 들어 해결책을 찾아냅니다',
        detail: true,
        problem: true,
        details: [
            {
                subtitle: '키오스크 프린터 출력물 속도 개선',
                content: '프로젝트 오픈 직전, 고객사로부터 "프린터 출력 속도가 개선되지 않으면 전국 센터 오픈 불가" 통보를 받았습니다.' +
                    '기존 출력 시간은 16~20초로, 고객사 요구사항인 6~8초에 크게 미달하는 상황이었습니다.\n\n' +
                    '[기존 시도] 사내 미드급 서버 개발자와 시니어 과장님이 2주간 14가지 방법으로 개선을 시도했으나 10~12초까지만 단축되었고,' +
                    '그 마저도 CSS 최소화, 폰트 제거 등 출력물 디자인 변경이 불가피한 상황이었습니다. ' +
                    '내부 회의에서 하드웨어 스펙업(비용 증가)으로 방향이 정해지고 있었습니다.\n\n' +
                    '하지만 비용 증가 없이 문제를 해결하고자 업무 시간 외에도 문제를 분석하여 출력물 변경 없이 고객사 요구사항에 맞게' +
                    '출력물 속도를 개선하여 프로젝트를 마무리 지었습니다.',
                result: '비용을 정산 받으며 프로젝트 마무리, 이후 운영상 기능 장애 없이 안정적인 운영'

            },
            {
                subtitle: '통합 테스트 날에 전반적인 프로세스 수정',
                content: '통합 테스트 첫날, 고객사 내부 회의로 전반적인 프로세스가 변경되면서 ' +
                    '대규모 로직 및 UI 수정이 필요한 상황 발생.\n ' +
                    '78개 테스트 케이스 중 18개만 통과한 좋지 않은 상황이었습니다. 고객사에 상주하며\n\n' +
                    '1일차: 78건 중 18건 PASS (23%)\n' +
                        '2일차: 79건 중 45건 PASS (57%)\n' +
                    '3일차: 80건 중 70건 PASS (88%)\n' +
                    '4일차: 80건 중 78건 PASS (98%)\n\n' +

                '이후 간헐적인 요구사항 변경에도 지속적인 커뮤니케이션과 빠른 대응으로 ' +
                    '예정된 오픈 일정에 맞춰 프로젝트 완료했습니다.',
                result: '4일 만에 테스트 통과율 23% → 98% 달성.'
            }
        ]
    },
    {
        icon: <Target size={24} />,
        title: '품질 책임',
        description: '테스트 코드 작성 및 프로젝트 문서화 적용',
        detail: true,
        details: [
            {
                subtitle: 'Vitest, Storybook 도입',
                content: 'Vitest로 테스트 기반 코드 작성하고 UI 문서화를 위해 Storybook 적용',
                result: '테스트 기반 코드로 기능의 안정성과 UI 문서화를 통해 팀원간 공통 컴포넌트 공유 용이'
            }
        ]
    },
]



export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })
    const [isHovering, setIsHovering] = useState(null)
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
        <section id="about" className="min-h-screen flex items-center py-20 px-4">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              About Me
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-16">저를 소개합니다</p>

                    <div className="grid md:grid-cols-2 gap-12 mb-16">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">전반적인 IT 기술에 관심</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                프론트엔드를 중심으로 백엔드, 시스템, 하드웨어까지 폭 넓은 기술 스택에 관심을 가지고 있습니다.
                                이러한 다각적인 시각은 복잡한 문제를 해결 하는 데 큰 강점이 된다고 생각 합니다.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                이런 생각을 바탕으로 인하여 처음 리드한 물류 키오스크 프로젝트에서는 React부터 서버, 프린터 드라이버, 윈도우 시스템까지
                                전체 파이프라인을 분석하여 획기적인 성능 개선을 이뤄냈습니다.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, x: 50 }}
                            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                        >
                            <h3 className="text-2xl font-bold mb-4">테스트와 품질 중시</h3>
                            <p className="text-gray-400 leading-relaxed mb-4">
                                프로젝트 후 부족한 부분을 복기하며 테스트의 중요성을 깊이 깨달았습니다.
                                현재는 TDD, E2E 테스트 방법론을 학습하고 있으며,
                                테스트 작성이 용이한 함수형 프로그래밍에 관심을 가지고 있습니다.
                            </p>
                            <p className="text-gray-400 leading-relaxed">
                                단순히 기능을 구현하는 것을 넘어,
                                유지보수 가능하고 안정적인 코드를 작성하는 것을 목표로 합니다.
                            </p>
                        </motion.div>
                    </div>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-6">
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                initial={{opacity: 0, y: 30}}
                                onClick={() => setActiveModal(index)}
                                onMouseEnter={() => setIsHovering(index)}
                                onMouseLeave={() => setIsHovering(null)}
                                animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 30}}
                                transition={{duration: 0.6, delay: 0.6 + index * 0.1}}
                                className="relative p-6 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/50 transition-all duration-300 overflow-hidden"
                            >
                                {feature.detail && isHovering === index && (
                                    <motion.div
                                        initial={{opacity: 0}}
                                        animate={{opacity: 1}}
                                        className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center rounded-xl"
                                    >
                                        <div className="text-center">
                                            <div className="text-white text-lg font-semibold mb-2">상세 내용 보기</div>
                                        </div>
                                    </motion.div>
                                )}
                                <div className='flex justify-between'>
                                    <div className="text-blue-500 mb-4">{feature.icon}</div>
                                    <div
                                        className="flex px-2 text-center items-center py-1 bg-blue-500/20 text-blue-400 rounded-full text-xs font-semibold">
                                        상세보기
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
            <AnimatePresence>
            {activeModal !== null && (
                    <AboutModal
                        feature={features[activeModal]}
                        onClose={()=> setActiveModal(null)}
                    />
                )}
            </AnimatePresence>
                        </section>
    )
}

function AboutModal({feature, onClose}) {
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
                    <div className='flex justify-between gap-4'>
                        <h3 className="text-2xl font-bold">{feature.title}</h3>
                        {feature.link && ( <a
                            href={feature.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-2xl font-bold text-blue-600 inline-flex items-center gap-2 group relative"
                        >
  <span className="relative">
    {feature.linkName}
      <span
          className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
  </span>
                            <svg
                                className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1 "
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                />
                            </svg>
                        </a> )}
                    </div>


                    <button
                        onClick={onClose}
                        className="p-2 hover:bg-dark-bg rounded-full transition-colors"
                    >
                        <X size={24}/>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">

                    {/* Challenge */}
                    {feature.problem && (
                        <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-lg">
                            <h4 className="text-lg font-semibold text-red-400 mb-2">⚠️ 문제 상황</h4>

                            {feature.details.map((item, index) => (
                                <p className="text-gray-300">· {item.subtitle}</p>
                        ))}
                        </div>

                )}


                    {/* Technical Deep Dive */}
                    {!feature.problem && (
                        <div>
                            <h4 className="text-lg font-semibold text-purple-400 mb-3">기술적 내용</h4>
                            <ul className="space-y-3">
                                {feature.details.map((item, i) => (
                                    <li key={i} className="flex items-start gap-3 text-gray-400">
                                        <span className="text-purple-500 mt-1 font-bold">{i + 1}.</span>
                                        <span>{item.subtitle}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}


                    {/* Solution */}
                    <div>
                        <h4 className="text-lg font-semibold text-blue-400 mb-3">상세 내용</h4>
                        <ul className="space-y-2">
                            {feature.details.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-gray-400">
                                    <span className="text-blue-500 mt-1">→</span>
                                    <span className="whitespace-pre-wrap">{item.content}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                     {/*Impact*/}
                    <div className="p-4 bg-green-500/10 border border-green-500/30 rounded-lg">
                        <h4 className="text-lg font-semibold text-green-400 mb-2 ">📊 결과</h4>
                        {/*<p className="text-gray-300 mb-3 whitespace-pre-wrap">{project.detailContent.impact}</p>*/}
                        <div className="grid grid-cols-1 gap-4">
                            {feature.details.map((metric, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    {/*<div className="text-green-500">{metric.icon}</div>*/}
                                    <div>
                                        <div className="text-xl font-bold text-green-400">{metric.result}</div>
                                        {/*<div className="text-sm text-gray-400">{metric.title}</div>*/}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </motion.div>
        </motion.div>
    )
}