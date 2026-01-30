import { NavLink } from 'react-router-dom'
import { 
  FiHome, 
  FiBook, 
  FiCalendar, 
  FiClipboard,
  FiBarChart2,
  FiInbox,
  FiHelpCircle
} from 'react-icons/fi'
import { courses } from '../data/mockData'

function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">
          <svg viewBox="0 0 40 40" fill="none">
            <path d="M10 15 L20 10 L30 15 L30 27 L20 32 L10 27 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <circle cx="20" cy="21" r="4" fill="currentColor"/>
          </svg>
        </div>
        <span className="logo-text">LearnFlow</span>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="/" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiHome />
          <span>Dashboard</span>
        </NavLink>
        
        <NavLink to="/assignments" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiClipboard />
          <span>Assignments</span>
        </NavLink>
        
        <NavLink to="/grades" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiBarChart2 />
          <span>Grades</span>
        </NavLink>
        
        <NavLink to="/calendar" className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
          <FiCalendar />
          <span>Calendar</span>
        </NavLink>
        
        <div className="nav-item disabled">
          <FiInbox />
          <span>Inbox</span>
        </div>
      </nav>

      <div className="sidebar-section">
        <div className="section-title">
          <FiBook />
          <span>My Courses</span>
        </div>
        <div className="course-list">
          {courses.map(course => (
            <NavLink 
              key={course.id}
              to={`/course/${course.id}`}
              className={({ isActive }) => `course-item ${isActive ? 'active' : ''}`}
            >
              <div 
                className="course-color" 
                style={{ backgroundColor: course.color }}
              />
              <div className="course-info">
                <span className="course-code">{course.code}</span>
                <span className="course-name">{course.name}</span>
              </div>
            </NavLink>
          ))}
        </div>
      </div>

      <div className="sidebar-footer">
        <button className="help-btn">
          <FiHelpCircle />
          <span>Help & Support</span>
        </button>
      </div>
    </aside>
  )
}

export default Sidebar
