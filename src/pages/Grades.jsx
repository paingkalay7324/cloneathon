import { motion } from 'framer-motion'
import { format, parseISO } from 'date-fns'
import { FiTrendingUp, FiAward, FiTarget } from 'react-icons/fi'
import { courses, grades } from '../data/mockData'

function Grades() {
  // Calculate grade statistics per course
  const courseStats = courses.map(course => {
    const courseGrades = grades.filter(g => g.courseId === course.id)
    const totalScore = courseGrades.reduce((sum, g) => sum + g.score, 0)
    const totalPossible = courseGrades.reduce((sum, g) => sum + g.total, 0)
    const percentage = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0
    
    return {
      ...course,
      grades: courseGrades,
      totalScore,
      totalPossible,
      percentage,
      letterGrade: getLetterGrade(percentage)
    }
  })

  const overallScore = grades.reduce((sum, g) => sum + g.score, 0)
  const overallPossible = grades.reduce((sum, g) => sum + g.total, 0)
  const overallPercentage = Math.round((overallScore / overallPossible) * 100)

  function getLetterGrade(percentage) {
    if (percentage >= 93) return 'A'
    if (percentage >= 90) return 'A-'
    if (percentage >= 87) return 'B+'
    if (percentage >= 83) return 'B'
    if (percentage >= 80) return 'B-'
    if (percentage >= 77) return 'C+'
    if (percentage >= 73) return 'C'
    if (percentage >= 70) return 'C-'
    if (percentage >= 67) return 'D+'
    if (percentage >= 60) return 'D'
    return 'F'
  }

  function getGradeColor(percentage) {
    if (percentage >= 90) return '#2EC4B6'
    if (percentage >= 80) return '#7CB342'
    if (percentage >= 70) return '#F7C59F'
    if (percentage >= 60) return '#FF9800'
    return '#FF6B35'
  }

  return (
    <motion.div 
      className="grades-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>Grades</h1>
      </div>

      <div className="grades-overview">
        <div className="overview-card main">
          <div className="overview-icon">
            <FiAward />
          </div>
          <div className="overview-content">
            <span className="overview-label">Overall GPA</span>
            <span className="overview-value">{getLetterGrade(overallPercentage)}</span>
            <span className="overview-sublabel">{overallPercentage}%</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon trend">
            <FiTrendingUp />
          </div>
          <div className="overview-content">
            <span className="overview-label">Trend</span>
            <span className="overview-value positive">+3%</span>
            <span className="overview-sublabel">from last week</span>
          </div>
        </div>
        <div className="overview-card">
          <div className="overview-icon target">
            <FiTarget />
          </div>
          <div className="overview-content">
            <span className="overview-label">Assignments</span>
            <span className="overview-value">{grades.length}</span>
            <span className="overview-sublabel">graded</span>
          </div>
        </div>
      </div>

      <div className="grades-by-course">
        {courseStats.map((course) => (
          <motion.div 
            key={course.id} 
            className="course-grades-card"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="course-grades-header">
              <div 
                className="course-color-bar"
                style={{ backgroundColor: course.color }}
              />
              <div className="course-info">
                <h3>{course.code}</h3>
                <span>{course.name}</span>
              </div>
              <div className="course-grade-summary">
                <span 
                  className="letter-grade"
                  style={{ color: getGradeColor(course.percentage) }}
                >
                  {course.letterGrade}
                </span>
                <span className="percentage">{course.percentage}%</span>
              </div>
            </div>

            <div className="grade-progress-bar">
              <div 
                className="grade-progress-fill"
                style={{ 
                  width: `${course.percentage}%`,
                  backgroundColor: getGradeColor(course.percentage)
                }}
              />
            </div>

            <div className="grades-table">
              <div className="grades-table-header">
                <span>Assignment</span>
                <span>Date</span>
                <span>Score</span>
                <span>Grade</span>
              </div>
              {course.grades.map((grade, index) => {
                const gradePercentage = Math.round((grade.score / grade.total) * 100)
                return (
                  <div key={index} className="grades-table-row">
                    <span className="grade-title">{grade.title}</span>
                    <span className="grade-date">{format(parseISO(grade.date), 'MMM d')}</span>
                    <span className="grade-score">{grade.score}/{grade.total}</span>
                    <span 
                      className="grade-percentage"
                      style={{ color: getGradeColor(gradePercentage) }}
                    >
                      {gradePercentage}%
                    </span>
                  </div>
                )
              })}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}

export default Grades
