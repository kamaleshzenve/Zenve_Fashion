import React from "react";
import "../styles/Settlement.css";

/* =====================================================
   ICONS
===================================================== */

function SearchIcon() {
  return (
    <svg
      className="settlement-icon"
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
      className="settlement-icon"
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
      className="settlement-back-icon"
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
   ZENVE LOGO
===================================================== */

function ZenveLogo() {
  return (
    <div className="settlement-logo">

      {/*<div className="settlement-logo-symbol">*/}
      {/*  Z*/}
      {/*</div>*/}

      {/*<div className="settlement-logo-name">*/}
      {/*  ZENVE*/}
      {/*</div>*/}

      {/*<div className="settlement-logo-fashion">*/}
      {/*  FASHION*/}
      {/*</div>*/}

    </div>
  );
}


/* =====================================================
   HEADER
===================================================== */

function SettlementHeader() {
  return (
    <header className="settlement-header">

      {/* Logo */}
      <div className="settlement-logo-container">
        <ZenveLogo />
      </div>


      {/* Header title area */}
      <div className="settlement-header-content">

        <div className="settlement-back">
          <ArrowLeftIcon />

          <span>
            ALL 12 LAYERS
          </span>
        </div>


        <div className="settlement-title-row">

          <span className="settlement-layer-number">
            10
          </span>

          <h1>
            Settlement
          </h1>

        </div>


        <p className="settlement-subtitle">
          Finance layer · Take rate, payout, refunds, reconciliation
        </p>

      </div>


      {/* Right controls */}
      <div className="settlement-header-actions">

        {/* Search */}
        <div className="settlement-search">

          <SearchIcon />

          <span>
            Search everything
          </span>

          <kbd>
            ⌘K
          </kbd>

        </div>


        {/* Profile */}
        <div className="settlement-profile">

          <UserIcon />

          <span className="settlement-profile-name">
            Priya Raghavan
          </span>

          <span className="settlement-admin">
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

function SettlementStat({
  label,
  value,
  description
}) {
  return (
    <div className="settlement-stat-card">

      <div className="settlement-stat-label">
        {label}
      </div>

      <div className="settlement-stat-value">
        {value}
      </div>

      {description && (
        <div className="settlement-stat-description">
          {description}
        </div>
      )}

    </div>
  );
}


/* =====================================================
   EMPTY STATE
===================================================== */

function SettlementEmptyState({
  children
}) {
  return (
    <div className="settlement-empty-state">
      {children}
    </div>
  );
}


/* =====================================================
   SETTLEMENT LEDGER
===================================================== */

function SettlementLedger() {
  return (
    <section className="settlement-panel settlement-ledger">

      <div className="settlement-section-header">

        <h2>
          Settlement ledger
        </h2>

        <p>
          A settlement is created the moment an order is delivered,
          and reversed when a refund is issued.
        </p>

      </div>


      <SettlementEmptyState>
        No settlements yet – deliver an order in the OMS layer.
      </SettlementEmptyState>

    </section>
  );
}


/* =====================================================
   WHAT IS INCLUDED
===================================================== */

function IncludedSection() {
  return (
    <section className="settlement-panel settlement-included">

      <div className="settlement-section-header">

        <h2>
          What is included
        </h2>

        <p>
          Straight from the blueprint’s settlement components.
        </p>

      </div>


      <div className="settlement-rules-grid">

        {/* Left column */}
        <div className="settlement-rules-column">

          <div className="settlement-rule">
            <span>•</span>
            <p>
              GMV – customer realised merchandise value
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Discounts tracked to their funding source
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Taxes and invoicing rules applied
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Net settlement is fully auditable
            </p>
          </div>

        </div>


        {/* Right column */}
        <div className="settlement-rules-column">

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Take rate – designer/category specific
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Returns reverse the affected settlement
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Adjustments only with approval
            </p>
          </div>

          <div className="settlement-rule">
            <span>•</span>
            <p>
              Status: pending → approved → paid → reconciled
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}


/* =====================================================
   MAIN PAGE
===================================================== */

function Settlement() {
  return (
    <div className="settlement-page">

      {/* Header */}
      <SettlementHeader />


      {/* Main */}
      <main className="settlement-main">

        {/* =================================================
            STATISTICS
        ================================================= */}

        <section className="settlement-stats">

          <SettlementStat
            label="SETTLED GMV"
            value="₹0"
            description="0 settlements"
          />

          <SettlementStat
            label="ZENVE COMMISSION"
            value="₹0"
            description="Take rate earnings"
          />

          <SettlementStat
            label="PAYABLE TO DESIGNERS"
            value="₹0"
            description="Not yet paid"
          />

          <SettlementStat
            label="REVERSED BY RETURNS"
            value="0"
          />

        </section>


        {/* =================================================
            LEDGER
        ================================================= */}

        <SettlementLedger />


        {/* =================================================
            INCLUDED
        ================================================= */}

        <IncludedSection />

      </main>

    </div>
  );
}


/* =====================================================
   DEFAULT EXPORT
===================================================== */

export default Settlement;