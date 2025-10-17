import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Briefcase, Calendar } from 'lucide-react'

const experiences = [
    {
        period: '2024.04 - 현재',
        company: '아이엠티소프트',
        position: '프론트엔드 개발자',
        description: '키오스크 및 포스 프로그램 개발 및 유지보수',
        achievements: [
            '아워홈 물류 키오스크 리드 개발',
            '안드로이드 포스 개발',
            '써브웨이 키오스크 유지 보수 및 추가 개발',
            '파파이스 키오스크 유지 보수 및 추가 개발',
            'DIT 식수 시스템 개발'
        ],
    },
    {
        period: '2023.09 - 2023-11',
        company: '밀버스',
        position: '백엔드 개발자',
        description: '데이터를 가공하여 전송하는 중계 서버 개발',
        achievements: [
            '외부 서버에서 json 데이터를 .csv 파일로 변환',
            '.csv 데이터를 python pandas로 요청에 맞게 데이터 가공',
            '위 작업을 정해진 시간 마다 반복하는 Apach Airflow 서버 구축',
            'Apach Airflow 서버와 Gmail, Slack을 연동하여 결과 알림 기능 개발'
        ], 
    },
    {
        period: '2020.04 - 2022-11',
        company: '큐로이드',
        position: '백업 엔지니어',
        description: '백업 솔루션 유지 보수 및 인프라 구축',
        achievements: [
            '고객사에 구축 되어 있는 여러 가지 백업 솔루션 유지 보수',
            '신규 백업 인프라 환경 구축(On-Premise)',
        ],
    }
]

export default function Experience() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="experience" className="min-h-screen flex items-center py-20 px-4 bg-dark-card/30">
            <div className="max-w-4xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{opacity: 0, y: 50}}
                    animate={isInView ? {opacity: 1, y: 0} : {opacity: 0, y: 50}}
                    transition={{duration: 0.6}}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              경력 사항
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-8">프론트엔드 1년 7개월 경력</p>
                    <div className="relative">
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-500"/>

                        <div className="space-y-8">
                            {experiences.map((exp, index) => (
                                <motion.div
                                    key={index}
                                    initial={{opacity: 0, x: -50}}
                                    animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -50}}
                                    transition={{duration: 0.6, delay: index * 0.2}}
                                    className="relative pl-8 border-l-2 border-blue-500"
                                >
                                    {/* Timeline dot */}
                                    <div
                                        className="absolute left-0 top-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[9px]"/>

                                    <div
                                        className="bg-dark-card border border-dark-border rounded-xl p-6 hover:border-blue-500/50 transition-all duration-300">
                                        <div className="flex flex-wrap items-center gap-2 mb-2">
                                            <Calendar size={16} className="text-blue-500"/>
                                            <span className="text-sm text-gray-400">{exp.period}</span>
                                        </div>

                                        <h3 className="text-2xl font-bold mb-1">{exp.company}</h3>

                                        <div className="flex items-center gap-2 mb-4">
                                            <Briefcase size={16} className="text-gray-500"/>
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
                            <motion.div
                                initial={{opacity: 0, x: -50}}
                                animate={isInView ? {opacity: 1, x: 0} : {opacity: 0, x: -50}}
                                transition={{duration: 0.6, delay: experiences.length * 0.2 + 0.2}}
                                className="absolute -left-1.5 bottom-0 w-4 h-4 bg-blue-500 rounded-full -translate-x-[7px] z-10"
                            />
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    )
}