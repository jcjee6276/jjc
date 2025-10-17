import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Code, Zap, Target } from 'lucide-react'

const features = [
    {
        icon: <Code size={24} />,
        title: '성능 최적화',
        description: '프린터 출력 속도 70% 개선 등 사용자 경험 향상에 집중합니다',
    },
    {
        icon: <Zap size={24} />,
        title: '문제 해결',
        description: '근본 원인을 파고들어 창의적인 해결책을 찾아냅니다',
    },
    {
        icon: <Target size={24} />,
        title: '품질 책임',
        description: 'TDD와 E2E 테스트를 통해 안정적인 코드를 작성합니다',
    },
]

export default function About() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

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
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                                className="p-6 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/50 transition-all duration-300"
                            >
                                <div className="text-blue-500 mb-4">{feature.icon}</div>
                                <h4 className="text-xl font-bold mb-2">{feature.title}</h4>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}