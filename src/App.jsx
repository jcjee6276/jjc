import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'

function App() {
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        setTimeout(() => setIsLoading(false), 1500)
    }, [])

    return (
        <>
            <AnimatePresence>
                {isLoading && (
                    <motion.div
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.5 }}
                        className="fixed inset-0 z-50 flex items-center justify-center bg-dark-bg"
                    >
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 180, 360],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
                        />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isLoading && (
                <div className="relative">
                    <Navbar />
                    <main>
                        <Hero />
                        <About />
                        <Experience />
                        <Projects />
                        <Skills />
                        <Contact />
                    </main>
                </div>
            )}
        </>
    )
}

export default App