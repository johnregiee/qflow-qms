import UserMenu from './UserMenu.jsx'

function Navbar({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  isNotificationsOpen,
  onToggleNotifications,
}) {
  const navItems = ['Dashboard', 'Reports', 'ISO', 'DCC']

  return (
    /* We add position: relative and z-index: 100 to the top header wrapper 
       to make sure it sits completely above the glassmorphism grid blur effects below it. */
    <header className="topbar" style={{ position: 'relative', zIndex: 100 }}>
      <div className="brand badge">
        <span className="badge-text">QFlow</span>
      </div>
      <nav className="nav">
        {navItems.map((item) => (
          <button
            key={item}
            className={`nav-item${activePage === item ? ' active' : ''}`}
            type="button"
            onClick={() => onPageChange(item)}
          >
            {item}
          </button>
        ))}
      </nav>
      <div className="search">
        <input type="search" placeholder="Search" />
      </div>
      
      {/* Wrapping the UserMenu inside a container that forces it to stack highest */}
      <div style={{ position: 'relative', zIndex: 110 }}>
        <UserMenu
          isOpen={isUserMenuOpen}
          onToggle={onToggleMenu}
          onLogout={onLogout}
          onPageChange={onPageChange}
          isNotificationsOpen={isNotificationsOpen}
          onToggleNotifications={onToggleNotifications}
        />
      </div>
    </header>
  )
}

export default Navbar