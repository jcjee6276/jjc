import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
    {
        period: '2024.04 - 현재',
        company: '아이엠티소프트',
        position: '프론트엔드 개발자',
        description: '물류 키오스크 프로젝트 등 다양한 프로젝트 참여',
        achievements: [
            '프린터 출력 속도 70% 개선 (16~20초 → 7~8초)',
            '윈도우 스풀러 우회 방식으로 시스템 레벨 최적화',
            'React 기반 키오스크 UI 개발 및 유지보수',
            '테스트 코드 작성 및 리팩토링',
        ],
    },
]

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="experience" className="min-h-screen flex items-center py-20 px-4 bg-dark-card/30">
            <div className="max-w-4xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Experience
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-16">경력 사항</p>

                    <div className="space-y-8">
                        {experiences.map((exp, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: -50 }}
                                animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                                transition={{ duration: 0.6, delay: index * 0.2 }}
                                className="relative pl-8 border-l-2 border-blue-500"
                            >
                                {/* Timeline dot */}
                                <div className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[9px]" />

                                <div className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                                    <div className="flex flex-wrap items-center gap-2 mb-2">
                                        <Calendar size={16} className="text-blue-500" />
                                        <span className="text-sm text-gray-400">{exp.period}</span>
                                    </div>

                                    <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>

                                    <div className="flex items-center gap-2 mb-4">
                                        <Briefcase size={16} className="text-gray-500" />
                                        <span className="text-gray-400">{exp.position}</span>
                                    </div>

                                    <p className="text-gray-400 mb-4">{exp.description}</p>

                                    <div className="space-y-2">
                                        <h4 className="font-semibold text-blue-500 mb-2">주요 성과</h4>
                                        <ul className="space-y-2">
                                            {exp.achievements.map((achievement, i) => (
                                                <li key={i} className="flex items-start gap-2 text-gray-400">
                                                    <span className="text-blue-500 mt-1">•</span>
                                                    <span>{achievement}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    )
}