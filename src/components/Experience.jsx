import { motion } from 'framer-motion'
import { experiences } from '../constants'
import { FiBriefcase, FiAward, FiCheckCircle } from 'react-icons/fi'

const ExperienceCard = ({ experience, index }) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      className="relative pl-8 pb-12 last:pb-0"
    >
      {/* Timeline Line */}
      <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-primary to-secondary" />
      
      {/* Timeline Dot with pulse effect */}
      <div className="absolute left-0 top-2 w-4 h-4 -ml-[7px] rounded-full bg-primary border-4 border-white shadow-soft">
        <div className="absolute inset-0 rounded-full bg-primary animate-ping opacity-75"></div>
      </div>

      {/* Card with decorative corners */}
      <div className="relative group">
        {/* Corner decorations - more visible */}
        <div className="absolute -top-2 -left-2 w-8 h-8 border-t-3 border-l-3 border-secondary rounded-tl-lg transition-all"></div>
        <div className="absolute -bottom-2 -right-2 w-8 h-8 border-b-3 border-r-3 border-primary rounded-br-lg transition-all"></div>
        
        <div className="card p-6 ml-6 border border-blue-200 bg-gradient-to-br from-blue-100/80 to-white/40">
          {/* Company & Date Header */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white shadow-md">
                <FiBriefcase size={20} />
              </div>
              <div>
                <h3 className="text-lg font-bold text-dark">{experience.title}</h3>
                <p className="text-sm font-medium text-primary">{experience.company_name}</p>
              </div>
            </div>

            {/* Date with icon - upper right */}
            <div className="flex items-center gap-2 text-sm text-gray-500 font-medium shrink-0">
              <svg className="w-4 h-4 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {experience.date}
            </div>
          </div>

          {/* Points */}
          <ul className="space-y-2">
            {experience.points.map((point, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-600">
                <FiCheckCircle className="text-primary mt-1 flex-shrink-0" size={16} />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  )
}

const Experience = () => {
  return (
    <section id="work" className="section-light">
      <div className="container-custom">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="section-heading text-primary">My Journey</p>
          <h2 className="section-title">
            Work <span className="gradient-text-blue">Experience</span>
          </h2>
          <p className="section-subtitle mt-4">
            Professional experience and internships that shaped my technical expertise
          </p>
        </motion.div>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company_name} experience={experience} index={index} />
          ))}
        </div>

      </div>
    </section>
  )
}

export default Experience
