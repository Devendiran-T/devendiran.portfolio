import { BrowserRouter } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Contact from './components/Contact'
import DevaAssistant from './components/DevaAssistant'
import { personalInfo } from './constants'
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

const App = () => {
  return (
    <BrowserRouter>
      <div className="relative bg-white">
        <Navbar />
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Contact />
        
        {/* Footer */}
        <footer className="bg-dark text-white py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
              
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                    <span className="text-white font-bold text-xl">D</span>
                  </div>
                  <span className="text-white font-bold text-xl">{personalInfo.name.split(' ')[0]}</span>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">
                  {personalInfo.tagline}
                </p>
              </div>

              {/* Quick Links */}
              <div>
                <h3 className="text-white font-semibold mb-4">Quick Links</h3>
                <ul className="space-y-2">
                  <li><a href="#about" className="text-gray-400 hover:text-primary transition-colors text-sm">About</a></li>
                  <li><a href="#skills" className="text-gray-400 hover:text-primary transition-colors text-sm">Skills</a></li>
                  <li><a href="#projects" className="text-gray-400 hover:text-primary transition-colors text-sm">Projects</a></li>
                  <li><a href="#work" className="text-gray-400 hover:text-primary transition-colors text-sm">Experience</a></li>
                  <li><a href="#contact" className="text-gray-400 hover:text-primary transition-colors text-sm">Contact</a></li>
                </ul>
              </div>

              {/* Contact & Social */}
              <div>
                <h3 className="text-white font-semibold mb-4">Get In Touch</h3>
                <div className="space-y-2 mb-4">
                  <a href={`mailto:${personalInfo.email}`} className="text-gray-400 hover:text-primary transition-colors text-sm flex items-center gap-2">
                    <FiMail size={16} />
                    {personalInfo.email}
                  </a>
                  <p className="text-gray-400 text-sm">{personalInfo.location}</p>
                </div>
                <div className="flex gap-3">
                  <a
                    href={personalInfo.github}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="GitHub"
                  >
                    <FiGithub size={18} />
                  </a>
                  <a
                    href={personalInfo.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="LinkedIn"
                  >
                    <FiLinkedin size={18} />
                  </a>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    className="w-10 h-10 flex items-center justify-center rounded-lg bg-gray-800 text-gray-400 hover:bg-primary hover:text-white transition-all duration-200"
                    aria-label="Email"
                  >
                    <FiMail size={18} />
                  </a>
                </div>
              </div>
            </div>

            {/* Bottom Bar */}
            <div className="pt-8 border-t border-gray-800 text-center">
              <p className="text-gray-400 text-sm">
                © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
              </p>
            </div>
          </div>
        </footer>
        <DevaAssistant />
      </div>
    </BrowserRouter>
  )
}

export default App
