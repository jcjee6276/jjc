import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Mail, Github, Linkedin, Phone, MapPin } from 'lucide-react'

const contactInfo = [
    {
        icon: <Mail size={24} />,
        label: 'Email',
        value: 'lifemeans@naver.com',
        link: '',
    },
    {
        icon: <Github size={24} />,
        label: 'GitHub',
        value: 'github.com/jcjee6276',
        link: 'https://github.com/jcjee6276',
    },
    {
        icon: <Linkedin size={24} />,
        label: 'LinkedIn',
        value: '전지창',
        link: 'https://linkedin.com/in/지창-전-2b4440294/',
    },
    {
        icon: <Phone size={24} />,
        label: 'KakaoTalk Open Profile',
        value: '지창',
        link: 'https://open.kakao.com/o/sG8O2sWe',
    },
]

export default function Contact() {
    const ref = useRef(null)
    const isInView = useInView(ref, { once: true, margin: "-100px" })

    return (
        <section id="contact" className="min-h-screen flex items-center py-20 px-4">
            <div className="max-w-4xl mx-auto w-full">
                <motion.div
                    ref={ref}
                    initial={{ opacity: 0, y: 50 }}
                    animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              Contact
            </span>
                    </h2>
                    <p className="text-gray-500 text-center mb-16">언제든 연락주세요</p>

                    <div className="grid md:grid-cols-2 gap-6 mb-12">
                        {contactInfo.map((info, index) => (
                            <motion.a
                                key={index}
                                href={info.link}
                                target={info.link.startsWith('http') ? '_blank' : undefined}
                                rel={info.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                                initial={{ opacity: 0, y: 30 }}
                                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                className="flex items-center gap-4 p-6 bg-dark-card border border-dark-border rounded-xl hover:border-blue-500/50 hover:scale-105 transition-all duration-300"
                            >
                                <div className="text-blue-500">{info.icon}</div>
                                <div>
                                    <div className="text-sm text-gray-500 mb-1">{info.label}</div>
                                    <div className="text-gray-300 font-medium">{info.value}</div>
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {/* CTA */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        className="text-center p-8 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/30 rounded-2xl"
                    >
                        <h3 className="text-2xl font-bold mb-4">저에 대해서 궁금하신가요?</h3>
                        <p className="text-gray-400 mb-6">
                            언제든 편하게 연락주세요!
                        </p>
                        <a
                            href="https://open.kakao.com/o/sG8O2sWe"
                            className="inline-block px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full hover:scale-105 transition-transform duration-200 font-semibold"
                        >
                            오픈 채팅방 입장하기
                        </a>
                    </motion.div>

                    {/* Footer */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ duration: 0.6, delay: 0.8 }}
                        className="mt-16 pt-8 border-t border-dark-border text-center text-gray-500 text-sm"
                    >
                        <p>© 2025 전지창. All rights reserved.</p>
                        <p className="mt-2">Made with React, Tailwind CSS & Framer Motion</p>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}