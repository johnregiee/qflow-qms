import Navbar from '../components/Navbar.jsx'
import { Folder, FileSpreadsheet, Search } from 'lucide-react' // Lucide icons for folders and sheets

function DCCPage({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  isNotificationsOpen,
  onToggleNotifications,
}) {
  // Array matching folders A to I from your wireframe
  const folders = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];

  return (
    <main className="dashboard">
      {/* Keeping your global Navbar functional and identical */}
      <Navbar
        activePage={activePage}
        onPageChange={onPageChange}
        isUserMenuOpen={isUserMenuOpen}
        onToggleMenu={onToggleMenu}
        onLogout={onLogout}
        isNotificationsOpen={isNotificationsOpen}
        onToggleNotifications={onToggleNotifications}
      />

      {/* --- CONTENT WORKSPACE CONTAINER --- */}
      <div 
        style={{ 
          display: 'flex', 
          flexDirection: 'column',
          width: '95%', 
          maxWidth: '1200px',
          margin: '32px auto',
          position: 'relative',
          zIndex: '10',
          boxSizing: 'border-box'
        }}
      >
        
        {/* Main Central Translucent Glassmorphic Container */}
        <div 
          style={{ 
            width: '100%', 
            background: 'rgba(13, 26, 45, 0.65)', 
            border: '1px solid rgba(255, 255, 255, 0.12)', 
            backdropFilter: 'blur(16px)', 
            WebkitBackdropFilter: 'blur(16px)', 
            borderRadius: '12px', 
            padding: '32px 24px', 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1)' 
          }}
        >
          
          {/* --- INTERNAL SEARCH BAR --- */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px' }}>
            <div style={{ position: 'relative', width: '100%', maxWidth: '500px' }}>
              <input 
                type="text" 
                placeholder="Search documents or folders..." 
                style={{ 
                  width: '100%',
                  height: '38px', 
                  borderRadius: '8px', 
                  border: '1px solid rgba(255, 255, 255, 0.1)', 
                  bg: '#0d1b2f',
                  background: 'rgba(13, 27, 49, 0.8)',
                  paddingLeft: '16px', 
                  paddingRight: '40px', 
                  fontSize: '13px', 
                  color: '#slate-200',
                  colorScheme: 'dark',
                  outline: 'none',
                  boxSizing: 'border-box'
                }}
              />
              <Search size={16} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
            </div>
          </div>

          {/* --- FOLDERS ROW / GRID SYSTEM --- */}
          <div 
            style={{ 
              display: 'grid', 
              gridTemplateColumns: 'repeat(auto-fit, minmax(80px, 1fr))', 
              gap: '20px', 
              width: '100%',
              marginBottom: '48px'
            }}
          >
            {folders.map((folderName) => (
              <div 
                key={folderName}
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center', 
                  gap: '8px',
                  cursor: 'pointer',
                  transition: 'transform 0.2s'
                }}
                className="folder-item"
              >
                <Folder 
                  size={44} 
                  style={{ 
                    fill: 'rgba(6, 182, 212, 0.15)', 
                    stroke: '#06b6d4', 
                    strokeWidth: '1.5px',
                    filter: 'drop-shadow(0 0 8px rgba(6, 182, 212, 0.2))'
                  }} 
                />
                <span style={{ fontSize: '13px', color: '#cbd5e1', fontWeight: '500' }}>{folderName}</span>
              </div>
            ))}
          </div>

          {/* --- RECENTLY VIEWED SECTION --- */}
          <div style={{ textAlign: 'left', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '28px' }}>
            <h4 style={{ margin: '0 0 16px 0', fontSize: '13px', fontWeight: '500', color: '#94a3b8', letterSpacing: '0.02em' }}>
              Recently Viewed
            </h4>
            
            {/* File List Item Card */}
            <div 
              style={{ 
                display: 'inline-flex', 
                alignItems: 'center', 
                gap: '12px',
                background: 'rgba(8, 18, 35, 0.4)',
                border: '1px solid rgba(255, 255, 255, 0.05)',
                padding: '12px 16px',
                borderRadius: '8px',
                cursor: 'pointer'
              }}
            >
              <FileSpreadsheet 
                size={22} 
                style={{ 
                  color: '#10b981', // Classic excel green tone optimized for dark contrast
                  filter: 'drop-shadow(0 0 6px rgba(16, 185, 129, 0.2))' 
                }} 
              />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                <span style={{ fontSize: '13px', fontWeight: '500', color: '#f8fafc' }}>
                  Trainees Attendance
                </span>
                <span style={{ fontSize: '10px', color: '#64748b' }}>
                  A/test/Trainees Attendance.xlsx
                </span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </main>
  )
}

export default DCCPage