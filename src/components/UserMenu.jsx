import React from 'react'
import { Bell } from 'lucide-react' // <-- Added native icon import

function UserMenu({ 
  isOpen, 
  onToggle, 
  onLogout, 
  onPageChange, 
  isNotificationsOpen, 
  onToggleNotifications 
}) {
  return (
    <div className="user" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
      
      {/* --- REFRESHED NOTIFICATIONS BELL ICON --- */}
      <button
        className="bell-button"
        type="button"
        onClick={onToggleNotifications}
        aria-label="Show notifications"
        style={{
          background: 'none',
          border: 'none',
          color: isNotificationsOpen ? '#22d3ee' : '#94a3b8',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '6px',
          borderRadius: '50%',
          transition: 'all 0.2s ease',
          position: 'relative'
        }}
        onMouseEnter={(e) => e.currentTarget.style.color = '#22d3ee'}
        onMouseLeave={(e) => e.currentTarget.style.color = isNotificationsOpen ? '#22d3ee' : '#94a3b8'}
      >
        <Bell size={18} />
        
        {/* Optional: Small status dot if there are unread notifications */}
        <span 
          style={{
            position: 'absolute',
            top: '4px',
            right: '4px',
            width: '6px',
            height: '6px',
            background: '#22d3ee',
            borderRadius: '50%',
            boxShadow: '0 0 8px #22d3ee'
          }} 
        />
      </button>

      {/* User Avatar & Name Trigger */}
      <button
        className="user-trigger"
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
        style={{
          background: 'none',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          padding: 0
        }}
      >
        <div className="avatar" aria-hidden="true"></div>
        <div className="user-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <span className="user-name">Name of the User</span>
          <span className="user-role">Position</span>
        </div>
      </button>

      {/* Dropdown Options Popup List */}
      {isOpen ? (
        <div 
          className="user-menu" 
          role="menu"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            marginTop: '8px',
            background: '#0d1b31',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '8px',
            padding: '4px',
            minWidth: '160px',
            display: 'flex',
            flexDirection: 'column',
            zIndex: '1000',
            boxShadow: '0 10px 25px rgba(0,0,0,0.5)'
          }}
        >
          <button 
            className="menu-item" 
            type="button" 
            role="menuitem"
            onClick={() => onPageChange('Profile')}
            style={menuItemStyle}
          >
            User Information
          </button>
          <button 
            className="menu-item" 
            type="button" 
            role="menuitem"
            onClick={() => onPageChange('Profile')}
            style={menuItemStyle}
          >
            Settings
          </button>
          <button
            className="menu-item"
            type="button"
            role="menuitem"
            onClick={onLogout}
            style={{ ...menuItemStyle, color: '#ef4444', borderTop: '1px solid rgba(255,255,255,0.05)', marginTop: '4px', pt: '8px' }}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

const menuItemStyle = {
  background: 'none',
  border: 'none',
  color: '#cbd5e1',
  padding: '10px 12px',
  textAlign: 'left',
  fontSize: '13px',
  cursor: 'pointer',
  borderRadius: '4px',
  width: '100%'
};

export default UserMenu