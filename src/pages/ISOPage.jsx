import Navbar from '../components/Navbar.jsx'

function ISOPage({
  activePage,
  onPageChange,
  isUserMenuOpen,
  onToggleMenu,
  onLogout,
  isNotificationsOpen,
  onToggleNotifications,
}) {
  return (
    <main className="dashboard">
      <Navbar
        activePage={activePage}
        onPageChange={onPageChange}
        isUserMenuOpen={isUserMenuOpen}
        onToggleMenu={onToggleMenu}
        onLogout={onLogout}
        isNotificationsOpen={isNotificationsOpen}
        onToggleNotifications={onToggleNotifications}
      />
      <section className="charts">
        <p className="charts-title">ISO Compliance Snapshot</p>
        <div className="chart chart--wide"></div>
        <div className="chart-grid">
          <div className="chart"></div>
          <div className="chart"></div>
        </div>
      </section>
    </main>
  )
}

export default ISOPage
