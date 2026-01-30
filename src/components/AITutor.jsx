import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FiX, 
  FiSend, 
  FiTrash2, 
  FiBook,
  FiHelpCircle,
  FiCode,
  FiEdit3,
  FiMessageCircle
} from 'react-icons/fi'
import ReactMarkdown from 'react-markdown'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { sendMessage } from '../services/openai'
import { courses } from '../data/mockData'

const quickPrompts = [
  { icon: <FiHelpCircle />, text: "Explain a concept", prompt: "Can you explain this concept to me in simple terms:" },
  { icon: <FiCode />, text: "Help with code", prompt: "I need help understanding this code problem:" },
  { icon: <FiBook />, text: "Study tips", prompt: "What are some effective study strategies for:" },
  { icon: <FiEdit3 />, text: "Review my work", prompt: "Can you review my work and give feedback:" },
]

function AITutor({ apiKey, onClose, onNeedApiKey }) {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: `# Hey there! 👋 I'm your AI Study Buddy!

Powered by **DeepSeek**, I'm here to help you succeed in your courses. I can:

- **Explain** difficult concepts in simple terms
- **Help** with homework and coding problems
- **Quiz** you on course material
- **Suggest** study strategies and resources

What would you like help with today?`
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCourse, setSelectedCourse] = useState(null)
  const messagesEndRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const handleSubmit = async (e, customPrompt = null) => {
    e?.preventDefault()
    
    const messageText = customPrompt || input
    if (!messageText.trim()) return

    if (!apiKey) {
      onNeedApiKey()
      return
    }

    const courseContext = selectedCourse 
      ? `[Context: Student is asking about ${selectedCourse.name} (${selectedCourse.code})]`
      : ''

    const userMessage = `${courseContext}\n${messageText}`
    const newMessages = [...messages, { role: 'user', content: messageText }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await sendMessage(
        newMessages.map(m => ({ role: m.role, content: m.content })),
        selectedCourse,
        apiKey
      )
      setMessages([...newMessages, { role: 'assistant', content: response }])
    } catch (error) {
      setMessages([
        ...newMessages,
        { 
          role: 'assistant', 
          content: `❌ **Oops!** ${error.message}\n\nPlease check your API key in settings and try again.`
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const handleQuickPrompt = (prompt) => {
    setInput(prompt + ' ')
    inputRef.current?.focus()
  }

  const clearChat = () => {
    setMessages([messages[0]])
  }

  const CodeBlock = ({ node, inline, className, children, ...props }) => {
    const match = /language-(\w+)/.exec(className || '')
    const codeString = String(children).replace(/\n$/, '')
    
    if (!inline && match) {
      return (
        <div className="code-block-wrapper">
          <div className="code-block-header">
            <span>{match[1]}</span>
          </div>
          <SyntaxHighlighter
            style={oneDark}
            language={match[1]}
            PreTag="div"
            {...props}
          >
            {codeString}
          </SyntaxHighlighter>
        </div>
      )
    }
    
    return <code className="inline-code" {...props}>{children}</code>
  }

  return (
    <motion.div 
      className="ai-tutor-panel"
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
    >
      <div className="ai-tutor-header">
        <div className="ai-tutor-title">
          <div className="ai-avatar">
            <FiMessageCircle />
          </div>
          <div>
            <h3>AI Study Buddy</h3>
            <span className="ai-status">
              <span className="status-dot"></span>
              Online
            </span>
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>
          <FiX />
        </button>
      </div>

      <div className="course-selector">
        <span>Studying:</span>
        <select 
          value={selectedCourse?.id || ''}
          onChange={(e) => {
            const course = courses.find(c => c.id === parseInt(e.target.value))
            setSelectedCourse(course || null)
          }}
        >
          <option value="">All Courses</option>
          {courses.map(course => (
            <option key={course.id} value={course.id}>
              {course.code} - {course.name}
            </option>
          ))}
        </select>
      </div>

      <div className="messages-container">
        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div 
              key={index}
              className={`message ${message.role}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              {message.role === 'assistant' && (
                <div className="message-avatar">🤖</div>
              )}
              <div className="message-content">
                <ReactMarkdown components={{ code: CodeBlock }}>
                  {message.content}
                </ReactMarkdown>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        
        {isLoading && (
          <motion.div 
            className="message assistant"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="message-avatar">🤖</div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </motion.div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      <div className="quick-prompts">
        {quickPrompts.map((item, index) => (
          <button
            key={index}
            className="quick-prompt-btn"
            onClick={() => handleQuickPrompt(item.prompt)}
            disabled={isLoading}
          >
            {item.icon}
            <span>{item.text}</span>
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="chat-input-form">
        <div className="input-wrapper">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask me anything about your courses..."
            disabled={isLoading}
          />
          <div className="input-actions">
            <button 
              type="button" 
              className="clear-btn"
              onClick={clearChat}
              title="Clear chat"
            >
              <FiTrash2 />
            </button>
            <button 
              type="submit" 
              className="send-btn"
              disabled={isLoading || !input.trim()}
            >
              <FiSend />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  )
}

export default AITutor
