function IntroModal({ isOpen, onClose }) {
  if (!isOpen) {
    return null
  }

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="intro-title"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="modal-header">
          <h2 id="intro-title" className="intro-title">
            Quality Management System Introduction
          </h2>
          <button
            className="modal-close"
            type="button"
            onClick={onClose}
            aria-label="Close introduction"
          >
            x
          </button>
        </div>
        <div className="intro-text">
          <p>
            Our Quality Management System (QMS) is designed to ensure consistent
            excellence across all our processes, products, and services. It provides
            a structured framework that aligns our operations with defined standards,
            regulatory requirements, and customer expectations.
          </p>
          <p>
            At its core, the QMS promotes a culture of continuous improvement,
            accountability, and efficiency. By establishing clear procedures,
            measurable objectives, and systematic controls, we are able to monitor
            performance, identify opportunities for enhancement, and implement
            effective solutions.
          </p>
          <p>
            This system is not only a tool for compliance but also a strategic asset
            that supports our commitment to delivering reliable, high-quality outcomes.
            It empowers our team to work collaboratively, make informed decisions,
            and uphold the highest standards in everything we do.
          </p>
        </div>
      </div>
    </div>
  )
}

export default IntroModal
