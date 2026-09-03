import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Delivery.css";

/* =========================================================
   SKU DATA
========================================================= */

const skuData = [
  {
    name: "Ivory Silk Dog Kurta",
    sku: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
    location: "Mumbai FC",
    available: 14,
    fast: true,
    promise: "60 minutes",
  },
  {
    name: "Rose Zari Dog Lehenga",
    sku: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
    location: "Mumbai FC",
    available: 4,
    fast: false,
    promise: "≤ 3 working days",
  },
  {
    name: "Aqua Linen Cat Harness",
    sku: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
    location: "Bangalore FC",
    available: 26,
    fast: true,
    promise: "≤ 3 working days",
  },
];

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon() {
  return (
    <svg
      className="delivery-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="m16 16 5 5" />
    </svg>
  );
}

/* =========================================================
   USER ICON
========================================================= */

function UserIcon() {
  return (
    <svg
      className="delivery-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="7.5" r="3.5" />
      <path d="M5 20c.7-4 3-6 7-6s6.3 2 7 6" />
    </svg>
  );
}

/* =========================================================
   CHEVRON DOWN
========================================================= */

function ChevronDown() {
  return (
    <svg
      className="chevron-icon"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}

/* =========================================================
   DELIVERY TOGGLE
========================================================= */

function DeliveryToggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`delivery-toggle ${enabled ? "active" : ""}`}
      onClick={onChange}
      aria-label={
        enabled
          ? "Disable fast delivery"
          : "Enable fast delivery"
      }
      aria-pressed={enabled}
    >
      <span className="delivery-toggle-knob" />
    </button>
  );
}

/* =========================================================
   DELIVERY ENGINE
========================================================= */

export default function DeliveryEngine() {
  /* =======================================================
     NAVIGATION
  ======================================================= */

  const navigate = useNavigate();

  /* =======================================================
     PINCODE
  ======================================================= */

  const [pincode, setPincode] = useState("400001");

  /* =======================================================
     FAST FLAGS
  ======================================================= */

  const [fastFlags, setFastFlags] = useState({
    "ZNV-AAR-POC-DOGKURTA-IVORY-M": true,
    "ZNV-AAR-POC-DOGLEHENGA-ROSE-S": false,
    "ZNV-IRA-PEV-CATHARNESS-AQUA-L": true,
  });

  /* =======================================================
     TOGGLE FAST FLAG
  ======================================================= */

  const toggleFastFlag = (sku) => {
    setFastFlags((previous) => ({
      ...previous,
      [sku]: !previous[sku],
    }));
  };

  /* =======================================================
     GET PROMISE
  ======================================================= */

  const getPromise = (item) => {
    if (!fastFlags[item.sku]) {
      return "≤ 3 working days";
    }

    if (item.available <= 0) {
      return "≤ 3 working days";
    }

    if (
      item.location === "Mumbai FC" &&
      item.available > 0
    ) {
      return "60 minutes";
    }

    return "≤ 3 working days";
  };

  /* =======================================================
     FAST CITY
  ======================================================= */

  const isFastCity =
    pincode.startsWith("400") ||
    pincode.startsWith("560");

  /* =======================================================
     FAST ELIGIBLE COUNT
  ======================================================= */

  const fastEligibleCount = skuData.filter(
    (item) =>
      fastFlags[item.sku] &&
      item.available > 0
  ).length;

  /* =======================================================
     RISK COUNT
  ======================================================= */

  const riskCount = skuData.filter(
    (item) =>
      fastFlags[item.sku] &&
      item.available === 0
  ).length;

  /* =======================================================
     PAGE
  ======================================================= */

  return (
    <div className="delivery-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="delivery-header">

        <div className="delivery-header-inner">

          {/* Logo */}

          <div className="delivery-logo-wrapper">

            {/*
            <div className="delivery-logo">

              <div className="delivery-logo-mark">
                Z
              </div>

              <div className="delivery-logo-text">
                ZENVE
                <span>FASHION</span>
              </div>

            </div>
            */}

          </div>

          {/* Header content */}

          <div className="delivery-header-content">

            {/* =================================================
                BACK / ALL 12 LAYERS
            ================================================= */}

            <button
              type="button"
              className="delivery-back"
              onClick={() => navigate("/")}
            >
              <span className="delivery-back-arrow">
                ←
              </span>

              <span>
                ALL 12 LAYERS
              </span>
            </button>

            {/* =================================================
                TITLE ROW
            ================================================= */}

            <div className="delivery-title-row">

              <div className="delivery-title-block">

                <h1>

                  <span className="delivery-number">
                    08
                  </span>

                  Delivery Engine

                </h1>

                <p>
                  Logistics layer · Pincode, ETA,
                  60-min eligibility, 3-day target
                </p>

              </div>

              {/* =================================================
                  HEADER ACTIONS
              ================================================= */}

              <div className="delivery-header-actions">

                {/* Search */}

                <div className="delivery-search-box">

                  <SearchIcon />

                  <span>
                    Search everything
                  </span>

                  <kbd>
                    ⌘K
                  </kbd>

                </div>

                {/* User */}

                <div className="delivery-user-box">

                  <UserIcon />

                  <span>
                    Priya Raghavan
                  </span>

                  <span className="delivery-admin">
                    Admin
                  </span>

                </div>

              </div>

            </div>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN
      ===================================================== */}

      <main className="delivery-main">

        {/* ===================================================
            STAT CARDS
        =================================================== */}

        <section className="delivery-stats">

          {/* =================================================
              ZONE
          ================================================= */}

          <article className="delivery-stat-card">

            <div className="delivery-stat-label">
              ZONE
            </div>

            <div className="delivery-stat-value delivery-zone-value">
              {isFastCity
                ? "Fast city"
                : "Serviceable"}
            </div>

            <div className="delivery-stat-description">
              Mumbai / Bangalore
            </div>

          </article>

          {/* =================================================
              FAST ELIGIBLE SKUS
          ================================================= */}

          <article className="delivery-stat-card">

            <div className="delivery-stat-label">
              FAST-ELIGIBLE SKUS
            </div>

            <div className="delivery-stat-value">
              {fastEligibleCount}
            </div>

            <div className="delivery-stat-description">
              For this pincode, right now
            </div>

          </article>

          {/* =================================================
              FAST FLAG AT RISK
          ================================================= */}

          <article className="delivery-stat-card">

            <div className="delivery-stat-label">
              FAST FLAG AT RISK
            </div>

            <div className="delivery-stat-value">
              {riskCount}
            </div>

            <div className="delivery-stat-description">
              Flagged but no stock
            </div>

          </article>

        </section>

        {/* =================================================
            SERVICEABILITY
        ================================================= */}

        <section className="delivery-section delivery-serviceability">

          <div className="delivery-section-header">

            <div className="delivery-section-heading">

              <h2>
                Serviceability check
              </h2>

              <p>
                Rule chain: pincode → serviceable →
                nearest eligible location → SKU available →
                fast flag → live ETA.
              </p>

            </div>

            {/* =================================================
                PINCODE
            ================================================= */}

            <div className="delivery-pincode">

              <label htmlFor="customer-pincode">
                CUSTOMER PINCODE
              </label>

              <input
                id="customer-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(event) =>
                  setPincode(
                    event.target.value.replace(
                      /\D/g,
                      ""
                    )
                  )
                }
              />

            </div>

          </div>

          {/* =================================================
              DESKTOP TABLE
          ================================================= */}

          <div className="delivery-table-wrapper">

            <div className="delivery-table">

              {/* =================================================
                  TABLE HEADER
              ================================================= */}

              <div className="delivery-table-row delivery-table-head">

                <div>
                  SKU
                </div>

                <div>
                  STOCKING LOCATION
                </div>

                <div>
                  AVAILABLE
                </div>

                <div>
                  FAST FLAG
                </div>

                <div>
                  PROMISE
                </div>

              </div>

              {/* =================================================
                  TABLE ROWS
              ================================================= */}

              {skuData.map((item) => {

                const promise =
                  getPromise(item);

                const is60Minutes =
                  promise === "60 minutes";

                return (

                  <div
                    className="delivery-table-row delivery-product-row"
                    key={item.sku}
                  >

                    {/* =================================================
                        SKU
                    ================================================= */}

                    <div className="delivery-product-cell">

                      <div className="delivery-product-name">
                        {item.name}
                      </div>

                      <div className="delivery-product-sku">
                        {item.sku}
                      </div>

                    </div>

                    {/* =================================================
                        LOCATION
                    ================================================= */}

                    <div className="delivery-location">
                      {item.location}
                    </div>

                    {/* =================================================
                        AVAILABLE
                    ================================================= */}

                    <div className="delivery-available">
                      {item.available}
                    </div>

                    {/* =================================================
                        FAST FLAG
                    ================================================= */}

                    <div className="delivery-fast-control">

                      <DeliveryToggle
                        enabled={
                          fastFlags[item.sku]
                        }
                        onChange={() =>
                          toggleFastFlag(
                            item.sku
                          )
                        }
                      />

                    </div>

                    {/* =================================================
                        PROMISE
                    ================================================= */}

                    <div className="delivery-promise-cell">

                      <span
                        className={`delivery-promise ${
                          is60Minutes
                            ? "delivery-promise-fast"
                            : "delivery-promise-standard"
                        }`}
                      >
                        {promise}
                      </span>

                    </div>

                  </div>

                );

              })}

            </div>

          </div>

          {/* =================================================
              MOBILE CARDS
          ================================================= */}

          <div className="delivery-mobile-products">

            {skuData.map((item) => {

              const promise =
                getPromise(item);

              const is60Minutes =
                promise === "60 minutes";

              return (

                <article
                  className="delivery-mobile-card"
                  key={item.sku}
                >

                  {/* =================================================
                      MOBILE CARD TOP
                  ================================================= */}

                  <div className="delivery-mobile-card-top">

                    <div>

                      <h3>
                        {item.name}
                      </h3>

                      <p>
                        {item.sku}
                      </p>

                    </div>

                    <span
                      className={`delivery-promise ${
                        is60Minutes
                          ? "delivery-promise-fast"
                          : "delivery-promise-standard"
                      }`}
                    >
                      {promise}
                    </span>

                  </div>

                  {/* =================================================
                      MOBILE INFO
                  ================================================= */}

                  <div className="delivery-mobile-info">

                    <div>

                      <span>
                        STOCKING LOCATION
                      </span>

                      <strong>
                        {item.location}
                      </strong>

                    </div>

                    <div>

                      <span>
                        AVAILABLE
                      </span>

                      <strong>
                        {item.available}
                      </strong>

                    </div>

                    <div>

                      <span>
                        FAST FLAG
                      </span>

                      <DeliveryToggle
                        enabled={
                          fastFlags[item.sku]
                        }
                        onChange={() =>
                          toggleFastFlag(
                            item.sku
                          )
                        }
                      />

                    </div>

                  </div>

                </article>

              );

            })}

          </div>

        </section>

        {/* =================================================
            PROMISE POLICY
        ================================================= */}

        <section className="delivery-section delivery-policy">

          <div className="delivery-policy-header">

            <h2>
              Promise policy
            </h2>

            <p>
              What the business is allowed to
              show a customer.
            </p>

          </div>

          {/* =================================================
              POLICY GRID
          ================================================= */}

          <div className="delivery-policy-grid">

            {/* =================================================
                POLICY 1
            ================================================= */}

            <div className="delivery-policy-item">

              <span>
                •
              </span>

              <p>
                60 minutes applies only to
                fast-flagged stock inside Mumbai
                (400xxx) and Bangalore (560xxx).
              </p>

            </div>

            {/* =================================================
                POLICY 2
            ================================================= */}

            <div className="delivery-policy-item">

              <span>
                •
              </span>

              <p>
                Every other serviceable pincode
                shows a ≤ 3 working-day target.
              </p>

            </div>

            {/* =================================================
                POLICY 3
            ================================================= */}

            <div className="delivery-policy-item">

              <span>
                •
              </span>

              <p>
                Zero available units removes the
                fast promise automatically.
              </p>

            </div>

            {/* =================================================
                POLICY 4
            ================================================= */}

            <div className="delivery-policy-item">

              <span>
                •
              </span>

              <p>
                Designer-studio stock never carries
                the 60-minute promise.
              </p>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
}