import React from "react";
import "../styles/Analytics.css";

/* =========================================================
   DATA
========================================================= */

const kpis = [
  {
    label: "GMV",
    value: "₹0",
    description: "",
  },
  {
    label: "ORDERS",
    value: "0",
    description: "",
  },
  {
    label: "AOV",
    value: "₹0",
    description: "",
  },
  {
    label: "CVR",
    value: "0.0%",
    description: "5021 views",
  },
  {
    label: "UNITS SOLD",
    value: "0",
    description: "",
  },
  {
    label: "RETURN RATE",
    value: "0.0%",
    description: "",
  },
];

const skuData = [
  {
    name: "Ivory Silk Dog Kurta",
    sku: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
    views: "1840",
    units: "0",
    revenue: "₹0",
    available: "14",
    returns: "0",
  },
  {
    name: "Rose Zari Dog Lehenga",
    sku: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
    views: "921",
    units: "0",
    revenue: "₹0",
    available: "4",
    returns: "0",
  },
  {
    name: "Aqua Linen Cat Harness",
    sku: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
    views: "2260",
    units: "0",
    revenue: "₹0",
    available: "26",
    returns: "0",
  },
  {
    name: "Sand Quilted Pet Bed",
    sku: "ZNV-IRA-PEV-PETBED-SAND-M",
    views: "0",
    units: "0",
    revenue: "₹0",
    available: "0",
    returns: "0",
  },
  {
    name: "Noir Twin Bandana Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-BANDANA-NOIR-F",
    views: "0",
    units: "0",
    revenue: "₹0",
    available: "0",
    returns: "0",
  },
  {
    name: "Olive Twin Scarf Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-MATCHSCARF-OLIVE-F",
    views: "0",
    units: "0",
    revenue: "₹0",
    available: "0",
    returns: "0",
  },
];

const reports = [
  {
    name: "Executive summary",
    rows: "16 rows",
  },
  {
    name: "Designers",
    rows: "3 rows",
  },
  {
    name: "SKU & inventory",
    rows: "6 rows",
  },
  {
    name: "Orders",
    rows: "0 rows",
  },
  {
    name: "Returns",
    rows: "0 rows",
  },
  {
    name: "Settlements",
    rows: "0 rows",
  },
  {
    name: "Audit log",
    rows: "11 rows",
  },
];

/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg
      className="bi-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="bi-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20c.8-4 3.2-6 7-6s6.2 2 7 6" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg
      className="download-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="M7.5 10.5L12 15l4.5-4.5" />
      <path d="M4 19.5h16" />
    </svg>
  );
}

function FileDownloadIcon() {
  return (
    <svg
      className="file-download-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M6 3h8l4 4v14H6z" />
      <path d="M14 3v5h4" />
      <path d="M12 10v7" />
      <path d="M9.5 14.5L12 17l2.5-2.5" />
    </svg>
  );
}

/* =========================================================
   KPI CARD
========================================================= */

function KPICard({ label, value, description }) {
  return (
    <div className="bi-kpi-card">
      <div className="bi-kpi-label">{label}</div>

      <div className="bi-kpi-value">
        {value}
      </div>

      {description && (
        <div className="bi-kpi-description">
          {description}
        </div>
      )}
    </div>
  );
}

/* =========================================================
   HEADER
========================================================= */

function BIHeader() {
  return (
    <header className="bi-header">
      <div className="bi-header-inner">

        {/* LOGO */}
        <div className="bi-logo-wrapper">
          <img
            src="/zenve-logo.png"
            alt="Zenve Fashion"
            className="bi-logo"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextElementSibling.style.display = "flex";
            }}
          />

          {/*<div className="bi-logo-fallback">*/}
          {/*  <span className="fallback-z">Z</span>*/}
          {/*  <span className="fallback-text">*/}
          {/*    ZENVE*/}
          {/*    <small>FASHION</small>*/}
          {/*  </span>*/}
          {/*</div>*/}
        </div>

        {/* TITLE */}
        <div className="bi-title-area">

          <div className="bi-back">
            <span className="back-arrow">←</span>
            <span>ALL 12 LAYERS</span>
          </div>

          <h1>
            <span className="layer-number">11</span>
            <span>BI Dashboards</span>
          </h1>

          <p>
            Analytics layer · Designer, SKU, inventory, customer,
            marketing KPIs
          </p>

        </div>

        {/* HEADER ACTIONS */}
        <div className="bi-header-actions">

          <div className="bi-search-box">
            <SearchIcon />

            <input
              type="text"
              placeholder="Search everything"
            />

            <span className="keyboard-shortcut">
              ⌘K
            </span>
          </div>

          <div className="bi-user-box">

            <UserIcon />

            <span className="bi-user-name">
              Priya Raghavan
            </span>

            <span className="admin-badge">
              Admin
            </span>

          </div>

        </div>

      </div>
    </header>
  );
}

/* =========================================================
   GMV PANEL
========================================================= */

function GMVPanel() {
  return (
    <section className="bi-panel gmv-panel">

      <h2>GMV by designer</h2>

      <div className="bi-empty-box">
        <span>
          No sales recorded yet.
        </span>
      </div>

    </section>
  );
}

/* =========================================================
   INVENTORY DONUT
========================================================= */

function InventoryPanel() {
  return (
    <section className="bi-panel inventory-panel">

      <h2>Inventory split</h2>

      <div className="donut-wrapper">

        <div className="donut-chart">
          <div className="donut-hole"></div>
        </div>

      </div>

      <div className="donut-legend">

        <span className="legend-dot"></span>

        <span>
          Available · 44
        </span>

      </div>

    </section>
  );
}

/* =========================================================
   SKU TABLE
========================================================= */

function SKUPerformance() {
  return (
    <section className="bi-panel sku-panel">

      <div className="bi-section-heading">
        <h2>SKU performance</h2>

        <p>
          Views, units sold, revenue, stock and return exposure.
        </p>
      </div>

      <div className="sku-table-wrapper">

        <table className="sku-table">

          <thead>
            <tr>
              <th>SKU</th>
              <th>VIEWS</th>
              <th>UNITS</th>
              <th>REVENUE</th>
              <th>AVAILABLE</th>
              <th>RETURNS</th>
            </tr>
          </thead>

          <tbody>

            {skuData.map((item, index) => (
              <tr key={index}>

                <td className="sku-name-cell">

                  <div className="sku-name">
                    {item.name}
                  </div>

                  <div className="sku-code">
                    {item.sku}
                  </div>

                </td>

                <td>
                  {item.views}
                </td>

                <td>
                  {item.units}
                </td>

                <td>
                  {item.revenue}
                </td>

                <td>
                  {item.available}
                </td>

                <td>
                  {item.returns}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </section>
  );
}

/* =========================================================
   REPORT EXPORT
========================================================= */

function OperationalReports() {

  const handleExport = () => {
    alert("Full report export started.");
  };

  const handleIndividualExport = (reportName) => {
    alert(`${reportName} export started.`);
  };

  return (
    <section className="bi-panel reports-panel">

      <div className="reports-header">

        <div>
          <h2>
            Operational report export
          </h2>

          <p>
            Download the whole book of record, or just the section
            you need. Opens directly in Excel or Sheets.
          </p>
        </div>

        <button
          className="export-full-button"
          onClick={handleExport}
        >
          <FileDownloadIcon />
          <span>Export full report</span>
        </button>

      </div>

      <div className="reports-grid">

        {reports.map((report, index) => (

          <button
            key={index}
            className="report-card"
            onClick={() =>
              handleIndividualExport(report.name)
            }
          >

            <div className="report-information">

              <span className="report-name">
                {report.name}
              </span>

              <span className="report-rows">
                {report.rows}
              </span>

            </div>

            <DownloadIcon />

          </button>

        ))}

      </div>

    </section>
  );
}

/* =========================================================
   TOP MOVERS
========================================================= */

function TopMovers() {
  return (
    <section className="bi-panel movers-panel">

      <h2>Top movers</h2>

      <div className="bi-empty-box movers-empty">

        <span>
          Sell something to populate this ranking.
        </span>

      </div>

    </section>
  );
}

/* =========================================================
   MAIN PAGE
========================================================= */

export default function BIDashboards() {

  return (
    <div className="bi-page">

      {/* HEADER */}
      <BIHeader />

      {/* MAIN CONTENT */}
      <main className="bi-main">

        {/* KPI CARDS */}
        <section className="bi-kpi-grid">

          {kpis.map((item, index) => (
            <KPICard
              key={index}
              label={item.label}
              value={item.value}
              description={item.description}
            />
          ))}

        </section>

        {/* CHARTS */}
        <section className="bi-chart-grid">

          <GMVPanel />

          <InventoryPanel />

        </section>

        {/* SKU */}
        <SKUPerformance />

        {/* REPORTS */}
        <OperationalReports />

        {/* TOP MOVERS */}
        <TopMovers />

      </main>

    </div>
  );
}