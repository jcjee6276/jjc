import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const skillCategories = [
    {
        category: 'Frontend',
        skills: [
            { name: 'React' },
            { name: 'TypeScript' },
            { name: 'JavaScript' },
            { name: 'HTML/CSS' },
            { name: 'Tailwind CSS' },
            { name: 'Redux' },
            { name: 'Zustand' },
            { name: 'React Query' },
            { name: 'FSD Architecture' },
        ],
    },
    {
        category: 'Testing',
        skills: [
            { name: 'Vitest', level: 70 },
            { name: 'React Testing Library', level: 65 },
            { name: 'play wright', level: 60 },
            { name: 'Mock Service Worker', level: 65 },
        ],
    },
]

export default function Skills() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="skills" className="min-h-screen flex items-center py-20 px-4 bg-dark-card/30">
            <div className="max-w-6xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Skills
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-16">기술 스택</p>

                    <div className="grid md:grid-cols-2 gap-8">
                        {skillCategories.map((category, catIndex) => (
                            <motion.div
                                key={catIndex}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: catIndex * 0.1 }}
                                className="bg-dark-card border border-dark-border rounded-xl p-6"
                            >
                                <h3 className="text-xl font-bold mb-6 text-blue-400">
                                    {category.category}
                                </h3>

                                <div className="flex flex-wrap gap-2">
                                    {category.skills.map((skill, skillIndex) => (
                                        <div className="inline-flex gap-2" >
                                            <div key={skillIndex} className="inline-flex gap-2 justify-between items-center">
                                                <span className="text-gray-300 px-5 py-1 text-sm bg-gradient-to-r from-blue-500 to-purple-400 rounded-full">{skill.name}</span>
                                                {/*<span className="text-sm text-gray-500">{skill.level}%</span>*/}
                                            </div>
                                            {/*<div className="h-2 bg-dark-bg rounded-full overflow-hidden">*/}
                                            {/*    <motion.div*/}
                                            {/*        initial={{ width: 0 }}*/}
                                            {/*        animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}*/}
                                            {/*        transition={{ duration: 1, delay: catIndex * 0.1 + skillIndex * 0.05 }}*/}
                                            {/*        className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"*/}
                                            {/*    />*/}
                                            {/*</div>*/}
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Additional Info */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="mt-12 p-6 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-xl"
                    >
                        <h3 className="text-lg font-bold mb-3 text-center">관심 분야</h3>
                        <p className="text-gray-400 text-center">
                            테스트 주도 개발(TDD), 함수형 프로그래밍, AI를 이용한 테스트 및 문서화 Code Generator
                        </p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}