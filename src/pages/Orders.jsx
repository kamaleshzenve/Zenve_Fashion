import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Orders.css";

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="7" r="4" />
      <path d="M4.5 21c.8-4 3.2-6 7.5-6s6.7 2 7.5 6" />
    </svg>
  );
}

function ArrowLeftIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 12H5" />
      <path d="m12 19-7-7 7-7" />
    </svg>
  );
}

export default function OMS() {
  const navigate = useNavigate();

  return (
    <div className="oms-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <header className="oms-header">

        {/* Logo */}
        <div className="oms-logo-wrapper">
          <img
            src="/logo.png"
            alt="Zenve Fashion"
            className="oms-logo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
          <div className="oms-logo-fallback">
            <span>ZENVE</span>
            <small>FASHION</small>
          </div>
        </div>

        {/* Header Content */}
        <div className="oms-header-content">

          <button
            className="oms-back-link"
            onClick={() => navigate("/")}
          >
            <ArrowLeftIcon />
            <span>ALL 12 LAYERS</span>
          </button>

          <div className="oms-title-row">
            <h1>
              <span className="oms-number">07</span>
              OMS
            </h1>
          </div>

          <p className="oms-subtitle">
            Orders layer · Order lifecycle, split orders, cancellation
          </p>
        </div>

        {/* Header Actions */}
        <div className="oms-header-actions">

          <div className="oms-search-box">
            <SearchIcon />

            <input
              type="text"
              placeholder="Search everything"
              aria-label="Search everything"
            />

            <span className="oms-shortcut">⌘K</span>
          </div>

          <div className="oms-user-box">
            <UserIcon />

            <span className="oms-user-name">
              Priya Raghavan
            </span>

            <span className="oms-admin">
              Admin
            </span>
          </div>

        </div>
      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}
      <main className="oms-main">

        {/* =====================================================
            STAT CARDS
        ===================================================== */}
        <section className="oms-stat-grid">

          <div className="oms-stat-card">
            <div className="oms-stat-label">
              ORDERS
            </div>

            <div className="oms-stat-number">
              0
            </div>
          </div>


          <div className="oms-stat-card">
            <div className="oms-stat-label">
              OPEN
            </div>

            <div className="oms-stat-number">
              0
            </div>

            <div className="oms-stat-description">
              Not delivered or cancelled
            </div>
          </div>


          <div className="oms-stat-card">
            <div className="oms-stat-label">
              DELIVERED
            </div>

            <div className="oms-stat-number">
              0
            </div>
          </div>


          <div className="oms-stat-card">
            <div className="oms-stat-label">
              GMV
            </div>

            <div className="oms-stat-number oms-gmv">
              ₹0
            </div>

            <div className="oms-stat-description">
              Excludes cancellations
            </div>
          </div>

        </section>


        {/* =====================================================
            ORDER LIFECYCLE
        ===================================================== */}
        <section className="oms-lifecycle-card">

          <div className="oms-section-heading">
            <h2>
              Order lifecycle
            </h2>

            <p>
              PLACED → CONFIRMED → PACKED → SHIPPED →
              OUT FOR DELIVERY → DELIVERED. Cancellation is
              only allowed before dispatch.
            </p>
          </div>


          {/* Empty Order State */}
          <div className="oms-empty-state">
            <p>
              No orders yet – place one from the Storefront layer.
            </p>
          </div>

        </section>

      </main>
    </div>
  );
}