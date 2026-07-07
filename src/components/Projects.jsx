import { motion } from 'framer-motion'
import { projects } from '../constants'
import { FiGithub, FiExternalLink } from 'react-icons/fi'

const ProjectCard = ({ project, index }) => {
  const getProjectIcon = (index) => {
    switch(index) {
      case 0: return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      )
      case 1: return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
      case 2: return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      )
      default: return (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative group"
    >
      {/* Decorative corner accents - more visible */}
      <div className="absolute -top-2 -left-2 w-10 h-10 border-t-3 border-l-3 border-primary rounded-tl-xl transition-all"></div>
      <div className="absolute -bottom-2 -right-2 w-10 h-10 border-b-3 border-r-3 border-secondary rounded-br-xl transition-all"></div>
      
      <div className="card p-6 hover:shadow-card-hover transition-all duration-300 border border-blue-200 bg-gradient-to-br from-blue-100/80 to-white/40 h-full">
        {/* Project Header with Icon */}
        <div className="flex items-start justify-between mb-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
            {getProjectIcon(index)}
          </div>
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noreferrer"
            className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-primary hover:text-white transition-all"
            aria-label="View source code"
          >
            <FiGithub size={18} />
          </a>
        </div>

        {/* Project Title */}
        <h3 className="text-xl font-bold text-dark mb-3 group-hover:text-primary transition-colors">
          {project.name}
        </h3>

        {/* Project Description */}
        <p className="text-gray-600 text-sm leading-relaxed mb-4">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag.name}
              className="badge badge-blue text-xs"
            >
              {tag.name}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <a
            href={project.source_code_link}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium"
          >
            <FiGithub size={16} />
            View Code
          </a>
          {project.live_link && (
            <a
              href={project.live_link}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors text-sm font-medium"
            >
              <FiExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const Projects = () => {
  return (
    <section id="projects" className="section-gray">
      <div className="container-custom">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-heading text-primary">My Work</p>
          <h2 className="section-title">
            Featured <span className="gradient-text-blue">Projects</span>
          </h2>
          <p className="section-subtitle mt-4">
            Here are some of my recent projects demonstrating my skills in AI, ML, and full-stack development
          </p>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-12"
        >
          <p className="text-gray-600 mb-4">Want to see more of my work?</p>
          <a
            href="https://github.com/Devendiran-T"
            target="_blank"
            rel="noreferrer"
            className="btn-outline inline-flex items-center gap-2"
          >
            <FiGithub />
            Visit My GitHub
          </a>
        </motion.div>

      </div>
    </section>
  )
}

export default Projects
