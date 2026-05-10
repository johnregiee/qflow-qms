function Dashboard() {
  return (
    <>
      <section className="metrics">
        <div className="metric-card">
          <p>Open Complaints</p>
          <h3>12</h3>
          <span>(12 from last week) 80% below target</span>
        </div>
        <div className="metric-card">
          <p>ISO Compliance</p>
          <h3>85%</h3>
        </div>
        <div className="metric-card">
          <p>QDR Defect Rate</p>
          <h3>1.2%</h3>
        </div>
      </section>

      <section className="charts">
        <p className="charts-title">Key Charts</p>
        <div className="chart chart--wide"></div>
        <div className="chart-grid">
          <div className="chart"></div>
          <div className="chart"></div>
        </div>
      </section>
    </>
  )
}

export default Dashboard
