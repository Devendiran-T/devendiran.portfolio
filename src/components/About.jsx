import { motion } from 'framer-motion'
import { personalInfo, services, technologies, technicalSkills } from '../constants'
import AIBrain from './AIBrain'

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5 }
  })
}

const About = () => {
  return (
    <section id="about" className="section-light">
      
      {/* Subtle background element */}
      <div className="absolute left-0 top-20 w-96 h-96 opacity-5 pointer-events-none">
        <AIBrain />
      </div>

      <div className="container-custom relative">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="section-heading text-primary">Introduction</p>
          <h2 className="section-title mb-6">
            About <span className="gradient-text-blue">Me</span>
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-4xl">
            {personalInfo.objective}
          </p>
        </motion.div>

        {/* Bio Section */}
        <div className="space-y-12 mb-20">
          
          {/* Quick Stats (small, horizontal row below About Me text) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-4"
          >
              <div className="card p-4 text-center hover:border-primary/50 transition-all flex flex-col justify-center items-center">
                <div className="text-2xl font-extrabold gradient-text-blue mb-1">{personalInfo.cgpa}</div>
                <div className="text-xs text-gray-500 font-medium">CGPA</div>
              </div>
              <div className="card p-4 text-center hover:border-primary/50 transition-all flex flex-col justify-center items-center">
                <div className="text-2xl font-extrabold gradient-text-blue mb-1">3+</div>
                <div className="text-xs text-gray-500 font-medium">Projects</div>
              </div>
              <div className="card p-4 text-center hover:border-primary/50 transition-all flex flex-col justify-center items-center">
                <div className="text-2xl font-extrabold gradient-text-blue mb-1">2+</div>
                <div className="text-xs text-gray-500 font-medium">Internships</div>
              </div>
              <div className="card p-4 text-center hover:border-primary/50 transition-all flex flex-col justify-center items-center">
                <div className="text-2xl font-extrabold gradient-text-blue mb-1">10+</div>
                <div className="text-xs text-gray-500 font-medium">Technologies</div>
              </div>
            </motion.div>

          {/* Bottom - Core Skills */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="space-y-6"
          >
            <h3 className="text-3xl md:text-4xl font-black text-dark">
              Core <span className="gradient-text-blue">Skills</span>
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  custom={index}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  className="card p-6 hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 group"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white text-base font-bold shrink-0 shadow-sm">
                      {index + 1}
                    </div>
                    <h4 className="font-semibold text-dark text-base group-hover:text-primary transition-colors leading-snug">{service.title}</h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {service.items.map((item) => (
                      <span key={item} className="badge badge-blue text-xs">
                        {item}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Technical Skills */}
        <div id="skills" className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <p className="section-heading text-primary">Expertise</p>
            <h3 className="text-3xl md:text-4xl font-black text-dark">
              Technical <span className="gradient-text-blue">Skills</span>
            </h3>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={skill.category}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="card p-6 hover:shadow-card-hover transition-all duration-300 group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary text-xl">
                    {skill.icon}
                  </div>
                  <h4 className="font-semibold text-dark text-base group-hover:text-primary transition-colors">{skill.category}</h4>
                </div>
                <div className="flex flex-wrap gap-2">
                  {skill.items.map((item) => (
                    <span key={item} className="badge badge-blue text-xs">
                      {item}
                    </span>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-heading text-primary mb-6">Technologies I Work With</p>
          <div className="flex flex-wrap gap-3">
            {technologies.map((tech, index) => (
              <motion.span
                key={tech.name}
                custom={index}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="badge badge-gray hover:badge-blue hover:scale-105 transition-all duration-200 cursor-default"
              >
                {tech.name}
              </motion.span>
            ))}
          </div>
        </motion.div>

      </div>
    </section>
  )
}

export default About
