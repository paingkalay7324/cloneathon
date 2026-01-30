import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiX, FiKey, FiExternalLink, FiCheck } from 'react-icons/fi'

function SettingsModal({ apiKey, onSave, onClose }) {
  const [key, setKey] = useState(apiKey)
  const [showKey, setShowKey] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(key)
  }

  return (
    <motion.div 
      className="modal-overlay"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
    >
      <motion.div 
        className="modal"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h2>
            <FiKey /> Settings
          </h2>
          <button className="close-btn" onClick={onClose}>
            <FiX />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-content">
          <div className="form-section">
            <h3>AI Tutor Configuration</h3>
            <p className="form-description">
              Connect your DeepSeek API key to enable the AI Study Buddy feature. 
              Your key is stored securely in your browser's local storage.
            </p>
          </div>

          <div className="form-group">
            <label htmlFor="apiKey">DeepSeek API Key</label>
            <div className="input-with-toggle">
              <input
                type={showKey ? 'text' : 'password'}
                id="apiKey"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="sk-..."
              />
              <button 
                type="button"
                className="toggle-visibility"
                onClick={() => setShowKey(!showKey)}
              >
                {showKey ? 'Hide' : 'Show'}
              </button>
            </div>
          </div>

          <div className="api-key-help">
            <a 
              href="https://platform.deepseek.com/api_keys" 
              target="_blank" 
              rel="noopener noreferrer"
              className="help-link"
            >
              <FiExternalLink />
              Get your API key from DeepSeek
            </a>
          </div>

          <div className="form-section">
            <h3>What can the AI Tutor help with?</h3>
            <ul className="feature-list">
              <li>📚 Explain complex course concepts</li>
              <li>💻 Help debug code and solve problems</li>
              <li>📝 Review and improve your assignments</li>
              <li>🎯 Create personalized study plans</li>
              <li>❓ Answer questions about course material</li>
            </ul>
          </div>

          <div className="modal-actions">
            <button type="button" className="btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn-primary">
              <FiCheck /> Save Settings
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default SettingsModal
