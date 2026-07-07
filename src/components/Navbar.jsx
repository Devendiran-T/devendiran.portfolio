import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { navLinks, personalInfo } from '../constants'
import { FiMenu, FiX } from 'react-icons/fi'

const Navbar = () => {
  const [active, setActive] = useState('')
  const [toggle, setToggle] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/95 backdrop-blur-md shadow-soft border-b border-gray-200'
          : 'bg-white/80 backdrop-blur-sm'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between py-4">
          {/* Logo/Name */}
          <Link
            to="/"
            className="flex items-center gap-2"
            onClick={() => {
              setActive('')
              window.scrollTo(0, 0)
            }}
          >
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center shadow-sm">
              <span className="text-white font-bold text-xl">D</span>
            </div>
            <span className="text-dark font-bold text-xl hidden sm:block">
              {personalInfo.name.split(' ')[0]}
            </span>
          </Link>

          {/* Desktop Navigation */}
          <ul className="list-none hidden md:flex flex-row gap-8 items-center">
            {navLinks.map((link) => (
              <li
                key={link.id}
                className={`${
                  active === link.title
                    ? 'text-primary font-semibold'
                    : 'text-gray-dark'
                } hover:text-primary text-base font-medium cursor-pointer transition-colors`}
                onClick={() => setActive(link.title)}
              >
                <a href={`#${link.id}`}>{link.title}</a>
              </li>
            ))}
            <li>
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="btn-primary text-sm px-5 py-2"
              >
                Resume
              </a>
            </li>
          </ul>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setToggle(!toggle)}
              className="w-10 h-10 flex items-center justify-center text-dark hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {toggle ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          toggle ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        } md:hidden overflow-hidden transition-all duration-300 bg-white border-t border-gray-200`}
      >
        <ul className="flex flex-col p-6 gap-4">
          {navLinks.map((link) => (
            <li
              key={link.id}
              className={`${
                active === link.title ? 'text-primary' : 'text-gray-dark'
              } hover:text-primary text-base font-medium`}
              onClick={() => {
                setToggle(false)
                setActive(link.title)
              }}
            >
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
          <li>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="btn-primary inline-block text-center"
              onClick={() => setToggle(false)}
            >
              Download Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
