import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-scroll'
import { Menu, X } from 'lucide-react'

const navItems = [
    { name: 'Home', to: 'hero' },
    { name: 'About', to: 'about' },
    { name: 'Experience', to: 'experience' },
    { name: 'Projects', to: 'projects' },
    { name: 'Skills', to: 'skills' },
    { name: 'Contact', to: 'contact' },
]

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5 }}
            className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
                isScrolled ? 'bg-dark-bg/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="hero" smooth duration={500} className="cursor-pointer">
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            className="text-2xl font-bold bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent"
                        >
                            JICHANG JEON
                        </motion.div>
                    </Link>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                smooth
                                duration={500}
                                spy
                                activeClass="text-blue-500"
                                className="text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="md:hidden text-white"
                    >
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="md:hidden bg-dark-card border-t border-dark-border"
                >
                    <div className="px-4 py-4 space-y-3">
                        {navItems.map((item) => (
                            <Link
                                key={item.to}
                                to={item.to}
                                smooth
                                duration={500}
                                onClick={() => setIsMobileMenuOpen(false)}
                                className="block text-gray-300 hover:text-white cursor-pointer transition-colors duration-200"
                            >
                                {item.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </motion.nav>
    )
}