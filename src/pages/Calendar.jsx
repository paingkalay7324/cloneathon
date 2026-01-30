import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  format, 
  startOfWeek, 
  addDays, 
  isSameDay,
  parseISO,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  addMonths,
  subMonths
} from 'date-fns'
import { FiChevronLeft, FiChevronRight, FiCalendar } from 'react-icons/fi'
import { calendarEvents, assignments } from '../data/mockData'

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('week')

  const startOfCurrentWeek = startOfWeek(currentDate, { weekStartsOn: 0 })
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(startOfCurrentWeek, i))

  const monthStart = startOfMonth(currentDate)
  const monthEnd = endOfMonth(currentDate)
  const monthDays = eachDayOfInterval({ start: monthStart, end: monthEnd })

  // Pad the beginning of the month
  const startPadding = monthStart.getDay()
  const paddedDays = Array.from({ length: startPadding }, (_, i) => 
    addDays(monthStart, -(startPadding - i))
  )

  const allMonthDays = [...paddedDays, ...monthDays]

  const getEventsForDay = (date) => {
    const dateStr = format(date, 'yyyy-MM-dd')
    const events = calendarEvents.filter(e => e.date === dateStr)
    const dueAssignments = assignments
      .filter(a => format(parseISO(a.dueDate), 'yyyy-MM-dd') === dateStr)
      .map(a => ({
        id: `assignment-${a.id}`,
        title: a.title,
        type: 'assignment',
        time: format(parseISO(a.dueDate), 'HH:mm'),
        color: '#FF6B35'
      }))
    return [...events, ...dueAssignments]
  }

  const hours = Array.from({ length: 12 }, (_, i) => i + 8) // 8 AM to 7 PM

  return (
    <motion.div 
      className="calendar-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="page-header">
        <h1>Calendar</h1>
        <div className="header-actions">
          <div className="view-toggle">
            <button 
              className={view === 'week' ? 'active' : ''}
              onClick={() => setView('week')}
            >
              Week
            </button>
            <button 
              className={view === 'month' ? 'active' : ''}
              onClick={() => setView('month')}
            >
              Month
            </button>
          </div>
        </div>
      </div>

      <div className="calendar-nav">
        <button 
          className="nav-btn"
          onClick={() => setCurrentDate(view === 'week' ? addDays(currentDate, -7) : subMonths(currentDate, 1))}
        >
          <FiChevronLeft />
        </button>
        <h2>
          {view === 'week' 
            ? `${format(weekDays[0], 'MMM d')} - ${format(weekDays[6], 'MMM d, yyyy')}`
            : format(currentDate, 'MMMM yyyy')
          }
        </h2>
        <button 
          className="nav-btn"
          onClick={() => setCurrentDate(view === 'week' ? addDays(currentDate, 7) : addMonths(currentDate, 1))}
        >
          <FiChevronRight />
        </button>
        <button 
          className="today-btn"
          onClick={() => setCurrentDate(new Date())}
        >
          <FiCalendar /> Today
        </button>
      </div>

      {view === 'week' ? (
        <div className="week-view">
          <div className="week-header">
            <div className="time-gutter"></div>
            {weekDays.map((day) => (
              <div 
                key={day.toISOString()} 
                className={`week-day-header ${isSameDay(day, new Date()) ? 'today' : ''}`}
              >
                <span className="day-name">{format(day, 'EEE')}</span>
                <span className="day-number">{format(day, 'd')}</span>
              </div>
            ))}
          </div>
          <div className="week-body">
            <div className="time-column">
              {hours.map((hour) => (
                <div key={hour} className="time-slot">
                  <span>{format(new Date().setHours(hour, 0), 'h a')}</span>
                </div>
              ))}
            </div>
            {weekDays.map((day) => {
              const dayEvents = getEventsForDay(day)
              return (
                <div 
                  key={day.toISOString()} 
                  className={`day-column ${isSameDay(day, new Date()) ? 'today' : ''}`}
                >
                  {hours.map((hour) => (
                    <div key={hour} className="hour-slot">
                      {dayEvents
                        .filter(e => parseInt(e.time?.split(':')[0]) === hour)
                        .map((event) => (
                          <div 
                            key={event.id}
                            className="calendar-event"
                            style={{ 
                              backgroundColor: `${event.color}22`,
                              borderLeft: `3px solid ${event.color}`
                            }}
                          >
                            <span className="event-time">{event.time}</span>
                            <span className="event-title">{event.title}</span>
                          </div>
                        ))
                      }
                    </div>
                  ))}
                </div>
              )
            })}
          </div>
        </div>
      ) : (
        <div className="month-view">
          <div className="month-header">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
              <div key={day} className="month-day-name">{day}</div>
            ))}
          </div>
          <div className="month-grid">
            {allMonthDays.map((day, index) => {
              const dayEvents = getEventsForDay(day)
              const isCurrentMonth = isSameMonth(day, currentDate)
              const isToday = isSameDay(day, new Date())

              return (
                <div 
                  key={index}
                  className={`month-day ${!isCurrentMonth ? 'other-month' : ''} ${isToday ? 'today' : ''}`}
                >
                  <span className="day-number">{format(day, 'd')}</span>
                  <div className="day-events">
                    {dayEvents.slice(0, 3).map((event) => (
                      <div 
                        key={event.id}
                        className="month-event"
                        style={{ backgroundColor: event.color }}
                      >
                        {event.title.length > 15 
                          ? event.title.substring(0, 15) + '...' 
                          : event.title
                        }
                      </div>
                    ))}
                    {dayEvents.length > 3 && (
                      <span className="more-events">+{dayEvents.length - 3} more</span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default Calendar
