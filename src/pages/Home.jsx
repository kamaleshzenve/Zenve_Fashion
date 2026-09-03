import React from "react";
import { Link } from "react-router-dom";
import { layers } from "../data/layers";
import "../styles/Home.css";

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon() {
  return (
    <svg
      className="search-icon"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="7"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M20 20L16.65 16.65"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   USER ICON
========================================================= */

function UserIcon() {
  return (
    <svg
      className="user-icon"
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
        stroke="currentColor"
        strokeWidth="1.8"
      />

      <path
        d="M5 20C5.8 16.5 8.2 14.5 12 14.5C15.8 14.5 18.2 16.5 19 20"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* =========================================================
   HOME PAGE
========================================================= */

function Home() {
  /*
   * Remove duplicate layers based on layer number.
   * Example:
   * 06 appears multiple times -> only one 06
   * 07 appears multiple times -> only one 07
   */

  const uniqueLayers = Array.from(
    new Map(layers.map((layer) => [layer.n, layer])).values()
  ).sort((a, b) => Number(a.n) - Number(b.n));

  return (
    <main className="home-page">

      {/* =====================================================
          HEADER
      ===================================================== */}
      <div className="header-content">

      <header className="home-header">

        {/* LEFT SIDE */}

        <div className="header-left">

          {/* LOGO */}

          {/*<div className="zenve-logo">*/}
          {/*  <img*/}
          {/*    src="/logo.png"*/}
          {/*    alt="Zenve Fashion"*/}
          {/*  />*/}
          {/*</div>*/}

          {/* TITLE */}

          <h1 className="home-title">
            Zenve Fashion Merchandising
          </h1>

        </div>

        {/* RIGHT SIDE */}

        <div className="header-right">

          {/* SEARCH */}

          <div className="home-search">

            <SearchIcon />

            <span>
              Search everything
            </span>

            <kbd>
              ⌘K
            </kbd>

          </div>

          {/* USER */}

          <div className="home-user">

            <UserIcon />

            <span className="home-user-name">
              Priya Raghavan
            </span>

            <span className="home-admin">
              Admin
            </span>

          </div>

        </div>

      </header>


      {/* =====================================================
          KPI SECTION
      ===================================================== */}

      <section className="kpi-section">

        {/* DESIGNERS */}

        <div className="kpi-card">

          <div className="kpi-label">
            DESIGNERS
          </div>

          <div className="kpi-value">
            3
          </div>

          <div className="kpi-subtitle">
            Lead to active
          </div>

        </div>


        {/* LIVE SKUS */}

        <div className="kpi-card">

          <div className="kpi-label">
            LIVE SKUS
          </div>

          <div className="kpi-value">
            3
          </div>

          <div className="kpi-subtitle">
            6 in catalogue
          </div>

        </div>


        {/* SELLABLE UNITS */}

        <div className="kpi-card">

          <div className="kpi-label">
            SELLABLE UNITS
          </div>

          <div className="kpi-value">
            44
          </div>

          <div className="kpi-subtitle">
            Available inventory
          </div>

        </div>


        {/* GMV */}

        <div className="kpi-card">

          <div className="kpi-label">
            GMV BOOKED
          </div>

          <div className="kpi-value">
            ₹0
          </div>

          <div className="kpi-subtitle">
            0 orders
          </div>

        </div>

      </section>
      </div>


      {/* =====================================================
          LAYERS SECTION
      ===================================================== */}

      <section className="layers-section">

        {/* SECTION HEADER */}

        <div className="layers-header">

          <div className="layers-title-wrapper">

            <h2>
              Your layers
            </h2>

            <span className="layers-count">
              {uniqueLayers.length} of 12 open to Admin
            </span>

          </div>


          <div className="exception-badge">
            5 open exceptions
          </div>

        </div>


        {/* ===================================================
            LAYER GRID
        =================================================== */}

        <div className="layers-grid">

          {uniqueLayers.map((layer) => (

            <Link
              key={layer.n}
              to={layer.path}
              className="layer-card"
            >

              {/* TOP ROW */}

              <div className="layer-top">

                <span className="layer-group">
                  {layer.group}
                </span>

                <span className="layer-number">
                  {layer.n}
                </span>

              </div>


              {/* TITLE */}

              <h3 className="layer-name">
                {layer.name}
              </h3>


              {/* DESCRIPTION */}

              <p className="layer-blurb">
                {layer.blurb}
              </p>

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}

export default Home;