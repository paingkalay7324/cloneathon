import { useState } from 'react'
import { FiSearch, FiBell, FiSettings, FiMessageCircle, FiUser } from 'react-icons/fi'
import { user } from '../data/mockData'

function Header({ onAITutorClick, onSettingsClick, aiTutorActive }) {
  const [searchFocused, setSearchFocused] = useState(false)

  return (
    <header className="header">
      <div className="header-left">
        <div className={`search-box ${searchFocused ? 'focused' : ''}`}>
          <FiSearch className="search-icon" />
          <input 
            type="text" 
            placeholder="Search courses, assignments, people..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
          />
        </div>
      </div>

      <div className="header-right">
        <button 
          className={`header-btn ai-tutor-btn ${aiTutorActive ? 'active' : ''}`}
          onClick={onAITutorClick}
          title="AI Tutor"
        >
          <FiMessageCircle />
          <span>AI Tutor</span>
          <div className="ai-badge">NEW</div>
        </button>

        <button className="header-btn icon-btn" title="Notifications">
          <FiBell />
          <span className="notification-badge">3</span>
        </button>

        <button 
          className="header-btn icon-btn" 
          title="Settings"
          onClick={onSettingsClick}
        >
          <FiSettings />
        </button>

        <div className="user-menu">
          <img 
            src={user.avatar} 
            alt={user.name}
            className="user-avatar"
          />
          <div className="user-info">
            <span className="user-name">{user.name}</span>
            <span className="user-role">{user.role}</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
