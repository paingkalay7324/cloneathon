import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Header from './components/Header'
import Dashboard from './pages/Dashboard'
import Course from './pages/Course'
import Assignments from './pages/Assignments'
import Grades from './pages/Grades'
import Calendar from './pages/Calendar'
import AITutor from './components/AITutor'
import SettingsModal from './components/SettingsModal'

function App() {
  const [showAITutor, setShowAITutor] = useState(false)
  const [showSettings, setShowSettings] = useState(false)
  const [apiKey, setApiKey] = useState(localStorage.getItem('deepseek_api_key') || '')

  const handleApiKeySave = (key) => {
    setApiKey(key)
    localStorage.setItem('deepseek_api_key', key)
    setShowSettings(false)
  }

  return (
    <div className="app">
      <Sidebar />
      <div className="main-wrapper">
        <Header 
          onAITutorClick={() => setShowAITutor(!showAITutor)}
          onSettingsClick={() => setShowSettings(true)}
          aiTutorActive={showAITutor}
        />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/course/:courseId" element={<Course />} />
            <Route path="/course/:courseId/assignments" element={<Assignments />} />
            <Route path="/assignments" element={<Assignments />} />
            <Route path="/grades" element={<Grades />} />
            <Route path="/calendar" element={<Calendar />} />
          </Routes>
        </main>
      </div>

      {showAITutor && (
        <AITutor 
          apiKey={apiKey}
          onClose={() => setShowAITutor(false)}
          onNeedApiKey={() => setShowSettings(true)}
        />
      )}

      {showSettings && (
        <SettingsModal 
          apiKey={apiKey}
          onSave={handleApiKeySave}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  )
}

export default App
