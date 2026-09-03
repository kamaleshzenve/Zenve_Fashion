import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CommandCentre.css";

/* =========================================================
   ICONS
========================================================= */

const SearchIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="cc-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-4-4" />
  </svg>
);

const UserIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="cc-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <circle cx="12" cy="8" r="3.5" />
    <path d="M5 20c.8-3.6 3.1-5.5 7-5.5s6.2 1.9 7 5.5" />
  </svg>
);

const DownloadIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="cc-download-icon"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
  >
    <path d="M12 3v11" />
    <path d="m8 10 4 4 4-4" />
    <path d="M5 19h14" />
    <path d="M5 19v2h14v-2" />
  </svg>
);

const ChevronIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className="cc-chevron"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* =========================================================
   INITIAL DATA
========================================================= */

const initialExceptions = [
  {
    type: "QA",
    text: "ZNV-IRA-PEV-PETBED-SAND-M pending QA",
    severity: "warning",
  },
  {
    type: "QA",
    text: "ZNV-KAB-TWN-BANDANA-NOIR-F pending QA",
    severity: "warning",
  },
  {
    type: "QA",
    text: "ZNV-KAB-TWN-MATCHSCARF-OLIVE-F pending QA",
    severity: "warning",
  },
  {
    type: "Delivery",
    text: "Fast promise unsafe on Sand Quilted Pet Bed — no stock",
    severity: "danger",
  },
  {
    type: "CRM",
    text: "Studio Ira Pets missing KYC",
    severity: "danger",
  },
  {
    type: "CRM",
    text: "Sen & Co Pets missing KYC",
    severity: "danger",
  },
];

const initialAuditLogs = [
  {
    date: "01/09/26, 4:09 pm",
    layer: "Designer CRM",
    event: "DSG-003 KYC revoked",
  },
  {
    date: "01/09/26, 4:09 pm",
    layer: "Designer CRM",
    event: "DSG-003 KYC verified",
  },
  {
    date: "01/09/26, 4:09 pm",
    layer: "Designer CRM",
    event: "DSG-003 stage set to PORTFOLIO",
  },
  {
    date: "01/09/26, 4:08 pm",
    layer: "Designer CRM",
    event: "DSG-001 stage set to LEAD",
  },
  {
    date: "01/09/26, 4:08 pm",
    layer: "Designer CRM",
    event: "Studio Ira Pets moved to SIGNED",
  },
  {
    date: "01/09/26, 4:08 pm",
    layer: "Designer CRM",
    event: "DSG-002 KYC revoked",
  },
  {
    date: "01/09/26, 4:08 pm",
    layer: "Designer CRM",
    event: "DSG-002 stage set to CONTRACT",
  },
  {
    date: "01/09/26, 4:07 pm",
    layer: "Designer CRM",
    event: "Aarav Pet Atelier moved to CONTRACT",
  },
  {
    date: "01/09/26, 4:07 pm",
    layer: "Designer CRM",
    event: "DSG-001 stage set to APPROVED",
  },
  {
    date: "01/09/26, 4:07 pm",
    layer: "Designer CRM",
    event: "Sen & Co Pets moved to REVIEW",
  },
  {
    date: "29/08/26, 12:22 pm",
    layer: "Admin",
    event: "Workspace initialised with seed catalogue.",
  },
];

const layers = [
  {
    number: "01",
    name: "Designer CRM",
    path: "/designer-crm",
  },
  {
    number: "02",
    name: "Designer Portal",
    path: "/designer-portal",
  },
  {
    number: "03",
    name: "Product / SKU",
    path: "/catalogue",
  },
  {
    number: "04",
    name: "Catalogue QA",
    path: "/catalogueqa",
  },
  {
    number: "05",
    name: "Inventory Engine",
    path: "/inventory",
  },
  {
    number: "06",
    name: "Storefront",
    path: "/storefront",
  },
  {
    number: "07",
    name: "OMS",
    path: "/oms",
  },
  {
    number: "08",
    name: "Delivery Engine",
    path: "/delivery-engine",
  },
  {
    number: "09",
    name: "Returns Engine",
    path: "/returns",
  },
  {
    number: "10",
    name: "Settlement",
    path: "/settlement",
  },
  {
    number: "11",
    name: "BI Dashboards",
    path: "/bi-dashboard",
  },
  {
    number: "12",
    name: "Command Centre",
    path: "/command-centre",
  },
];

/* =========================================================
   CSV DOWNLOAD
========================================================= */

function downloadCSV(filename, rows) {
  if (!rows || rows.length === 0) {
    return;
  }

  const headers = Object.keys(rows[0]);

  const csv = [
    headers.join(","),
    ...rows.map((row) =>
      headers
        .map((header) => {
          const value = row[header] ?? "";
          return `"${String(value).replace(/"/g, '""')}"`;
        })
        .join(",")
    ),
  ].join("\n");

  const blob = new Blob([csv], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = filename;

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);

  URL.revokeObjectURL(url);
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CommandCentre() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [layerFilter, setLayerFilter] = useState("All layers");
  const [timeFilter, setTimeFilter] = useState("All time");

  const [exceptions, setExceptions] = useState(initialExceptions);
  const [auditLogs, setAuditLogs] = useState(initialAuditLogs);

  /* =======================================================
     FILTER AUDIT LOG
  ======================================================= */

  const filteredAuditLogs = useMemo(() => {
    const query = search.trim().toLowerCase();

    return auditLogs.filter((item) => {
      const matchesSearch =
        !query ||
        item.date.toLowerCase().includes(query) ||
        item.layer.toLowerCase().includes(query) ||
        item.event.toLowerCase().includes(query);

      const matchesLayer =
        layerFilter === "All layers" ||
        item.layer.toLowerCase() === layerFilter.toLowerCase();

      return matchesSearch && matchesLayer;
    });
  }, [search, layerFilter, auditLogs]);

  /* =======================================================
     EXPORT FULL REPORT
  ======================================================= */

  const handleExportFullReport = () => {
    const report = [
      {
        section: "Executive summary",
        metric: "Open exceptions",
        value: 6,
      },
      {
        section: "Executive summary",
        metric: "GMV booked",
        value: "₹0",
      },
      {
        section: "Executive summary",
        metric: "Sellable units",
        value: 44,
      },
      {
        section: "Executive summary",
        metric: "Active designers",
        value: 0,
      },
      ...exceptions.map((item) => ({
        section: "Exceptions",
        metric: item.type,
        value: item.text,
      })),
      ...auditLogs.map((item) => ({
        section: "Audit log",
        metric: `${item.layer} - ${item.date}`,
        value: item.event,
      })),
    ];

    downloadCSV("zenve-command-centre-report.csv", report);
  };

  /* =======================================================
     EXPORT FILTERED
  ======================================================= */

  const handleExportFiltered = () => {
    const rows = filteredAuditLogs.map((item) => ({
      Date: item.date,
      Layer: item.layer,
      Event: item.event,
    }));

    downloadCSV("zenve-filtered-audit-log.csv", rows);
  };

  /* =======================================================
     RESET DEMO DATA
  ======================================================= */

  const handleReset = () => {
    setExceptions(initialExceptions);
    setAuditLogs(initialAuditLogs);
    setSearch("");
    setLayerFilter("All layers");
    setTimeFilter("All time");
  };

  /* =======================================================
     NAVIGATION
  ======================================================= */

  const handleLayerNavigation = (path) => {
    navigate(path);
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <div className="command-centre-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="cc-header">

        <div className="cc-header-inner">

          {/* LOGO */}

          <div className="cc-logo-wrapper">
            <img
              src="/zenve-logo.png"
              alt="Zenve Fashion"
              className="cc-logo"
            />
          </div>

          {/* TITLE AREA */}

          <div className="cc-title-area">

            <button
              className="cc-back-button"
              onClick={() => navigate("/")}
            >
              <span className="cc-back-arrow">←</span>
              <span>ALL 12 LAYERS</span>
            </button>

            <h1 className="cc-page-title">
              <span className="cc-title-number">12</span>
              <span>Command Centre</span>
            </h1>

            <p className="cc-page-subtitle">
              Admin layer · Approvals, controls, exceptions
            </p>

          </div>

          {/* HEADER ACTIONS */}

          <div className="cc-header-actions">

            <div className="cc-search-box">
              <SearchIcon />

              <input
                type="text"
                placeholder="Search everything"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

              <span className="cc-shortcut">
                ⌘K
              </span>
            </div>

            <div className="cc-user-box">

              <UserIcon />

              <span className="cc-user-name">
                Priya Raghavan
              </span>

              <span className="cc-admin-badge">
                Admin
              </span>

            </div>

            <button
              className="cc-export-button"
              onClick={handleExportFullReport}
            >
              <DownloadIcon />
              <span>Export full report</span>
            </button>

            <button
              className="cc-reset-button"
              onClick={handleReset}
            >
              Reset demo data
            </button>

          </div>

        </div>

      </header>

      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="cc-main">

        {/* =================================================
            KPI CARDS
        ================================================= */}

        <section className="cc-kpi-grid">

          <div className="cc-kpi-card">
            <div className="cc-kpi-label">
              OPEN EXCEPTIONS
            </div>

            <div className="cc-kpi-value">
              {exceptions.length}
            </div>
          </div>

          <div className="cc-kpi-card">

            <div className="cc-kpi-label">
              GMV BOOKED
            </div>

            <div className="cc-kpi-value">
              ₹0
            </div>

            <div className="cc-kpi-helper">
              0 orders
            </div>

          </div>

          <div className="cc-kpi-card">

            <div className="cc-kpi-label">
              SELLABLE UNITS
            </div>

            <div className="cc-kpi-value">
              44
            </div>

          </div>

          <div className="cc-kpi-card">

            <div className="cc-kpi-label">
              ACTIVE DESIGNERS
            </div>

            <div className="cc-kpi-value">
              0
            </div>

          </div>

        </section>

        {/* =================================================
            PENDING APPROVALS
        ================================================= */}

        <section className="cc-panel approvals-panel">

          <div className="cc-section-heading">
            <h2>Pending approvals</h2>

            <p>
              Every item links to the layer where it gets cleared.
            </p>
          </div>

          <div className="cc-approval-grid">

            <button
              className="cc-approval-item"
              onClick={() => navigate("/catalogueqa")}
            >
              <span>SKUs pending QA</span>

              <span className="cc-count-badge warning">
                3
              </span>
            </button>

            <button
              className="cc-approval-item"
              onClick={() => navigate("/designer-crm")}
            >
              <span>Designers awaiting contract</span>

              <span className="cc-count-badge success">
                0
              </span>
            </button>

            <button
              className="cc-approval-item"
              onClick={() => navigate("/returns")}
            >
              <span>Returns awaiting inspection</span>

              <span className="cc-count-badge success">
                0
              </span>
            </button>

            <button
              className="cc-approval-item"
              onClick={() => navigate("/settlement")}
            >
              <span>Settlements to approve</span>

              <span className="cc-count-badge success">
                0
              </span>
            </button>

            <button
              className="cc-approval-item"
              onClick={() => navigate("/oms")}
            >
              <span>Orders to dispatch</span>

              <span className="cc-count-badge success">
                0
              </span>
            </button>

          </div>

        </section>

        {/* =================================================
            EXCEPTIONS
        ================================================= */}

        <section className="cc-panel exceptions-panel">

          <div className="cc-section-heading">
            <h2>Exceptions &amp; automation alerts</h2>

            <p>
              Generated by the rules in the blueprint.
            </p>
          </div>

          <div className="cc-exception-list">

            {exceptions.map((item, index) => (
              <div
                className="cc-exception-row"
                key={`${item.type}-${index}`}
              >

                <span
                  className={`cc-exception-badge ${item.severity}`}
                >
                  {item.type}
                </span>

                <span className="cc-exception-text">
                  {item.text}
                </span>

              </div>
            ))}

          </div>

        </section>

        {/* =================================================
            AUDIT LOG
        ================================================= */}

        <section className="cc-panel audit-panel">

          <div className="cc-audit-header">

            <div className="cc-section-heading">
              <h2>Audit log</h2>

              <p>
                Every price, inventory, approval, order and settlement
                change — filterable and exportable.
              </p>
            </div>

            <button
              className="cc-filter-export-button"
              onClick={handleExportFiltered}
            >
              <DownloadIcon />
              <span>Export filtered</span>
            </button>

          </div>

          {/* FILTERS */}

          <div className="cc-filter-row">

            <div className="cc-filter-search">

              <input
                type="text"
                placeholder="Search events, IDs, statuses..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            <div className="cc-select-wrapper">

              <select
                value={layerFilter}
                onChange={(e) => setLayerFilter(e.target.value)}
              >
                <option>All layers</option>
                <option>Designer CRM</option>
                <option>Admin</option>
              </select>

              <ChevronIcon />

            </div>

            <div className="cc-select-wrapper">

              <select
                value={timeFilter}
                onChange={(e) => setTimeFilter(e.target.value)}
              >
                <option>All time</option>
                <option>Today</option>
                <option>Last 7 days</option>
                <option>Last 30 days</option>
              </select>

              <ChevronIcon />

            </div>

            <div className="cc-events-count">
              {filteredAuditLogs.length} of {auditLogs.length} events
            </div>

          </div>

          {/* AUDIT TABLE */}

          <div className="cc-audit-table">

            {filteredAuditLogs.length > 0 ? (
              filteredAuditLogs.map((item, index) => (
                <div
                  className="cc-audit-row"
                  key={`${item.date}-${index}`}
                >

                  <div className="cc-audit-date">
                    {item.date}
                  </div>

                  <div className="cc-audit-layer">
                    {item.layer}
                  </div>

                  <div className="cc-audit-event">
                    {item.event}
                  </div>

                </div>
              ))
            ) : (
              <div className="cc-empty-audit">
                No audit events found.
              </div>
            )}

          </div>

        </section>

        {/* =================================================
            OPERATIONAL REPORT EXPORT
        ================================================= */}

        <section className="cc-panel report-panel">

          <div className="cc-report-header">

            <div className="cc-section-heading">

              <h2>
                Operational report export
              </h2>

              <p>
                Download the whole book of record, or just the section
                you need. Opens directly in Excel or Sheets.
              </p>

            </div>

            <button
              className="cc-export-button report-export"
              onClick={handleExportFullReport}
            >
              <DownloadIcon />
              <span>Export full report</span>
            </button>

          </div>

          <div className="cc-report-grid">

            <ReportItem
              title="Executive summary"
              rows="16 rows"
              onClick={handleExportFullReport}
            />

            <ReportItem
              title="Designers"
              rows="3 rows"
              onClick={() =>
                downloadCSV("designers.csv", [
                  {
                    Designer: "Aarav Pet Atelier",
                    Status: "Contract",
                  },
                  {
                    Designer: "Studio Ira Pets",
                    Status: "Signed",
                  },
                  {
                    Designer: "Sen & Co Pets",
                    Status: "Review",
                  },
                ])
              }
            />

            <ReportItem
              title="SKU & inventory"
              rows="6 rows"
              onClick={() =>
                downloadCSV("sku-inventory.csv", [
                  {
                    SKU: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
                    Available: 14,
                  },
                  {
                    SKU: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
                    Available: 4,
                  },
                  {
                    SKU: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
                    Available: 26,
                  },
                ])
              }
            />

            <ReportItem
              title="Orders"
              rows="0 rows"
              onClick={() =>
                downloadCSV("orders.csv", [])
              }
            />

            <ReportItem
              title="Returns"
              rows="0 rows"
              onClick={() =>
                downloadCSV("returns.csv", [])
              }
            />

            <ReportItem
              title="Settlements"
              rows="0 rows"
              onClick={() =>
                downloadCSV("settlements.csv", [])
              }
            />

            <ReportItem
              title="Audit log"
              rows={`${auditLogs.length} rows`}
              onClick={handleExportFiltered}
            />

          </div>

        </section>

        {/* =================================================
            JUMP TO LAYER
        ================================================= */}

        <section className="cc-panel jump-panel">

          <div className="cc-section-heading">
            <h2>Jump to a layer</h2>
          </div>

          <div className="cc-layer-grid">

            {layers.map((layer) => (
              <button
                key={layer.number}
                className={`cc-layer-button ${
                  layer.number === "12"
                    ? "active-layer"
                    : ""
                }`}
                onClick={() =>
                  handleLayerNavigation(layer.path)
                }
              >
                <span>
                  {layer.number} · {layer.name}
                </span>
              </button>
            ))}

          </div>

        </section>

      </main>

    </div>
  );
}

/* =========================================================
   REPORT ITEM COMPONENT
========================================================= */

function ReportItem({ title, rows, onClick }) {
  return (
    <button
      className="cc-report-item"
      onClick={onClick}
    >
      <span className="cc-report-title">
        {title}
      </span>

      <span className="cc-report-rows">
        {rows}
      </span>

      <DownloadIcon />
    </button>
  );
}