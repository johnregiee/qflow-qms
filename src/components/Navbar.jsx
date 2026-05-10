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
    <header className="topbar">
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
      <UserMenu
        isOpen={isUserMenuOpen}
        onToggle={onToggleMenu}
        onLogout={onLogout}
        isNotificationsOpen={isNotificationsOpen}
        onToggleNotifications={onToggleNotifications}
      />
    </header>
  )
}

export default Navbar
