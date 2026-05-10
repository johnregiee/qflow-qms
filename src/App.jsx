import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx'
import IntroModal from './components/IntroModal.jsx'
import NotificationsModal from './components/NotificationsModal.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import ISOPage from './pages/ISOPage.jsx'
import DCCPage from './pages/DCCPage.jsx'

function App() {
  const [showIntro, setShowIntro] = useState(false)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false)
  const [activePage, setActivePage] = useState('Dashboard')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (username === 'user1' && password === '12345') {
      setIsLoggedIn(true)
      setError('')
      return
    }
    setError('Invalid username or password.')
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsUserMenuOpen(false)
    setActivePage('Dashboard')
  }

  const handlePageChange = (page) => {
    setActivePage(page)
    setIsUserMenuOpen(false)
  }

  const renderPage = () => {
    const sharedProps = {
      activePage,
      onPageChange: handlePageChange,
      isUserMenuOpen,
      onToggleMenu: () => setIsUserMenuOpen((open) => !open),
      onLogout: handleLogout,
      isNotificationsOpen,
      onToggleNotifications: () => setIsNotificationsOpen((open) => !open),
    }

    if (activePage === 'Reports') {
      return <ReportsPage {...sharedProps} />
    }

    if (activePage === 'ISO') {
      return <ISOPage {...sharedProps} />
    }

    if (activePage === 'DCC') {
      return <DCCPage {...sharedProps} />
    }

    return <DashboardPage {...sharedProps} />
  }

  return (
    <div className="page">
      <div className="bg-orb bg-orb--one" aria-hidden="true"></div>
      <div className="bg-orb bg-orb--two" aria-hidden="true"></div>

      {!isLoggedIn ? (
        <header className="brand">
          <div className="logo">
            <span className="logo-mark">Q</span>
            <span className="logo-text">Flow</span>
          </div>
          <p className="brand-subtitle">QUALITY MANAGEMENT SYSTEM</p>
        </header>
      ) : null}

      {isLoggedIn ? (
        renderPage()
      ) : (
        <Login
          username={username}
          password={password}
          error={error}
          onUsernameChange={(event) => setUsername(event.target.value)}
          onPasswordChange={(event) => setPassword(event.target.value)}
          onSubmit={handleSubmit}
          onLearnMore={() => setShowIntro(true)}
        />
      )}

      <IntroModal isOpen={showIntro} onClose={() => setShowIntro(false)} />
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  )
}

export default App
