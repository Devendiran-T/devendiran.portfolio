import { motion } from 'framer-motion'
import { personalInfo } from '../constants'
import { FiGithub, FiLinkedin, FiMail, FiDownload, FiArrowDown } from 'react-icons/fi'

const Hero = () => {
  return (
    <section className="relative w-full min-h-screen flex items-center bg-white overflow-hidden pt-20">
      
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-white to-blue-50/30 pointer-events-none" />

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center py-12">
          
          {/* Left - Profile Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative hidden lg:flex items-center justify-center order-1"
          >
            <div className="relative w-full max-w-lg flex items-center justify-center">
              
              {/* Profile Photo - Clean display without any overlays */}
              <div className="w-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src="/profile.jpg" 
                  alt={personalInfo.name}
                  className="w-full h-auto object-cover display-block"
                />
              </div>
            </div>
          </motion.div>

          {/* Right Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-6 order-2"
          >
            {/* Greeting Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-block"
            >
              <span className="inline-block px-4 py-2 bg-blue-50 text-primary text-sm font-medium rounded-full border border-blue-100">
                Welcome to my portfolio
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-black leading-tight text-dark"
            >
              Hi, I'm{' '}
              <span className="gradient-text-blue">
                {personalInfo.name.split(' ')[0]}
              </span>
            </motion.h1>

            {/* Role */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl font-bold text-gray-dark"
            >
              {personalInfo.role.split('|')[0].trim()}
            </motion.h2>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-lg text-gray-600 leading-relaxed max-w-xl"
            >
              {personalInfo.tagline}
            </motion.p>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex flex-wrap gap-6 text-sm text-gray-600"
            >
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>B.Tech AI & Data Science</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>{personalInfo.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-primary rounded-full"></span>
                <span>CGPA: {personalInfo.cgpa}</span>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <a
                href="#contact"
                className="btn-primary flex items-center gap-2"
              >
                <FiMail />
                Get In Touch
              </a>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-outline flex items-center gap-2"
              >
                <FiDownload />
                Download Resume
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="flex gap-4"
            >
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="GitHub"
              >
                <FiGithub size={20} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="LinkedIn"
              >
                <FiLinkedin size={20} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="w-12 h-12 flex items-center justify-center rounded-lg bg-gray-100 text-gray-700 hover:bg-primary hover:text-white transition-all duration-200 shadow-sm hover:shadow-md"
                aria-label="Email"
              >
                <FiMail size={20} />
              </a>
            </motion.div>
          </motion.div>
        </div>

      </div>
    </section>
  )
}

export default Hero
