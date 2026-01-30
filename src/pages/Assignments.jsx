import { useState } from 'react'
import { motion } from 'framer-motion'
import { format, parseISO, isPast, isFuture, isToday, addDays, isBefore } from 'date-fns'
import { 
  FiFilter, 
  FiCheck, 
  FiClock, 
  FiAlertCircle,
  FiChevronRight,
  FiSearch
} from 'react-icons/fi'
import { assignments, courses } from '../data/mockData'

function Assignments() {
  const [filter, setFilter] = useState('upcoming')
  const [searchQuery, setSearchQuery] = useState('')
  const now = new Date()

  const filteredAssignments = assignments.filter(assignment => {
    const matchesSearch = assignment.title.toLowerCase().includes(searchQuery.toLowerCase())
    const dueDate = parseISO(assignment.dueDate)

    switch (filter) {
      case 'upcoming':
        return matchesSearch && !assignment.submitted && isFuture(dueDate)
      case 'past':
        return matchesSearch && isPast(dueDate)
      case 'submitted':
        return matchesSearch && assignment.submitted
      default:
        return matchesSearch
    }
  }).sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))

  const groupedByDate = filteredAssignments.reduce((groups, assignment) => {
    const dueDate = parseISO(assignment.dueDate)
    let key

    if (isToday(dueDate)) {
      key = 'Today'
    } else if (isBefore(dueDate, addDays(now, 7))) {
      key = 'This Week'
    } else if (isBefore(dueDate, addDays(now, 14))) {
      key = 'Next Week'
    } else {
      key = 'Later'
    }

    if (!groups[key]) groups[key] = []
    groups[key].push(assignment)
    return groups
  }, {})

  const getTypeColor = (type) => {
    switch (type) {
      case 'assignment': return '#FF6B35'
      case 'quiz': return '#2EC4B6'
      case 'lab': return '#9B5DE5'
      case 'discussion': return '#F7C59F'
      default: return '#666'
    }
  }

  return (
    <motion.div 
      className="assignments-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>Assignments</h1>
        <div className="header-actions">
          <div className="search-input">
            <FiSearch />
            <input 
              type="text"
              placeholder="Search assignments..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="filter-tabs">
        <button 
          className={`filter-tab ${filter === 'upcoming' ? 'active' : ''}`}
          onClick={() => setFilter('upcoming')}
        >
          <FiClock /> Upcoming
        </button>
        <button 
          className={`filter-tab ${filter === 'past' ? 'active' : ''}`}
          onClick={() => setFilter('past')}
        >
          <FiAlertCircle /> Past Due
        </button>
        <button 
          className={`filter-tab ${filter === 'submitted' ? 'active' : ''}`}
          onClick={() => setFilter('submitted')}
        >
          <FiCheck /> Submitted
        </button>
        <button 
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          <FiFilter /> All
        </button>
      </div>

      <div className="assignments-content">
        {Object.entries(groupedByDate).map(([dateGroup, groupAssignments]) => (
          <section key={dateGroup} className="assignment-group">
            <h2 className="group-title">{dateGroup}</h2>
            <div className="assignments-list">
              {groupAssignments.map((assignment) => {
                const course = courses.find(c => c.id === assignment.courseId)
                const dueDate = parseISO(assignment.dueDate)
                const isUrgent = !assignment.submitted && isBefore(dueDate, addDays(now, 2))
                const isOverdue = !assignment.submitted && isPast(dueDate)

                return (
                  <motion.div 
                    key={assignment.id} 
                    className={`assignment-card ${isOverdue ? 'overdue' : ''} ${isUrgent ? 'urgent' : ''} ${assignment.submitted ? 'submitted' : ''}`}
                    whileHover={{ x: 4 }}
                  >
                    <div 
                      className="assignment-type-bar"
                      style={{ backgroundColor: getTypeColor(assignment.type) }}
                    />
                    <div className="assignment-main">
                      <div className="assignment-header">
                        <span 
                          className="assignment-type"
                          style={{ color: getTypeColor(assignment.type) }}
                        >
                          {assignment.type.charAt(0).toUpperCase() + assignment.type.slice(1)}
                        </span>
                        <span className="assignment-course" style={{ color: course?.color }}>
                          {course?.code}
                        </span>
                      </div>
                      <h3>{assignment.title}</h3>
                      <p className="assignment-description">{assignment.description}</p>
                      <div className="assignment-footer">
                        <div className="assignment-due">
                          {isOverdue ? (
                            <span className="overdue-text">
                              <FiAlertCircle /> Overdue
                            </span>
                          ) : assignment.submitted ? (
                            <span className="submitted-text">
                              <FiCheck /> Submitted {format(parseISO(assignment.submittedDate), 'MMM d')}
                            </span>
                          ) : (
                            <span className={isUrgent ? 'urgent-text' : ''}>
                              <FiClock /> Due {format(dueDate, 'MMM d, h:mm a')}
                            </span>
                          )}
                        </div>
                        <div className="assignment-points">
                          {assignment.submitted && assignment.grade !== undefined ? (
                            <span className="grade">{assignment.grade}/{assignment.points}</span>
                          ) : (
                            <span>{assignment.points} pts</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button className="assignment-arrow">
                      <FiChevronRight />
                    </button>
                  </motion.div>
                )
              })}
            </div>
          </section>
        ))}

        {Object.keys(groupedByDate).length === 0 && (
          <div className="empty-state">
            <div className="empty-icon">📋</div>
            <h3>No assignments found</h3>
            <p>Try adjusting your filters or search query</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default Assignments
