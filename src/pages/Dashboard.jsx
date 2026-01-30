import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { format, parseISO, isAfter, isBefore, addDays } from 'date-fns'
import { 
  FiArrowRight, 
  FiClock, 
  FiCheckCircle,
  FiAlertCircle,
  FiBookOpen,
  FiBell
} from 'react-icons/fi'
import { courses, assignments, announcements, user } from '../data/mockData'

function Dashboard() {
  const now = new Date()
  const upcomingAssignments = assignments
    .filter(a => !a.submitted && isAfter(parseISO(a.dueDate), now))
    .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
    .slice(0, 5)

  const recentAnnouncements = announcements
    .sort((a, b) => new Date(b.date) - new Date(a.date))
    .slice(0, 3)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <motion.div 
      className="dashboard"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div className="welcome-section" variants={itemVariants}>
        <div className="welcome-text">
          <h1>Welcome back, {user.name.split(' ')[0]}! 👋</h1>
          <p>You have <strong>{upcomingAssignments.length} assignments</strong> due this week. Keep up the great work!</p>
        </div>
        <div className="welcome-stats">
          <div className="stat-card">
            <div className="stat-icon courses">
              <FiBookOpen />
            </div>
            <div className="stat-info">
              <span className="stat-value">{courses.length}</span>
              <span className="stat-label">Active Courses</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">
              <FiClock />
            </div>
            <div className="stat-info">
              <span className="stat-value">{upcomingAssignments.length}</span>
              <span className="stat-label">Pending Tasks</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon completed">
              <FiCheckCircle />
            </div>
            <div className="stat-info">
              <span className="stat-value">{assignments.filter(a => a.submitted).length}</span>
              <span className="stat-label">Completed</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="dashboard-grid">
        <motion.section className="courses-section" variants={itemVariants}>
          <div className="section-header">
            <h2>My Courses</h2>
            <Link to="/courses" className="view-all">View All</Link>
          </div>
          <div className="courses-grid">
            {courses.map((course, index) => (
              <motion.div
                key={course.id}
                variants={itemVariants}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Link to={`/course/${course.id}`} className="course-card">
                  <div 
                    className="course-card-header"
                    style={{ 
                      background: `linear-gradient(135deg, ${course.color}dd, ${course.color}88)`
                    }}
                  >
                    <span className="course-code">{course.code}</span>
                    {course.announcements > 0 && (
                      <span className="course-badge">
                        <FiBell /> {course.announcements}
                      </span>
                    )}
                  </div>
                  <div className="course-card-body">
                    <h3>{course.name}</h3>
                    <p className="instructor">{course.instructor}</p>
                    <div className="course-progress">
                      <div className="progress-bar">
                        <div 
                          className="progress-fill"
                          style={{ 
                            width: `${course.progress}%`,
                            backgroundColor: course.color
                          }}
                        />
                      </div>
                      <span className="progress-text">{course.progress}% complete</span>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.section>

        <motion.section className="upcoming-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Upcoming Assignments</h2>
            <Link to="/assignments" className="view-all">View All</Link>
          </div>
          <div className="assignments-list">
            {upcomingAssignments.map((assignment) => {
              const course = courses.find(c => c.id === assignment.courseId)
              const dueDate = parseISO(assignment.dueDate)
              const isUrgent = isBefore(dueDate, addDays(now, 2))
              
              return (
                <div key={assignment.id} className={`assignment-item ${isUrgent ? 'urgent' : ''}`}>
                  <div 
                    className="assignment-color"
                    style={{ backgroundColor: course?.color }}
                  />
                  <div className="assignment-info">
                    <span className="assignment-course">{course?.code}</span>
                    <h4>{assignment.title}</h4>
                    <div className="assignment-meta">
                      <span className={`due-date ${isUrgent ? 'urgent' : ''}`}>
                        {isUrgent && <FiAlertCircle />}
                        Due {format(dueDate, 'MMM d, h:mm a')}
                      </span>
                      <span className="points">{assignment.points} pts</span>
                    </div>
                  </div>
                  <button className="assignment-action">
                    <FiArrowRight />
                  </button>
                </div>
              )
            })}
          </div>
        </motion.section>

        <motion.section className="announcements-section" variants={itemVariants}>
          <div className="section-header">
            <h2>Recent Announcements</h2>
          </div>
          <div className="announcements-list">
            {recentAnnouncements.map((announcement) => {
              const course = courses.find(c => c.id === announcement.courseId)
              return (
                <div key={announcement.id} className={`announcement-item ${announcement.unread ? 'unread' : ''}`}>
                  <div 
                    className="announcement-color"
                    style={{ backgroundColor: course?.color }}
                  />
                  <div className="announcement-content">
                    <div className="announcement-header">
                      <span className="announcement-course">{course?.code}</span>
                      <span className="announcement-date">
                        {format(parseISO(announcement.date), 'MMM d')}
                      </span>
                    </div>
                    <h4>{announcement.title}</h4>
                    <p>{announcement.content}</p>
                    <span className="announcement-author">— {announcement.author}</span>
                  </div>
                  {announcement.unread && <div className="unread-dot" />}
                </div>
              )
            })}
          </div>
        </motion.section>
      </div>
    </motion.div>
  )
}

export default Dashboard
