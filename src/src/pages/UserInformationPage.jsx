import React, { useState } from 'react';
import Navbar from '../components/Navbar.jsx';
import { User, ShieldAlert, Mail, Phone, Briefcase, IdentificationCard } from 'lucide-react';

function UserInformationPage({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  isNotificationsOpen,
  onToggleNotifications,
}) {
  // Handles toggle behavior between 'User Information' and 'Settings' tabs
  const [currentTab, setCurrentTab] = useState('User Information');

  return (
    <main className="dashboard">
      {/* Kept your team's custom Navbar intact so global events work */}
      <Navbar
        activePage={activePage}
        onPageChange={onPageChange}
        isUserMenuOpen={isUserMenuOpen}
        onToggleMenu={onToggleMenu}
        onLogout={onLogout}
        isNotificationsOpen={isNotificationsOpen}
        onToggleNotifications={onToggleNotifications}
      />

      {/* --- WORKSPACE PANEL --- */}
      <div 
        style={{ 
          width: '95%', 
          maxWidth: '1000px',
          margin: '40px auto',
          position: 'relative',
          zIndex: '10',
          boxSizing: 'border-box'
        }}
      >
        
        {/* --- TAB SWITCH CONTROLS --- */}
        <div style={{ display: 'flex', gap: '4px', paddingLeft: '8px' }}>
          
          {/* User Information Tab Option */}
          <button
            onClick={() => setCurrentTab('User Information')}
            style={{
              padding: '12px 24px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              background: currentTab === 'User Information' ? 'rgba(13, 26, 45, 0.95)' : 'transparent',
              color: currentTab === 'User Information' ? '#22d3ee' : '#64748b',
              boxShadow: currentTab === 'User Information' ? '0 -4px 12px rgba(6, 182, 212, 0.05)' : 'none'
            }}
          >
            User Information
          </button>

          {/* Settings Tab Option */}
          <button
            onClick={() => setCurrentTab('Settings')}
            style={{
              padding: '12px 24px',
              fontSize: '13px',
              fontWeight: '500',
              cursor: 'pointer',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              borderBottom: 'none',
              borderRadius: '8px 8px 0 0',
              transition: 'all 0.2s ease',
              background: currentTab === 'Settings' ? 'rgba(13, 26, 45, 0.95)' : 'transparent',
              color: currentTab === 'Settings' ? '#22d3ee' : '#64748b',
              boxShadow: currentTab === 'Settings' ? '0 -4px 12px rgba(6, 182, 212, 0.05)' : 'none'
            }}
          >
            Settings
          </button>
        </div>

        {/* --- TRANSLUCENT GLASS CARD PANEL CONTAINER --- */}
        <div 
          style={{ 
            width: '100%', 
            background: 'rgba(13, 26, 45, 0.65)', 
            border: '1px solid rgba(255, 255, 255, 0.12)', 
            backdropFilter: 'blur(16px)', 
            WebkitBackdropFilter: 'blur(16px)', 
            borderRadius: '0 12px 12px 12px', 
            padding: '40px 32px', 
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.45), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
            boxSizing: 'border-box'
          }}
        >
          
          {currentTab === 'User Information' ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              
              {/* Profile Avatar Header Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '20px', borderBottom: '1px solid rgba(255,255,255,0.06)', paddingBottom: '24px' }}>
                <div 
                  style={{ 
                    width: '72px', 
                    height: '72px', 
                    borderRadius: '50%', 
                    background: 'rgba(255, 255, 255, 0.15)', 
                    border: '2px solid #06b6d4',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 15px rgba(6, 182, 212, 0.2)'
                  }}
                >
                  <User size={32} style={{ color: '#22d3ee' }} />
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', textAlign: 'left' }}>
                  <h2 style={{ margin: '0', fontSize: '20px', fontWeight: '600', color: '#f8fafc' }}>Name of the User</h2>
                  <span style={{ fontSize: '13px', color: '#94a3b8' }}>Age</span>
                </div>
              </div>

              {/* Data Rows Stack List Layout */}
              <div 
                style={{ 
                  display: 'flex', 
                  flexDirection: 'column',
                  gap: '20px', 
                  maxWidth: '550px',
                  width: '100%',
                  textAlign: 'left' 
                }}
              >
                {/* Username */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <IdentificationCard size={16} style={{ color: '#64748b', minWidth: '16px' }} />
                  <span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Username:</span>
                  <div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div>
                </div>

                {/* Employee Department */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <ShieldAlert size={16} style={{ color: '#64748b', minWidth: '16px' }} />
                  <span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Employee Department:</span>
                  <div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div>
                </div>

                {/* Position */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Briefcase size={16} style={{ color: '#64748b', minWidth: '16px' }} />
                  <span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Position:</span>
                  <div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div>
                </div>

                {/* Email Address */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Mail size={16} style={{ color: '#64748b', minWidth: '16px' }} />
                  <span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Email Address:</span>
                  <div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div>
                </div>

                {/* Contact No. */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                  <Phone size={16} style={{ color: '#64748b', minWidth: '16px' }} />
                  <span style={{ width: '160px', fontSize: '13px', color: '#94a3b8' }}>Contact No.:</span>
                  <div style={{ flex: '1', fontSize: '13px', color: '#f1f5f9', fontWeight: '500' }}>—</div>
                </div>

              </div>

            </div>
          ) : (
            /* Settings Fallback content viewport */
            <div style={{ textAlign: 'left', color: '#94a3b8', fontSize: '13px' }}>
              Account configuration and global preferences setup panel options.
            </div>
          )}

        </div>

      </div>
    </main>
  );
}

export default UserInformationPage;