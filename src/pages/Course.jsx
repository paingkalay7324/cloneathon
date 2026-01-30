import { useParams, NavLink, Routes, Route } from 'react-router-dom'
import { motion } from 'framer-motion'
import { 
  FiHome, 
  FiFileText, 
  FiClipboard, 
  FiMessageSquare,
  FiFolder,
  FiUsers,
  FiBarChart2,
  FiChevronDown,
  FiChevronRight,
  FiCheck,
  FiPlay,
  FiFile
} from 'react-icons/fi'
import { useState } from 'react'
import { courses, modules, announcements } from '../data/mockData'

function Course() {
  const { courseId } = useParams()
  const course = courses.find(c => c.id === parseInt(courseId))
  const courseModules = modules.filter(m => m.courseId === parseInt(courseId))
  const courseAnnouncements = announcements.filter(a => a.courseId === parseInt(courseId))
  
  const [expandedModules, setExpandedModules] = useState([1, 2])

  if (!course) {
    return <div className="course-not-found">Course not found</div>
  }

  const toggleModule = (moduleId) => {
    setExpandedModules(prev => 
      prev.includes(moduleId) 
        ? prev.filter(id => id !== moduleId)
        : [...prev, moduleId]
    )
  }

  const getItemIcon = (type) => {
    switch (type) {
      case 'video': return <FiPlay />
      case 'assignment': return <FiClipboard />
      case 'quiz': return <FiFileText />
      case 'page': return <FiFile />
      default: return <FiFile />
    }
  }

  return (
    <motion.div 
      className="course-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div 
        className="course-banner"
        style={{ 
          background: `linear-gradient(135deg, ${course.color}ee 0%, ${course.color}99 100%)`
        }}
      >
        <div className="course-banner-content">
          <span className="course-code">{course.code}</span>
          <h1>{course.name}</h1>
          <p>{course.instructor} • {course.term}</p>
        </div>
      </div>

      <nav className="course-nav">
        <NavLink to={`/course/${courseId}`} end className={({ isActive }) => isActive ? 'active' : ''}>
          <FiHome /> Home
        </NavLink>
        <NavLink to={`/course/${courseId}/modules`} className={({ isActive }) => isActive ? 'active' : ''}>
          <FiFolder /> Modules
        </NavLink>
        <NavLink to={`/course/${courseId}/assignments`} className={({ isActive }) => isActive ? 'active' : ''}>
          <FiClipboard /> Assignments
        </NavLink>
        <NavLink to={`/course/${courseId}/discussions`} className={({ isActive }) => isActive ? 'active' : ''}>
          <FiMessageSquare /> Discussions
        </NavLink>
        <NavLink to={`/course/${courseId}/grades`} className={({ isActive }) => isActive ? 'active' : ''}>
          <FiBarChart2 /> Grades
        </NavLink>
        <NavLink to={`/course/${courseId}/people`} className={({ isActive }) => isActive ? 'active' : ''}>
          <FiUsers /> People
        </NavLink>
      </nav>

      <div className="course-content">
        <div className="course-main">
          <section className="modules-section">
            <h2>Course Modules</h2>
            <div className="modules-list">
              {courseModules.map((module) => {
                const isExpanded = expandedModules.includes(module.id)
                const completedItems = module.items.filter(i => i.completed).length
                const totalItems = module.items.length
                const progress = Math.round((completedItems / totalItems) * 100)

                return (
                  <div key={module.id} className={`module ${isExpanded ? 'expanded' : ''}`}>
                    <button 
                      className="module-header"
                      onClick={() => toggleModule(module.id)}
                    >
                      <div className="module-header-left">
                        {isExpanded ? <FiChevronDown /> : <FiChevronRight />}
                        <h3>{module.title}</h3>
                      </div>
                      <div className="module-progress">
                        <div className="mini-progress-bar">
                          <div 
                            className="mini-progress-fill"
                            style={{ width: `${progress}%` }}
                          />
                        </div>
                        <span>{completedItems}/{totalItems}</span>
                      </div>
                    </button>
                    
                    {isExpanded && (
                      <motion.div 
                        className="module-items"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                      >
                        {module.items.map((item) => (
                          <div 
                            key={item.id} 
                            className={`module-item ${item.completed ? 'completed' : ''}`}
                          >
                            <div className="item-icon">
                              {getItemIcon(item.type)}
                            </div>
                            <div className="item-info">
                              <span className="item-title">{item.title}</span>
                              {item.duration && (
                                <span className="item-duration">{item.duration}</span>
                              )}
                            </div>
                            <div className="item-status">
                              {item.completed && (
                                <span className="completed-badge">
                                  <FiCheck /> Done
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </motion.div>
                    )}
                  </div>
                )
              })}
            </div>
          </section>
        </div>

        <aside className="course-sidebar">
          <div className="sidebar-card">
            <h3>Course Progress</h3>
            <div className="big-progress">
              <svg viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="var(--border-color)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke={course.color}
                  strokeWidth="8"
                  strokeDasharray={`${course.progress * 2.83} ${283 - course.progress * 2.83}`}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <span className="progress-value">{course.progress}%</span>
            </div>
          </div>

          {courseAnnouncements.length > 0 && (
            <div className="sidebar-card">
              <h3>Latest Announcements</h3>
              <div className="mini-announcements">
                {courseAnnouncements.slice(0, 2).map((ann) => (
                  <div key={ann.id} className="mini-announcement">
                    <h4>{ann.title}</h4>
                    <p>{ann.content.substring(0, 80)}...</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </aside>
      </div>
    </motion.div>
  )
}

export default Course
