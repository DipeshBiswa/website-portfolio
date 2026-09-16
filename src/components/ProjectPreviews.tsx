import type { CSSProperties } from "react";
import "./project-previews.css";

const financeBars = [35, 48, 40, 64, 53, 74, 58, 86, 69, 80, 62, 97];

export function FinancePreview() {
  return (
    <div
      className="preview-stage finance-stage"
      role="img"
      aria-label="Concept preview of a finance dashboard with a sample balance, income and expense chart, recent transactions, and spending categories. All figures are sample data."
    >
      <div className="preview-window finance-window" aria-hidden="true">
        <div className="preview-window-bar">
          <span>Finance overview</span>
          <span>Sample data</span>
        </div>
        <div className="finance-main">
          <div className="finance-stat-row">
            <div className="finance-balance">
              <span>Total balance</span>
              <strong>
                $24,680<span>.50</span>
              </strong>
            </div>
            <div className="finance-small-stat">
              <span>Income</span>
              <strong>$6,250.00</strong>
            </div>
            <div className="finance-small-stat">
              <span>Expenses</span>
              <strong>$2,180.40</strong>
            </div>
          </div>
          <div className="finance-chart-panel">
            <div className="finance-panel-heading">
              <strong>Cash flow</strong>
              <span className="finance-chart-legend">
                <i /> Income <i /> Expenses
              </span>
            </div>
            <div className="finance-chart">
              <div className="finance-chart-grid">
                <span>$6k</span>
                <span>$3k</span>
                <span>$0</span>
              </div>
              <div className="finance-bars">
                {financeBars.map((height, index) => (
                  <div
                    className="finance-bar-pair"
                    key={index}
                    style={{ "--bar-index": index } as CSSProperties}
                  >
                    <span
                      className="finance-bar"
                      style={{ "--bar-height": `${height}%` } as CSSProperties}
                    />
                    <span
                      className="finance-bar finance-bar-muted"
                      style={
                        {
                          "--bar-height": `${height * 0.46 + (index % 3) * 7}%`,
                        } as CSSProperties
                      }
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="finance-chart-months">
              <span>Jan</span>
              <span>Mar</span>
              <span>May</span>
              <span>Jul</span>
              <span>Sep</span>
              <span>Dec</span>
            </div>
          </div>
          <div className="finance-bottom-grid">
            <div className="finance-transactions">
              <div className="finance-panel-heading">
                <strong>Recent activity</strong>
              </div>
              <div className="finance-transaction">
                <span>
                  <strong>Sample deposit</strong>
                  <small>Today · Income</small>
                </span>
                <b>+$1,250.00</b>
              </div>
              <div className="finance-transaction">
                <span>
                  <strong>Whole Foods</strong>
                  <small>Yesterday · Groceries</small>
                </span>
                <b>−$86.42</b>
              </div>
              <div className="finance-transaction">
                <span>
                  <strong>Sunday Coffee</strong>
                  <small>Yesterday · Food & drinks</small>
                </span>
                <b>−$12.50</b>
              </div>
            </div>
            <div className="finance-budget">
              <div className="finance-panel-heading">
                <strong>Spending</strong>
              </div>
              <div className="finance-category-bar">
                <i />
                <i />
                <i />
              </div>
              <div className="finance-category">
                <i />
                <span>Groceries</span>
                <strong>42%</strong>
              </div>
              <div className="finance-category">
                <i />
                <span>Shopping</span>
                <strong>34%</strong>
              </div>
              <div className="finance-category">
                <i />
                <span>Other</span>
                <strong>24%</strong>
              </div>
            </div>
          </div>
        </div>
        <div className="preview-caption">Concept preview · Sample data</div>
      </div>
    </div>
  );
}

export function AuthPreview() {
  return (
    <div
      className="preview-stage auth-stage"
      role="img"
      aria-label="Concept illustration of an authentication service with a sample sign-in screen and three steps: validate credentials, validate a JWT access token on protected endpoints, and check role-based permissions. This is a static illustration, not a live sign-in form."
    >
      <div className="preview-window auth-window" aria-hidden="true">
        <div className="preview-window-bar">
          <span>Authentication</span>
          <span>Interface & API</span>
        </div>
        <div className="auth-layout">
          <div className="auth-login-panel">
            <span className="auth-panel-label">THE INTERFACE</span>
            <div className="auth-login-content">
              <h4>Sign in</h4>
              <p>Access your account.</p>
              <span className="auth-field-label">Email address</span>
              <div className="auth-display-field">hello@example.com</div>
              <span className="auth-field-label auth-password-label">
                Password
              </span>
              <div className="auth-display-field auth-password-dots">
                ••••••••••
              </div>
              <span className="auth-display-submit">
                Sign in <span>→</span>
              </span>
            </div>
            <div className="auth-login-note">Static interface concept</div>
          </div>
          <div className="auth-system-panel">
            <span className="auth-panel-label">THE REQUEST FLOW</span>
            <h4>
              From sign-in
              <br />
              to access.
            </h4>
            <div className="auth-flow">
              <div
                className="auth-flow-step"
                style={{ "--flow-index": 0 } as CSSProperties}
              >
                <span className="auth-step-number">01</span>
                <div>
                  <strong>Sign in</strong>
                  <small>Validate credentials</small>
                </div>
              </div>
              <div
                className="auth-flow-connector"
                style={{ "--flow-index": 1 } as CSSProperties}
              >
                POST /auth/login
              </div>
              <div
                className="auth-flow-step"
                style={{ "--flow-index": 2 } as CSSProperties}
              >
                <span className="auth-step-number">02</span>
                <div>
                  <strong>Access token</strong>
                  <small>Validate JWT on protected endpoints</small>
                </div>
              </div>
              <div
                className="auth-flow-connector"
                style={{ "--flow-index": 3 } as CSSProperties}
              >
                Authorization: Bearer
              </div>
              <div
                className="auth-flow-step"
                style={{ "--flow-index": 4 } as CSSProperties}
              >
                <span className="auth-step-number">03</span>
                <div>
                  <strong>Role-based access</strong>
                  <small>Check API permissions</small>
                </div>
              </div>
            </div>
            <div className="auth-role-summary">
              Roles <span>user / admin</span>
            </div>
          </div>
        </div>
        <div className="preview-caption">
          Concept preview · Portfolio illustration
        </div>
      </div>
    </div>
  );
}
