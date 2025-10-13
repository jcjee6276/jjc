import { motion } from 'framer-motion'
import { ChevronDown, Github, Linkedin, Mail } from 'lucide-react'
import { Link } from 'react-scroll'

export default function Hero() {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    }

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    }

    return (
        <section id="hero" className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />

            {/* Animated circles */}
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
            />
            <motion.div
                animate={{
                    scale: [1.2, 1, 1.2],
                    rotate: [90, 0, 90],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "linear"
                }}
                className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl"
            />

            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative z-10 max-w-4xl mx-auto px-4 text-center"
            >
                <motion.div variants={itemVariants} className="mb-4">
                    <span className="text-blue-500 text-sm font-mono">안녕하세요,</span>
                </motion.div>

                <motion.h1
                    variants={itemVariants}
                    className="text-5xl md:text-7xl font-bold mb-6"
                >
          <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            전지창
          </span>
                    입니다
                </motion.h1>

                <motion.p
                    variants={itemVariants}
                    className="text-xl md:text-2xl text-gray-400 mb-4"
                >
                    2년차 프론트엔드 개발자
                </motion.p>

                <motion.p
                    variants={itemVariants}
                    className="text-lg text-gray-500 mb-8 max-w-2xl mx-auto"
                >
                    사용자 경험과 성능 최적화에 집중하며,
                    <br />
                    테스트 주도 개발과 품질에 책임감을 가진 개발자입니다
                </motion.p>

                <motion.div
                    variants={itemVariants}
                    className="flex items-center justify-center gap-4 mb-12"
                >
                    <a
                        href="https://github.com/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-card hover:bg-gray-800 rounded-full transition-colors duration-200"
                    >
                        <Github size={24} />
                    </a>
                    <a
                        href="https://linkedin.com/in/yourusername"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-dark-card hover:bg-gray-800 rounded-full transition-colors duration-200"
                    >
                        <Linkedin size={24} />
                    </a>
                    <a
                        href="mailto:your.email@example.com"
                        className="p-3 bg-dark-card hover:bg-gray-800 rounded-full transition-colors duration-200"
                    >
                        <Mail size={24} />
                    </a>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <Link
                        to="about"
                        smooth
                        duration={500}
                        className="inline-flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full cursor-pointer hover:scale-105 transition-transform duration-200"
                    >
                        더 알아보기
                        <ChevronDown size={20} />
                    </Link>
                </motion.div>
            </motion.div>

            {/* Scroll indicator */}
            <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            >
                <ChevronDown className="text-gray-600" size={32} />
            </motion.div>
        </section>
    )
}