import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Returns.css";

/* =====================================================
  ICONS
===================================================== */

function SearchIcon() {
  return (
    <svg
      className="returns-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="returns-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="7" r="3.5" />
      <path d="M5 21c.7-4.2 3-6.5 7-6.5s6.3 2.3 7 6.5" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      className="returns-back-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <path d="M19 12H5" />
      <path d="m11 18-6-6 6-6" />
    </svg>
  );
}

/* =====================================================
  HEADER
===================================================== */

function ReturnsHeader() {
  const navigate = useNavigate();

  /* ===================================================
     ALL 12 LAYERS / BACK BUTTON
  =================================================== */

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <header className="returns-header">

      {/* Logo */}
      <div className="returns-logo-area">

        <div className="returns-logo-mark">

          {/*
          <div className="returns-logo-z">
            Z
          </div>
          */}

          {/*
          <div className="returns-logo-text">
            ZENVE
          </div>
          */}

          {/*
          <div className="returns-logo-subtext">
            FASHION
          </div>
          */}

        </div>

      </div>

      {/* Main header content */}
      <div className="returns-header-content">

        {/* =================================================
            CLICKABLE ALL 12 LAYERS BUTTON
        ================================================= */}

        <button
          type="button"
          className="returns-back"
          onClick={handleBackClick}
          aria-label="Go back to all 12 layers"
        >
          <ArrowLeftIcon />

          <span>
            ALL 12 LAYERS
          </span>
        </button>

        <div className="returns-title-row">

          <span className="returns-layer-number">
            09
          </span>

          <h1>
            Returns Engine
          </h1>

        </div>

        <p className="returns-subtitle">
          Returns layer · Request, pickup, inspection, refund / exchange
        </p>

      </div>

      {/* Header right controls */}
      <div className="returns-header-actions">

        <div className="returns-search">

          <SearchIcon />

          <span>
            Search everything
          </span>

          <kbd>
            ⌘K
          </kbd>

        </div>

        <div className="returns-profile">

          <UserIcon />

          <span className="returns-user-name">
            Priya Raghavan
          </span>

          <span className="returns-admin">
            Admin
          </span>

        </div>

      </div>

    </header>
  );
}

/* =====================================================
  STAT CARD
===================================================== */

function StatCard({ label, value }) {
  return (
    <div className="returns-stat-card">

      <div className="returns-stat-label">
        {label}
      </div>

      <div className="returns-stat-value">
        {value}
      </div>

    </div>
  );
}

/* =====================================================
  EMPTY STATE
===================================================== */

function EmptyState({ children }) {
  return (
    <div className="returns-empty-state">
      {children}
    </div>
  );
}

/* =====================================================
  RAISE RETURN
===================================================== */

function RaiseReturnSection() {
  return (
    <section className="returns-panel raise-return-panel">

      <div className="returns-section-heading">

        <h2>
          Raise a return
        </h2>

        <p>
          Only delivered orders and returnable SKUs pass the policy check.
        </p>

      </div>

      <EmptyState>
        No delivered orders yet – deliver an order in the OMS layer first.
      </EmptyState>

    </section>
  );
}

/* =====================================================
  RETURN WORKFLOW
===================================================== */

function ReturnWorkflowSection() {
  return (
    <section className="returns-panel workflow-panel">

      <div className="returns-section-heading">

        <h2>
          Return workflow
        </h2>

        <p>
          Requested → pickup → received → inspected → refunded.
          Inspection decides whether stock becomes sellable again.
        </p>

      </div>

      <EmptyState>
        No returns raised.
      </EmptyState>

    </section>
  );
}

/* =====================================================
  MAIN RETURNS PAGE
===================================================== */

function Returns() {
  return (
    <div className="returns-page">

      {/* Header */}
      <ReturnsHeader />

      {/* Main content */}
      <main className="returns-main">

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="returns-stats-grid">

          <StatCard
            label="OPEN RETURNS"
            value="0"
          />

          <StatCard
            label="AWAITING INSPECTION"
            value="0"
          />

          <StatCard
            label="FAILED QC"
            value="0"
          />

          <StatCard
            label="REFUND VALUE"
            value="₹0"
          />

        </section>

        {/* =================================================
            RAISE RETURN
        ================================================= */}

        <RaiseReturnSection />

        {/* =================================================
            RETURN WORKFLOW
        ================================================= */}

        <ReturnWorkflowSection />

      </main>

    </div>
  );
}

/* =====================================================
  IMPORTANT:
  DEFAULT EXPORT
===================================================== */

export default Returns;