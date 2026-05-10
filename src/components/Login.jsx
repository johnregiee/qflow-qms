function Login({
  username,
  password,
  error,
  onUsernameChange,
  onPasswordChange,
  onSubmit,
  onLearnMore,
}) {
  return (
    <main className="layout layout--center">
      <section className="auth auth--center">
        <div className="card">
          <h1>Welcome to QFlow</h1>
          <p className="subtitle">Sign in to track inspections and stay audit-ready.</p>

          <form className="form" onSubmit={onSubmit}>
            <label className="field">
              <span>Username</span>
              <input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={onUsernameChange}
              />
            </label>

            <label className="field">
              <span>Password</span>
              <div className="input-wrap">
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={onPasswordChange}
                />
                <button className="icon-button" type="button" aria-label="Show password">
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      d="M12 5c5.2 0 9.4 3.4 11 7-1.6 3.6-5.8 7-11 7S2.6 15.6 1 12c1.6-3.6 5.8-7 11-7zm0 2.5a4.5 4.5 0 1 0 0 9 4.5 4.5 0 0 0 0-9zm0 2.5a2 2 0 1 1 0 4 2 2 0 0 1 0-4z"
                      fill="currentColor"
                    />
                  </svg>
                </button>
              </div>
            </label>

            {error ? <p className="error">{error}</p> : null}

            <button className="primary-button" type="submit">
              Sign In <span className="arrow">-&gt;</span>
            </button>
          </form>
        </div>

        <button className="secondary-button" type="button" onClick={onLearnMore}>
          Learn More
        </button>
      </section>
    </main>
  )
}

export default Login
