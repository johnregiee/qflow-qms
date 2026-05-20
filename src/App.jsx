import { useState } from 'react'
import './App.css'
import Login from './components/Login.jsx'
import IntroModal from './components/IntroModal.jsx'
import DashboardPage from './pages/DashboardPage.jsx'
import ReportsPage from './pages/ReportsPage.jsx'
import ISOPage from './pages/ISOPage.jsx'
import DCCPage from './pages/DCCPage.jsx'

// Clean Lucide-React icons for the integrated view layouts
import { 
  User as UserIcon, 
  ShieldAlert, 
  Mail, 
  Phone, 
  Briefcase, 
  IdCard, 
  Bell,
  X,
  AlertCircle,
  ArrowLeft,
  Upload,
  Folder,
  File,
  Image,
  Video
} from 'lucide-react'

export default function App() {
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

  // Safe Page Renderer Switch Container
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

    if (activePage === 'Profile') {
      return <UserInformationPage {...sharedProps} />
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

    return <DashboardPage {...sharedProps} onPageChange={handlePageChange} />
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
      
      {/* --- CENTRAL NOTIFICATIONS MODAL OVERLAY WITH SUB-NAVIGATION FLOW --- */}
      <NotificationsModal
        isOpen={isNotificationsOpen}
        onClose={() => setIsNotificationsOpen(false)}
      />
    </div>
  )
}

// --- MULTI-STEP NOTIFICATIONS & VERIFICATION WIZARD MODAL COMPONENT ---
function NotificationsModal({ isOpen, onClose }) {
  // Navigation tracking workflow modes: 'list' | 'detail' | 'verify' | 'upload'
  const [viewMode, setViewMode] = useState('list');
  const [verifyDetails, setVerifyDetails] = useState('');
  
  // Left sidebar selector option track for the integrated media file explorer modal view
  const [activeExplorerTab, setActiveExplorerTab] = useState('Download');

  if (!isOpen) return null;

  // Resets modal wizard layout parameters safely on close actions
  const handleCloseDismiss = () => {
    setViewMode('list');
    onClose();
  };

  // Mock array rendering 18 thumbnail layout placeholder cross grids to match wireframe exactly
  const mediaGridPlaceholders = Array.from({ length: 18 }, (_, index) => index);

  return (
    <div 
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: '2000',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(4, 9, 20, 0.8)',
        backdropFilter: 'blur(10px)',
        WebkitBackdropFilter: 'blur(10px)'
      }}
    >
      <div 
        style={{
          width: '95%',
          maxWidth: viewMode === 'list' ? '640px' : viewMode === 'detail' ? '820px' : viewMode === 'verify' ? '680px' : '900px',
          background: 'rgba(13, 26, 45, 0.95)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          padding: viewMode === 'upload' ? '0' : '32px', 
          boxShadow: '0 30px 60px rgba(0, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
          position: 'relative',
          boxSizing: 'border-box',
          color: '#f8fafc',
          overflow: 'hidden',
          transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      >
        
        {/* --- RENDERING STANDALONE HEADER BUTTONS FOR NORMAL STEPS --- */}
        {viewMode !== 'upload' && (
          <>
            <button 
              type="button"
              onClick={handleCloseDismiss}
              style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px' }}
            >
              <X size={18} />
            </button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '16px' }}>
              {viewMode === 'detail' ? (
                <button onClick={() => setViewMode('list')} style={backLinkButtonStyle}>
                  <ArrowLeft size={16} /> Back to Notifications
                </button>
              ) : viewMode === 'verify' ? (
                <button onClick={() => setViewMode('detail')} style={backLinkButtonStyle}>
                  <ArrowLeft size={16} /> Back to Request Details
                </button>
              ) : (
                <>
                  <Bell size={18} style={{ color: '#22d3ee' }} />
                  <h3 style={{ margin: 0, fontSize: '16px', fontWeight: '600' }}>Notifications</h3>
                </>
              )}
            </div>
          </>
        )}

        {/* --- STEP VIEW MODE 1: SUMMARY NOTICES LIST --- */}
        {viewMode === 'list' && (
          <div 
            onClick={() => setViewMode('detail')} 
            style={{ 
              background: 'rgba(8, 18, 35, 0.5)', 
              border: '1px solid rgba(6, 182, 212, 0.25)', 
              borderRadius: '8px', padding: '20px', textAlign: 'left', display: 'flex', gap: '14px', alignItems: 'flex-start', cursor: 'pointer'
            }}
            onMouseEnter={(e) => e.currentTarget.style.borderColor = '#22d3ee'}
            onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.25)'}
          >
            <AlertCircle size={18} style={{ color: '#22d3ee', marginTop: '2px', minWidth: '18px' }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              <h4 style={{ margin: 0, fontSize: '14px', fontWeight: '600', color: '#f8fafc' }}>Verification Deadline Reached:</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1', lineHeight: '1.5' }}>Please verify the effectiveness of the corrective action for this complaint as soon as possible.</p>
            </div>
          </div>
        )}

        {/* --- STEP VIEW MODE 2: SPLIT SCREEN REQUEST INSPECTION GRID --- */}
        {viewMode === 'detail' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', textAlign: 'left' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.05)', borderLeft: '3px solid #06b6d4', padding: '16px', borderRadius: '4px' }}>
              <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', fontWeight: '600', color: '#f8fafc' }}>Verification Deadline Reached:</h4>
              <p style={{ margin: 0, fontSize: '13px', color: '#cbd5e1' }}>Please verify the effectiveness of the corrective action for this complaint as soon as possible.</p>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div style={detailWindowBlockStyle}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px' }}>
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><UserIcon size={14} style={{ color: '#22d3ee' }} /></div>
                  <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '12px', fontWeight: '600', color: '#f8fafc' }}>Name of the User</span><span style={{ fontSize: '9px', color: '#64748b' }}>Position • Location • Date and Time</span></div>
                </div>
                <div style={{ textAlign: 'left', marginBottom: '8px' }}><span style={{ fontSize: '12px', fontWeight: '500', color: '#94a3b8' }}>Details</span></div>
                <div style={innerWireframeFrameStyle}><span style={{ fontSize: '11px', color: '#475569' }}>Evidence & Action Artifacts</span></div>
              </div>
              <div style={detailWindowBlockStyle}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', height: '28px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column' }}><span style={{ fontSize: '12px', fontWeight: '600', color: '#f8fafc' }}>Name of the User</span><span style={{ fontSize: '9px', color: '#64748b' }}>Position • Date and Time</span></div>
                  <button onClick={() => setViewMode('verify')} style={verifyTriggerButtonStyle} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.25)'} onMouseLeave={(e) => e.currentTarget.style.background = 'rgba(6, 182, 212, 0.12)'}>Verify Effectiveness</button>
                </div>
                <div style={{ height: '14px', marginBottom: '8px' }}></div>
                <div style={innerWireframeFrameStyle}><span style={{ fontSize: '11px', color: '#475569' }}>Corrective Analysis Canvas</span></div>
              </div>
            </div>
          </div>
        )}

        {/* --- STEP VIEW MODE 3: FINALIZE VERIFY EFFECTIVENESS FORM PANEL --- */}
        {viewMode === 'verify' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', margin: 0, textAlign: 'left' }}>
            <div>
              <label style={formLabelStyle}>Evidence:</label>
              <div 
                onClick={() => setViewMode('upload')}
                style={{
                  border: '2px dashed rgba(6, 182, 212, 0.3)', background: 'rgba(8, 18, 35, 0.4)', borderRadius: '8px', padding: '24px 20px', textAlign: 'center', cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', transition: 'border-color 0.2s'
                }}
                onMouseEnter={(e) => e.currentTarget.style.borderColor = '#06b6d4'}
                onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(6, 182, 212, 0.3)'}
              >
                <Upload size={20} style={{ color: '#06b6d4' }} />
                <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>Upload an Image</span>
              </div>
            </div>
            <div>
              <label style={formLabelStyle}>Details:</label>
              <textarea value={verifyDetails} onChange={(e) => setVerifyDetails(e.target.value)} style={formTextareaStyle} placeholder="Provide comprehensive summary logs validating corrective measure closure effectiveness details..." />
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '20px', marginTop: '8px' }}>
              <button type="button" onClick={handleCloseDismiss} style={gradientExecuteButtonStyle}>Verify Effectiveness</button>
            </div>
          </div>
        )}

        {/* --- STEP VIEW MODE 4: ASSET UPLOAD FILE MANAGER GRID PANEL --- */}
        {viewMode === 'upload' && (
          <div style={{ display: 'flex', height: '520px', width: '100%', position: 'relative' }}>
            
            <button 
              type="button" 
              onClick={() => setViewMode('verify')}
              style={{ position: 'absolute', right: '24px', top: '24px', background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', zIndex: '50' }}
            >
              <X size={18} />
            </button>

            {/* Left Sidebar Tab Switch Column */}
            <div style={{ width: '180px', background: 'rgba(8, 18, 35, 0.4)', borderRight: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px 16px', display: 'flex', flexDirection: 'column', gap: '8px', boxSizing: 'border-box' }}>
              <h4 style={{ margin: '0 0 16px 0', fontSize: '15px', fontWeight: '600', color: '#22d3ee', textAlign: 'left', tracking: '0.02em' }}>Location</h4>
              <button type="button" onClick={() => setActiveExplorerTab('Download')} style={{ ...explorerTabButtonStyle, background: activeExplorerTab === 'Download' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: activeExplorerTab === 'Download' ? '#22d3ee' : '#94a3b8' }}><Folder size={14} /> Download</button>
              <button type="button" onClick={() => setActiveExplorerTab('Documents')} style={{ ...explorerTabButtonStyle, background: activeExplorerTab === 'Documents' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: activeExplorerTab === 'Documents' ? '#22d3ee' : '#94a3b8' }}><File size={14} /> Documents</button>
              <button type="button" onClick={() => setActiveExplorerTab('Pictures')} style={{ ...explorerTabButtonStyle, background: activeExplorerTab === 'Pictures' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: activeExplorerTab === 'Pictures' ? '#22d3ee' : '#94a3b8' }}><Image size={14} /> Pictures</button>
              <button type="button" onClick={() => setActiveExplorerTab('Videos')} style={{ ...explorerTabButtonStyle, background: activeExplorerTab === 'Videos' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: activeExplorerTab === 'Videos' ? '#22d3ee' : '#94a3b8' }}><Video size={14} /> Videos</button>
            </div>

            {/* Right Side File Grid & Action Footer Section */}
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
              <div style={{ padding: '24px 24px 12px 24px', textAlign: 'left' }}>
                <h3 style={{ margin: '0', fontSize: '18px', fontWeight: '600', color: '#f8fafc' }}>{activeExplorerTab}</h3>
              </div>

              {/* Central Thumbnail Grid Canvas Container */}
              <div style={{ flex: '1', padding: '0 24px 24px 24px', display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '12px', overflowY: 'auto', maxHeight: '360px', boxSizing: 'border-box' }}>
                {mediaGridPlaceholders.map((item) => (
                  <div 
                    key={item}
                    style={{ aspectRatio: '1', background: 'rgba(8, 18, 35, 0.5)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', transition: 'border-color 0.2s' }}
                    onMouseEnter={(e) => e.currentTarget.style.borderColor = '#06b6d4'}
                    onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)'}
                  >
                    <div style={{ position: 'absolute', inset: 0, opacity: '0.04', pointerEvents: 'none', background: 'linear-gradient(135deg, transparent 49.5%, #fff 49.5%, #fff 50.5%, transparent 50.5%), linear-gradient(45deg, transparent 49.5%, #fff 49.5%, #fff 50.5%, transparent 50.5%)' }}></div>
                    <Image size={16} style={{ color: '#334155' }} />
                  </div>
                ))}
              </div>

              {/* Bottom Actions Confirmation Row Footer Panel */}
              <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255, 255, 255, 0.08)', background: 'rgba(8, 18, 35, 0.2)', display: 'flex', justifyContent: 'flex-end', gap: '12px', boxSizing: 'border-box' }}>
                <button type="button" onClick={() => setViewMode('verify')} style={explorerFooterCancelButtonStyle} onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'} onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}>Cancel</button>
                <button type="button" onClick={() => setViewMode('verify')} style={explorerFooterUploadButtonStyle} onMouseEnter={(e) => e.currentTarget.style.opacity = '0.9'} onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}>Upload</button>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

// --- SAFE INTEGRATED PROFILE LAYOUT VIEW WITH SETTINGS SUB-TABS ---
function UserInformationPage({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  onToggleNotifications,
}) {
  const [currentTab, setCurrentTab] = useState('User Information');
  const [currentSubTab, setCurrentSubTab] = useState('Profile & Account');
  const [dateRange, setDateRange] = useState('7');

  return (
    <div style={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '64px', borderBottom: '1px solid rgba(255,255,255,0.05)', padding: '0 24px', background: 'rgba(10, 20, 36, 0.8)', backdropFilter: 'blur(12px)', position: 'relative', zIndex: '50' }}>
        <div onClick={() => onPageChange('Dashboard')} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <div style={{ display: 'flex', height: '32px', width: '32px', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: 'linear-gradient(135deg, #22d3ee, #3b82f6)', fontWeight: 'bold', color: 'white' }}>
            <span style={{ alignSelf: 'center' }}>Q</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
            <span style={{ fontSize: '16px', fontWeight: '600', color: '#22d3ee', lineHeight: '1.2' }}>QFlow</span>
            <span style={{ fontSize: '8px', textTransform: 'uppercase', color: '#94a3b8', lineHeight: '1' }}>Quality Management System</span>
          </div>
        </div>

        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <button onClick={() => onPageChange('Dashboard')} style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '6px 12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Dashboard</button>
          <button onClick={() => onPageChange('Reports')} style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '6px 12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>Reports</button>
          <button onClick={() => onPageChange('ISO')} style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '6px 12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>ISO</button>
          <button onClick={() => onPageChange('DCC')} style={{ background: 'none', border: 'none', color: '#94a3b8', padding: '6px 12px', fontSize: '14px', fontWeight: '500', cursor: 'pointer' }}>DCC</button>
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          <button onClick={onToggleNotifications} style={{ background: 'none', border: 'none', color: '#94a3b8', cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
            <Bell size={18} />
          </button>
          <div onClick={onToggleMenu} style={{ display: 'flex', alignItems: 'center', gap: '10px', borderLeft: '1px solid rgba(255,255,255,0.1)', paddingLeft: '16px', cursor: 'pointer' }}>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '2px' }}>
              <span style={{ fontSize: '12px', fontWeight: '500', color: '#e2e8f0' }}>Name of the User</span>
              <span style={{ fontSize: '10px', color: '#64748b' }}>Position</span>
            </div>
            <div style={{ height: '32px', width: '32px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', border: '1px solid rgba(255,255,255,0.1)' }}></div>
          </div>
        </div>
      </header>

      {isUserMenuOpen && (
        <div style={{ position: 'absolute', right: '24px', top: '60px', background: '#0d1b31', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '4px', minWidth: '160px', display: 'flex', flexDirection: 'column', zIndex: '100', boxShadow: '0 10px 25px rgba(0,0,0,0.5)' }}>
          <button onClick={() => onPageChange('Profile')} style={{ background: 'none', border: 'none', color: '#22d3ee', padding: '10px 12px', textAlign: 'left', fontSize: '13px', cursor: 'pointer', borderRadius: '4px' }}>User Information</button>
          <button onClick={() => onPageChange('Profile')} style={{ background: 'none', border: 'none', color: '#cbd5e1', padding: '10px 12px', textAlign: 'left', fontSize: '13px', cursor: 'pointer', borderRadius: '4px' }}>Settings</button>
          <button onClick={onLogout} style={{ background: 'none', border: 'none', color: '#ef4444', padding: '10px 12px', textAlign: 'left', fontSize: '13px', cursor: 'pointer', borderRadius: '4px', borderTop: '1px solid rgba(255,255,255,0.05)' }}>Logout</button>
        </div>
      )}

      <div style={{ width: '95%', maxWidth: '1050px', margin: '40px auto', position: 'relative', zIndex: '10', boxSizing: 'border-box' }}>
        <div style={{ display: 'flex', gap: '4px', paddingLeft: '8px' }}>
          <button onClick={() => setCurrentTab('User Information')} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.12)', borderBottom: 'none', borderRadius: '8px 8px 0 0', transition: 'all 0.2s ease', background: currentTab === 'User Information' ? 'rgba(13, 26, 45, 0.65)' : 'transparent', color: currentTab === 'User Information' ? '#22d3ee' : '#64748b' }}>User Information</button>
          <button onClick={() => setCurrentTab('Settings')} style={{ padding: '12px 24px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: '1px solid rgba(255, 255, 255, 0.12)', borderBottom: 'none', borderRadius: '8px 8px 0 0', transition: 'all 0.2s ease', background: currentTab === 'Settings' ? 'rgba(13, 26, 45, 0.65)' : 'transparent', color: currentTab === 'Settings' ? '#22d3ee' : '#64748b' }}>Settings</button>
        </div>

        <div style={{ width: '100%', background: 'rgba(13, 26, 45, 0.65)', border: '1px solid rgba(255, 255, 255, 0.12)', backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)', borderRadius: '0 12px 12px 12px', padding: '32px', boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1)', boxSizing: 'border-box' }}>
          {currentTab === 'User Information' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              <div style={{ display: 'flex', textDirection: 'row', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '24px' }}>
                <div style={{ width: '72px', height: '72px', borderRadius: '50%', background: 'rgba(255, 255, 255, 0.15)', border: '2px solid #06b6d4', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)' }}>
                  <UserIcon size={32} style={{ color: '#22d3ee' }} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '600', color: '#f8fafc' }}>Name of the User</h2>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Age</span>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxWidth: '550px', width: '100%', textAlign: 'left' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><IdCard size={16} style={{ color: '#64748b', minWidth: '16px' }} /><span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Username:</span><div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><ShieldAlert size={16} style={{ color: '#64748b', minWidth: '16px' }} /><span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Employee Department:</span><div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Briefcase size={16} style={{ color: '#64748b', minWidth: '16px' }} /><span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Position:</span><div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Mail size={16} style={{ color: '#64748b', minWidth: '16px' }} /><span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Email Address:</span><div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div></div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}><Phone size={16} style={{ color: '#64748b', minWidth: '16px' }} /><span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Contact No.:</span><div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div></div>
              </div>
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '32px', minHeight: '420px', width: '100%' }}>
              <div style={{ width: '200px', display: 'flex', flexDirection: 'column', gap: '8px', textAlign: 'left', borderRight: '1px solid rgba(255,255,255,0.06)', paddingRight: '20px' }}>
                <button onClick={() => setCurrentSubTab('Profile & Account')} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: 'none', transition: 'all 0.2s', background: currentSubTab === 'Profile & Account' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: currentSubTab === 'Profile & Account' ? '#22d3ee' : '#94a3b8' }}>Profile & Account</button>
                <button onClick={() => setCurrentSubTab('Reporting Defaults')} style={{ width: '100%', textAlign: 'left', padding: '10px 14px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', border: 'none', transition: 'all 0.2s', background: currentSubTab === 'Reporting Defaults' ? 'rgba(6, 182, 212, 0.12)' : 'transparent', color: currentSubTab === 'Reporting Defaults' ? '#22d3ee' : '#94a3b8' }}>Reporting Defaults</button>
              </div>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '32px', textAlign: 'left' }}>
                {currentSubTab === 'Profile & Account' ? (
                  <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '32px', margin: '0' }}>
                    <div>
                      <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '500', color: '#f8fafc' }}>Edit Profile:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <div><label style={subLabelStyle}>First Name:</label><input type="text" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Middle Name:</label><input type="text" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Last Name:</label><input type="text" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Email Address:</label><input type="email" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Username:</label><input type="text" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Contact No.:</label><input type="text" style={subInputStyle} /></div>
                      </div>
                    </div>
                    <div>
                      <h4 style={{ margin: '0 0 16px 0', fontSize: '14px', fontWeight: '500', color: '#f8fafc' }}>Change Password:</h4>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
                        <div><label style={subLabelStyle}>Current Password:</label><input type="password" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>New Password:</label><input type="password" style={subInputStyle} /></div>
                        <div><label style={subLabelStyle}>Confirm New Password:</label><input type="password" style={subInputStyle} /></div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '8px' }}>
                      <button type="submit" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)', border: 'none', color: 'white', padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)' }}>Update Changes</button>
                    </div>
                  </form>
                ) : (
                  <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', flexDirection: 'column', gap: '32px', margin: '0', height: '100%', justifyContent: 'space-between' }}>
                    <div>
                      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: '500', color: '#f8fafc' }}>Preferred Date Range:</h4>
                      <div style={{ maxWidth: '280px', width: '100%' }}>
                        <label style={{ display: 'block', fontSize: '12px', color: '#94a3b8', marginBottom: '8px' }}>Days:</label>
                        <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} style={{ width: '100%', height: '38px', background: 'rgba(8, 18, 35, 0.6)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '6px', padding: '0 12px', fontSize: '13px', color: '#e2e8f0', outline: 'none', cursor: 'pointer', colorScheme: 'dark', boxSizing: 'border-box' }}>
                          <option value="7">Last 7 Days</option>
                          <option value="30">Last 30 Days</option>
                          <option value="90">Last 90 Days</option>
                          <option value="365">Last Year</option>
                        </select>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto', paddingTop: '40px' }}>
                      <button type="submit" style={{ background: 'linear-gradient(to right, #06b6d4, #3b82f6)', border: 'none', color: 'white', padding: '10px 24px', borderRadius: '6px', fontSize: '13px', fontWeight: '500', cursor: 'pointer', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)' }}>Update Changes</button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// --- SHARED USER DROPDOWN COMPONENT HOOK ---
export function UserMenu({ isOpen, onToggle, onLogout, onPageChange, onToggleNotifications }) {
  return (
    <div className="user">
      <button className="bell-button" type="button" onClick={onToggleNotifications} aria-label="Show notifications">
        <span className="bell" aria-hidden="true"></span>
      </button>
      <button className="user-trigger" type="button" onClick={onToggle} aria-haspopup="menu" aria-expanded={isOpen}>
        <div className="avatar" aria-hidden="true"></div>
        <div className="user-info">
          <span className="user-name">Name of the User</span>
          <span className="user-role">Position</span>
        </div>
      </button>
      {isOpen ? (
        <div className="user-menu" role="menu">
          <button className="menu-item" type="button" role="menuitem" onClick={() => onPageChange('Profile')}>User Information</button>
          <button className="menu-item" type="button" role="menuitem" onClick={() => onPageChange('Profile')}>Settings</button>
          <button className="menu-item" type="button" role="menuitem" onClick={onLogout}>Logout</button>
        </div>
      ) : null}
    </div>
  )
}

// --- REUSABLE MODAL LAYOUT STYLE PARAMETERS ---
const backLinkButtonStyle = { background: 'none', border: 'none', color: '#22d3ee', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', padding: '0' };
const detailWindowBlockStyle = { flex: '1', background: 'rgba(8, 18, 35, 0.35)', border: '1px solid rgba(255, 255, 255, 0.08)', borderRadius: '12px', padding: '20px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' };
const innerWireframeFrameStyle = { width: '100%', height: '200px', background: 'rgba(8, 18, 35, 0.5)', border: '1px solid rgba(255, 255, 255, 0.05)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const formLabelStyle = { display: 'block', fontSize: '12px', fontWeight: '500', color: '#94a3b8', marginBottom: '6px', textAlign: 'left' };
const formTextareaStyle = { width: '100%', height: '140px', background: 'rgba(8, 18, 35, 0.5)', border: '1px solid rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '12px', fontSize: '13px', color: '#e2e8f0', outline: 'none', resize: 'none', boxSizing: 'border-box' };
const gradientExecuteButtonStyle = { background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', border: 'none', color: 'white', padding: '12px 48px', borderRadius: '8px', fontSize: '13px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 4px 15px rgba(6, 182, 212, 0.25)' };

const explorerTabButtonStyle = {
  width: '100%', border: 'none', textAlign: 'left', padding: '10px 14px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', transition: 'all 0.2s ease'
};

const explorerFooterCancelButtonStyle = {
  background: 'transparent', border: '1px solid rgba(255, 255, 255, 0.15)', color: '#94a3b8', padding: '8px 20px', borderRadius: '6px', fontSize: '12px', fontWeight: '500', cursor: 'pointer', transition: 'background 0.2s'
};

const explorerFooterUploadButtonStyle = {
  background: 'linear-gradient(135deg, #06b6d4, #3b82f6)', border: 'none', color: 'white', padding: '8px 24px', borderRadius: '6px', fontSize: '12px', fontWeight: '600', cursor: 'pointer', boxShadow: '0 2px 10px rgba(6, 182, 212, 0.2)'
};

const verifyTriggerButtonStyle = {
  background: 'rgba(6, 182, 212, 0.12)', border: '1px solid rgba(6, 182, 212, 0.3)', color: '#22d3ee', fontSize: '10px', fontWeight: '600', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', transition: 'background 0.2s'
};