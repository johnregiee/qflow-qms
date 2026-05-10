function NotificationsModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="notifications-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="notifications-title" className="modal-title">
            Notifications
          </h2>
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close notifications"
          >
            ×
          </button>
        </div>
        
        <div className="notifications-list">
          <div className="notification-item">
            <h3>Verification Deadline Reached.</h3>
            <p>Please verify the effectiveness of the corrective action for this complaint as soon as possible.</p>
            
            <div className="notification-reviewers">
              <div className="reviewer">
                <div className="reviewer-avatar"></div>
                <span className="reviewer-name">Name of the User</span>
              </div>
              <div className="reviewer">
                <div className="reviewer-avatar"></div>
                <span className="reviewer-name">Name of the User</span>
              </div>
              <button className="verify-btn" type="button">
                Verify Effectiveness
              </button>
            </div>

            <div className="notification-charts">
              <div className="notification-chart"></div>
              <div className="notification-chart"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotificationsModal
