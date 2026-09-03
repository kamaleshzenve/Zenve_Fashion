import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/CatalogueQa.css";

/* =========================================================
   CATALOGUE QA DATA
========================================================= */

const initialQueue = [
  {
    id: 1,
    name: "Sand Quilted Pet Bed",
    sku: "ZNV-IRA-PEV-PETBED-SAND-M",
    designer: "Studio Ira Pets",
    category: "Pet Everyday",
    colour: "Sand",
    size: "M",
    price: "₹4,999",
    location: "Bangalore FC",
    status: "PENDING_QA",
    checks: [
      "Required fields complete",
      "Price and MRP consistent",
      "Return policy declared",
      "Images and size chart present",
      "Category and attributes correct",
    ],
  },
  {
    id: 2,
    name: "Noir Twin Bandana Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-BANDANA-NOIR-F",
    designer: "Sen & Co Pets",
    category: "Pet + Owner Twinning",
    colour: "Noir",
    size: "Free",
    price: "₹1,899",
    location: "Designer Studio",
    status: "PENDING_QA",
    checks: [
      "Required fields complete",
      "Price and MRP consistent",
      "Return policy declared",
      "Images and size chart present",
      "Category and attributes correct",
    ],
  },
  {
    id: 3,
    name: "Olive Twin Scarf Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-MATCHSCARF-OLIVE-F",
    designer: "Sen & Co Pets",
    category: "Pet + Owner Twinning",
    colour: "Olive",
    size: "Free",
    price: "₹2,499",
    location: "Designer Studio",
    status: "PENDING_QA",
    checks: [
      "Required fields complete",
      "Price and MRP consistent",
      "Return policy declared",
      "Images and size chart present",
      "Category and attributes correct",
    ],
  },
];

const initialReviewed = [
  {
    id: 101,
    name: "Ivory Silk Dog Kurta",
    sku: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
    score: 96,
    status: "APPROVED",
  },
  {
    id: 102,
    name: "Rose Zari Dog Lehenga",
    sku: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
    score: 92,
    status: "APPROVED",
  },
  {
    id: 103,
    name: "Aqua Linen Cat Harness",
    sku: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
    score: 91,
    status: "APPROVED",
  },
];

/* =========================================================
   ICONS
========================================================= */

function SearchIcon() {
  return (
    <svg
      className="cqa-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="11"
        cy="11"
        r="6.5"
      />
      <path d="M16 16l5 5" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg
      className="cqa-user-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <circle
        cx="12"
        cy="8"
        r="3.5"
      />
      <path d="M5.5 20c.7-3.5 2.8-5.3 6.5-5.3s5.8 1.8 6.5 5.3" />
    </svg>
  );
}

function ArrowLeft() {
  return (
    <svg
      className="cqa-arrow-icon"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M10 7l-5 5 5 5" />
    </svg>
  );
}

/* =========================================================
   STATUS BADGE
========================================================= */

function StatusBadge({
  children,
  type = "pending",
}) {
  return (
    <span className={`cqa-status-badge ${type}`}>
      {children}
    </span>
  );
}

/* =========================================================
   HEADER
========================================================= */

function CatalogueHeader() {
  const navigate = useNavigate();

  return (
    <header className="cqa-header">
      <div className="cqa-header-inner">

        {/* BRAND */}

        {/*
        <div className="cqa-brand">
          <div className="cqa-logo-placeholder">
            <div className="cqa-logo-mark">
              ZENVE
            </div>
            <span>FASHION</span>
          </div>
        </div>
        */}

        {/* MAIN HEADER */}

        <div className="cqa-header-main">

          <div className="cqa-header-top">

            {/* BACK */}

            <button
              type="button"
              className="cqa-back-button"
              onClick={() => navigate("/")}
            >
              <ArrowLeft />
              <span>ALL 12 LAYERS</span>
            </button>

            {/* ACTIONS */}

            <div className="cqa-header-actions">

              <button
                type="button"
                className="cqa-global-search"
              >
                <SearchIcon />

                <span>
                  Search everything
                </span>

                <kbd>⌘K</kbd>
              </button>

              <div className="cqa-profile">

                <UserIcon />

                <span className="cqa-profile-name">
                  Priya Raghavan
                </span>

                <span className="cqa-admin">
                  Admin
                </span>

              </div>

            </div>
          </div>

          {/* PAGE TITLE */}

          <div className="cqa-page-heading">

            <h1>
              <span>04</span> Catalogue QA
            </h1>

            <p>
              QA layer · Validation, approval, audit trail
            </p>

          </div>

        </div>
      </div>
    </header>
  );
}

/* =========================================================
   STATISTICS
========================================================= */

function Statistics({
  queueCount,
  reviewed,
}) {
  const approvedCount = reviewed.filter(
    (item) => item.status === "APPROVED"
  ).length;

  const rejectedCount = reviewed.filter(
    (item) => item.status === "REJECTED"
  ).length;

  const stats = [
    {
      label: "IN QUEUE",
      value: String(queueCount),
      description:
        queueCount > 0
          ? "Awaiting a score"
          : "",
    },
    {
      label: "APPROVED",
      value: String(approvedCount),
      description: "",
    },
    {
      label: "REJECTED",
      value: String(rejectedCount),
      description: "",
    },
  ];

  return (
    <section className="cqa-statistics">

      {stats.map((item) => (
        <article
          className="cqa-stat-card"
          key={item.label}
        >

          <span className="cqa-stat-label">
            {item.label}
          </span>

          <span className="cqa-stat-value">
            {item.value}
          </span>

          {item.description && (
            <span className="cqa-stat-description">
              {item.description}
            </span>
          )}

        </article>
      ))}

    </section>
  );
}

/* =========================================================
   QA CARD
========================================================= */

function QAReviewCard({
  item,
  score,
  setScore,
  onSubmit,
  onQuickApprove,
  onQuickReject,
}) {
  return (
    <article className="cqa-review-card">

      {/* CARD TITLE */}

      <div className="cqa-review-title-row">

        <h3>
          {item.name}
        </h3>

        <StatusBadge type="pending">
          {item.status}
        </StatusBadge>

      </div>

      {/* SKU */}

      <div className="cqa-sku-code">
        {item.sku}
      </div>

      {/* PRODUCT SUMMARY */}

      <div className="cqa-product-summary">

        {item.designer}
        {" · "}
        {item.category}
        {" · "}
        {item.colour}
        {" / "}
        {item.size}
        {" · "}
        {item.price}
        {" · "}
        {item.location}

      </div>

      {/* CHECKLIST */}

      <div className="cqa-check-grid">

        <div className="cqa-check-column">

          {item.checks
            .slice(0, 3)
            .map((check) => (
              <div
                className="cqa-check-item"
                key={check}
              >
                <span>•</span>
                {check}
              </div>
            ))}

        </div>

        <div className="cqa-check-column">

          {item.checks
            .slice(3)
            .map((check) => (
              <div
                className="cqa-check-item"
                key={check}
              >
                <span>•</span>
                {check}
              </div>
            ))}

        </div>

      </div>

      {/* ACTIONS */}

      <div className="cqa-review-actions">

        <input
          type="number"
          min="0"
          max="100"
          value={score}
          onChange={(e) =>
            setScore(e.target.value)
          }
          placeholder="QA score"
          className="cqa-score-input"
        />

        <button
          type="button"
          className="cqa-submit-button"
          onClick={() => onSubmit(item)}
        >
          Submit review
        </button>

        <button
          type="button"
          className="cqa-secondary-button"
          onClick={() =>
            onQuickApprove(item)
          }
        >
          Quick approve (95)
        </button>

        <button
          type="button"
          className="cqa-secondary-button"
          onClick={() =>
            onQuickReject(item)
          }
        >
          Quick reject (60)
        </button>

      </div>

    </article>
  );
}

/* =========================================================
   REVIEWED SKU
========================================================= */

function ReviewedSKUs({
  reviewed,
}) {
  return (
    <section className="cqa-section-card">

      <h2 className="cqa-section-title">
        Reviewed SKUs
      </h2>

      <div className="cqa-reviewed-list">

        {reviewed.map((item) => (

          <div
            className="cqa-reviewed-row"
            key={item.id}
          >

            <div className="cqa-reviewed-name">
              {item.name}
            </div>

            <div className="cqa-reviewed-sku">
              {item.sku}
            </div>

            <div className="cqa-reviewed-score">
              Score {item.score}
            </div>

            <StatusBadge
              type={
                item.status === "APPROVED"
                  ? "approved"
                  : item.status === "REJECTED"
                    ? "rejected"
                    : "correction"
              }
            >
              {item.status}
            </StatusBadge>

          </div>

        ))}

      </div>

    </section>
  );
}

/* =========================================================
   AUDIT TRAIL
========================================================= */

function AuditTrail({
  auditTrail,
}) {
  return (
    <section className="cqa-section-card cqa-audit-section">

      <h2 className="cqa-section-title">
        Audit trail
      </h2>

      <p className="cqa-section-description">
        Every QA decision is timestamped.
      </p>

      {auditTrail.length === 0 ? (

        <div className="cqa-empty-audit">
          No QA decisions recorded yet
        </div>

      ) : (

        <div className="cqa-audit-list">

          {auditTrail.map((item) => (

            <div
              className="cqa-audit-row"
              key={item.id}
            >

              <div>
                <strong>
                  {item.name}
                </strong>

                <span>
                  {item.sku}
                </span>
              </div>

              <div>
                Score {item.score}
              </div>

              <StatusBadge
                type={
                  item.status === "APPROVED"
                    ? "approved"
                    : item.status === "REJECTED"
                      ? "rejected"
                      : "correction"
                }
              >
                {item.status}
              </StatusBadge>

              <time>
                {item.timestamp}
              </time>

            </div>

          ))}

        </div>

      )}

    </section>
  );
}

/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function CatalogueQA() {

  const [queue, setQueue] =
    useState(initialQueue);

  const [reviewed, setReviewed] =
    useState(initialReviewed);

  const [scores, setScores] =
    useState({});

  const [search, setSearch] =
    useState("");

  const [auditTrail, setAuditTrail] =
    useState([]);

  /* =======================================================
     FILTER QUEUE
  ======================================================= */

  const filteredQueue = useMemo(() => {

    const keyword =
      search.trim().toLowerCase();

    if (!keyword) {
      return queue;
    }

    return queue.filter((item) => {

      return (
        item.name
          .toLowerCase()
          .includes(keyword) ||

        item.sku
          .toLowerCase()
          .includes(keyword) ||

        item.designer
          .toLowerCase()
          .includes(keyword) ||

        item.category
          .toLowerCase()
          .includes(keyword) ||

        item.colour
          .toLowerCase()
          .includes(keyword)
      );

    });

  }, [queue, search]);

  /* =======================================================
     SCORE CHANGE
  ======================================================= */

  const handleScoreChange = (
    id,
    value
  ) => {

    setScores((previous) => ({
      ...previous,
      [id]: value,
    }));

  };

  /* =======================================================
     REMOVE FROM QUEUE
  ======================================================= */

  const removeFromQueue = (item) => {

    setQueue((previous) =>
      previous.filter(
        (queueItem) =>
          queueItem.id !== item.id
      )
    );

    setScores((previous) => {

      const updated = {
        ...previous,
      };

      delete updated[item.id];

      return updated;

    });

  };

  /* =======================================================
     ADD AUDIT ENTRY
  ======================================================= */

  const addAuditEntry = (
    item,
    score,
    status
  ) => {

    const auditItem = {
      id:
        Date.now() +
        Math.random(),

      name: item.name,

      sku: item.sku,

      score,

      status,

      timestamp:
        new Date().toLocaleString(),
    };

    setAuditTrail((previous) => [
      auditItem,
      ...previous,
    ]);

  };

  /* =======================================================
     SUBMIT REVIEW
  ======================================================= */

  const handleSubmit = (item) => {

    const enteredScore =
      Number(scores[item.id]);

    if (
      Number.isNaN(enteredScore) ||
      scores[item.id] === undefined ||
      scores[item.id] === "" ||
      enteredScore < 0 ||
      enteredScore > 100
    ) {

      window.alert(
        "Please enter a QA score between 0 and 100."
      );

      return;
    }

    const status =
      enteredScore >= 90
        ? "APPROVED"
        : enteredScore >= 75
          ? "CORRECTION"
          : "REJECTED";

    const reviewedItem = {

      id:
        Date.now() +
        Math.random(),

      name: item.name,

      sku: item.sku,

      score: enteredScore,

      status,

    };

    setReviewed((previous) => [
      ...previous,
      reviewedItem,
    ]);

    addAuditEntry(
      item,
      enteredScore,
      status
    );

    removeFromQueue(item);

  };

  /* =======================================================
     QUICK APPROVE
  ======================================================= */

  const handleQuickApprove = (item) => {

    const reviewedItem = {

      id:
        Date.now() +
        Math.random(),

      name: item.name,

      sku: item.sku,

      score: 95,

      status: "APPROVED",

    };

    setReviewed((previous) => [
      ...previous,
      reviewedItem,
    ]);

    addAuditEntry(
      item,
      95,
      "APPROVED"
    );

    removeFromQueue(item);

  };

  /* =======================================================
     QUICK REJECT
  ======================================================= */

  const handleQuickReject = (item) => {

    const reviewedItem = {

      id:
        Date.now() +
        Math.random(),

      name: item.name,

      sku: item.sku,

      score: 60,

      status: "REJECTED",

    };

    setReviewed((previous) => [
      ...previous,
      reviewedItem,
    ]);

    addAuditEntry(
      item,
      60,
      "REJECTED"
    );

    removeFromQueue(item);

  };

  /* =======================================================
     RETURN
  ======================================================= */

  return (

    <div className="catalogue-qa-page">

      <CatalogueHeader />

      <main className="cqa-main">

        {/* STATISTICS */}

        <Statistics
          queueCount={queue.length}
          reviewed={reviewed}
        />

        {/* QA QUEUE */}

        <section className="cqa-queue-card">

          <div className="cqa-queue-header">

            <div>

              <h2>
                QA queue
              </h2>

              <p>
                Score bands: 90–100 approve ·
                75–89 correction ·
                below 75 reject.
              </p>

            </div>

          </div>

          {/* SEARCH */}

          <div className="cqa-queue-search">

            <SearchIcon />

            <input
              type="text"
              placeholder="Search SKU, name, colour..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>

          {/* QUEUE LIST */}

          <div className="cqa-queue-list">

            {filteredQueue.length > 0 ? (

              filteredQueue.map((item) => (

                <QAReviewCard
                  key={item.id}
                  item={item}

                  score={
                    scores[item.id] || ""
                  }

                  setScore={(value) =>
                    handleScoreChange(
                      item.id,
                      value
                    )
                  }

                  onSubmit={
                    handleSubmit
                  }

                  onQuickApprove={
                    handleQuickApprove
                  }

                  onQuickReject={
                    handleQuickReject
                  }
                />

              ))

            ) : (

              <div className="cqa-no-results">

                <h3>
                  No SKUs found
                </h3>

                <p>
                  Try searching with another SKU,
                  name or colour.
                </p>

              </div>

            )}

          </div>

        </section>

        {/* REVIEWED */}

        <ReviewedSKUs
          reviewed={reviewed}
        />

        {/* AUDIT */}

        <AuditTrail
          auditTrail={auditTrail}
        />

      </main>

    </div>

  );
}