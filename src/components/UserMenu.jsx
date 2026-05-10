function UserMenu({ isOpen, onToggle, onLogout, isNotificationsOpen, onToggleNotifications }) {
  return (
    <div className="user">
      <button
        className="bell-button"
        type="button"
        onClick={onToggleNotifications}
        aria-label="Show notifications"
      >
        <span className="bell" aria-hidden="true"></span>
      </button>
      <button
        className="user-trigger"
        type="button"
        onClick={onToggle}
        aria-haspopup="menu"
        aria-expanded={isOpen}
      >
        <div className="avatar" aria-hidden="true"></div>
        <div className="user-info">
          <span className="user-name">Name of the User</span>
          <span className="user-role">Position</span>
        </div>
      </button>
      {isOpen ? (
        <div className="user-menu" role="menu">
          <button className="menu-item" type="button" role="menuitem">
            User Information
          </button>
          <button className="menu-item" type="button" role="menuitem">
            Settings
          </button>
          <button
            className="menu-item"
            type="button"
            role="menuitem"
            onClick={onLogout}
          >
            Logout
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default UserMenu
