import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMessageSquare, FiX, FiSend, FiCpu, FiUser, FiChevronRight } from 'react-icons/fi'
import { personalInfo, projects, technicalSkills, experiences, services } from '../constants'

const DevaAssistant = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      sender: 'bot',
      text: `Hi! I'm Deva Assistant 🤖. I can tell you all about Devendiran's skills, projects, work experience, and how to contact him. What would you like to know?`,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  // Auto-scroll to bottom of chat
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  // Handle suggestion chip clicks
  const handleSuggestionClick = (query) => {
    sendMessage(query)
  }

  // Predefined suggestion buttons
  const suggestions = [
    { label: '📂 Projects', query: 'Tell me about your projects' },
    { label: '💡 Core Skills', query: 'What are your core skills?' },
    { label: '💼 Experience', query: 'Show me your internship experience' },
    { label: '🎓 CGPA & Education', query: 'What is your education and CGPA?' },
    { label: '📧 Contact Details', query: 'How can I contact you?' }
  ]

  // NLP pattern matching engine
  const getBotResponse = (input) => {
    const query = input.toLowerCase().trim()

    // 1. Greetings
    if (
      query.includes('hello') ||
      query.includes('hi') ||
      query.includes('hey') ||
      query.includes('greet') ||
      query.includes('who are you') ||
      query.includes('what is your name') ||
      query.includes('about the assistant')
    ) {
      return `Hello! I'm Deva Assistant, the AI representative for Devendiran. I'm here to answer questions about his skills, college projects, internships, and professional qualifications. Ask me anything!`
    }

    // 2. Projects
    if (
      query.includes('project') ||
      query.includes('portfolio') ||
      query.includes('work') ||
      query.includes('showcase') ||
      query.includes('build') ||
      query.includes('yolo') ||
      query.includes('tracking') ||
      query.includes('booking') ||
      query.includes('flask') ||
      query.includes('car')
    ) {
      const projectsList = projects.map(p => `• **${p.name}**: ${p.description} (Tech: ${p.tags.map(t => t.name).join(', ')})`).join('\n\n')
      return `Here are some of Devendiran's top projects:\n\n${projectsList}\n\nYou can inspect his repositories directly on [GitHub](${personalInfo.github}).`
    }

    // 3. Skills
    if (
      query.includes('skill') ||
      query.includes('technolog') ||
      query.includes('tech') ||
      query.includes('python') ||
      query.includes('react') ||
      query.includes('expert') ||
      query.includes('machine learning') ||
      query.includes('cv') ||
      query.includes('pyspark')
    ) {
      const coreSkillsStr = services.map(s => `• **${s.title}** (${s.items.slice(0, 3).join(', ')})`).join('\n')
      const techSkillsStr = technicalSkills.map(t => `• **${t.category}**: ${t.items.join(', ')}`).join('\n')
      return `Devendiran's core specialties include:\n\n${coreSkillsStr}\n\n**Detailed Technical Profile:**\n${techSkillsStr}`
    }

    // 4. Experience & Internships
    if (
      query.includes('experience') ||
      query.includes('job') ||
      query.includes('intern') ||
      query.includes('work history') ||
      query.includes('gateway') ||
      query.includes('emglitz') ||
      query.includes('coimbatore')
    ) {
      const expList = experiences.map(e => `• **${e.title}** at *${e.company_name}* (${e.date})\n  ${e.points[0]}`).join('\n\n')
      return `Here is a summary of Devendiran's practical internships:\n\n${expList}`
    }

    // 5. Education & CGPA
    if (
      query.includes('education') ||
      query.includes('college') ||
      query.includes('gpa') ||
      query.includes('cgpa') ||
      query.includes('btech') ||
      query.includes('degree') ||
      query.includes('school') ||
      query.includes('rvs')
    ) {
      return `Devendiran is pursuing a **B.Tech in Artificial Intelligence & Data Science** at **${personalInfo.college}** (${personalInfo.duration}).\n\nHis current academic score is a strong **CGPA of ${personalInfo.cgpa}**!`
    }

    // 6. Contact & Resume
    if (
      query.includes('contact') ||
      query.includes('email') ||
      query.includes('phone') ||
      query.includes('linkedin') ||
      query.includes('hire') ||
      query.includes('resume') ||
      query.includes('cv') ||
      query.includes('social') ||
      query.includes('mail') ||
      query.includes('number')
    ) {
      return `You can connect with Devendiran directly through these channels:\n\n` +
             `📧 **Email:** [${personalInfo.email}](mailto:${personalInfo.email})\n` +
             `📞 **Phone:** ${personalInfo.phone}\n` +
             `💼 **LinkedIn:** [devendiran-t](${personalInfo.linkedin})\n` +
             `🐙 **GitHub:** [Devendiran-T](${personalInfo.github})\n` +
             `📍 **Location:** ${personalInfo.location}\n\n` +
             `📄 You can also view/download his full [Resume](${personalInfo.resumeUrl}).`
    }

    // Fallback response
    return `Interesting question! I'm a specialized portfolio assistant for Devendiran T, so I might not have all the general-knowledge answers.\n\nWould you like me to show his **projects**, list his **skills**, or display his **contact details**? You can also click one of the quick suggestions below.`
  }

  // Send message handler
  const sendMessage = (textToSend) => {
    const text = textToSend || inputValue
    if (!text.trim()) return

    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: text,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMsg])
    if (!textToSend) setInputValue('')

    // 2. Set Typing Indicator
    setIsTyping(true)

    // 3. Delay response slightly to simulate AI thinking
    setTimeout(() => {
      const responseText = getBotResponse(text)
      const botMsg = {
        id: Date.now() + 1,
        sender: 'bot',
        text: responseText,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botMsg])
      setIsTyping(false)
    }, 1000)
  }

  // Format message text to handle markdown-like links and bold texts
  const formatMessageText = (text) => {
    // 1. Bold Formatting: **text**
    let formatted = text.split('**').map((part, index) => {
      return index % 2 === 1 ? `<strong class="font-bold text-dark">${part}</strong>` : part
    }).join('')

    // 2. Italic Formatting: *text*
    formatted = formatted.split('*').map((part, index) => {
      return index % 2 === 1 ? `<em class="italic text-gray-700">${part}</em>` : part
    }).join('')

    // 3. Link Formatting: [label](url)
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g
    formatted = formatted.replace(linkRegex, '<a href="$2" target="_blank" rel="noreferrer" class="text-primary underline hover:text-secondary transition-colors">$1</a>')

    // 4. Line Breaks
    formatted = formatted.replace(/\n/g, '<br />')

    return <div dangerouslySetInnerHTML={{ __html: formatted }} className="leading-relaxed" />
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      
      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="w-[350px] sm:w-[400px] h-[550px] bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden flex flex-col mb-4"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-primary to-secondary p-4 flex items-center justify-between text-white shadow-md">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/20">
                  <FiCpu className="text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-base leading-tight">Deva Assistant</h3>
                  <span className="text-xs text-blue-100 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                    Portfolio Representative
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors text-white"
                aria-label="Close Assistant"
              >
                <FiX size={20} />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 max-w-[85%] ${msg.sender === 'user' ? 'ml-auto flex-row-reverse' : ''}`}
                >
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${
                    msg.sender === 'user' ? 'bg-primary text-white' : 'bg-white border border-gray-200 text-primary'
                  }`}>
                    {msg.sender === 'user' ? <FiUser size={14} /> : <FiCpu size={14} />}
                  </div>

                  {/* Message Bubble */}
                  <div className={`p-3.5 rounded-2xl text-sm ${
                    msg.sender === 'user'
                      ? 'bg-primary text-white rounded-tr-none'
                      : 'bg-white text-gray-700 border border-gray-150 rounded-tl-none shadow-sm'
                  }`}>
                    {formatMessageText(msg.text)}
                    <span className={`block text-[10px] mt-1.5 text-right ${
                      msg.sender === 'user' ? 'text-blue-100' : 'text-gray-400'
                    }`}>
                      {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex gap-3 max-w-[85%]">
                  <div className="w-8 h-8 rounded-full bg-white border border-gray-200 text-primary flex items-center justify-center shrink-0 shadow-sm">
                    <FiCpu size={14} />
                  </div>
                  <div className="bg-white text-gray-700 border border-gray-150 rounded-2xl rounded-tl-none p-3 shadow-sm flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Suggestions */}
            <div className="px-4 py-2 bg-white border-t border-gray-100 overflow-x-auto flex gap-2 no-scrollbar">
              {suggestions.map((s) => (
                <button
                  key={s.label}
                  onClick={() => handleSuggestionClick(s.query)}
                  className="px-3 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-xs text-primary hover:bg-primary hover:text-white transition-all duration-200 shrink-0 font-medium hover:shadow-sm"
                >
                  {s.label}
                </button>
              ))}
            </div>

            {/* Input Form */}
            <form
              onSubmit={(e) => {
                e.preventDefault()
                sendMessage()
              }}
              className="p-3 bg-white border-t border-gray-200 flex gap-2 items-center"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask a question..."
                className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary/20 bg-gray-50/50"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                className="w-10 h-10 rounded-xl bg-primary text-white flex items-center justify-center hover:bg-secondary transition-all disabled:opacity-50 disabled:hover:bg-primary shrink-0 shadow-sm hover:shadow-md"
                aria-label="Send Message"
              >
                <FiSend size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 rounded-full bg-gradient-to-br from-primary to-secondary text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-200 relative group"
        aria-label="Toggle Deva Assistant"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <FiMessageSquare size={24} />
              {/* Notification Badge/Pulse */}
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white animate-ping"></span>
              <span className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  )
}

export default DevaAssistant
