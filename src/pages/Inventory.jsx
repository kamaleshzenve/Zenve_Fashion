import React, { useState } from "react";
import "../styles/Inventory.css";

/* =========================================================
   INVENTORY DATA
========================================================= */

const inventoryItems = [
  {
    id: 1,
    name: "Ivory Silk Dog Kurta",
    sku: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
    location: "Mumbai FC",
    physical: 14,
    reserved: 0,
    available: 14,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: false,
  },
  {
    id: 2,
    name: "Rose Zari Dog Lehenga",
    sku: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
    location: "Mumbai FC",
    physical: 4,
    reserved: 0,
    available: 4,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: false,
  },
  {
    id: 3,
    name: "Aqua Linen Cat Harness",
    sku: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
    location: "Bangalore FC",
    physical: 26,
    reserved: 0,
    available: 26,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: false,
  },
  {
    id: 4,
    name: "Sand Quilted Pet Bed",
    sku: "ZNV-IRA-PEV-PETBED-SAND-M",
    location: "Bangalore FC",
    physical: 0,
    reserved: 0,
    available: 0,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: true,
  },
  {
    id: 5,
    name: "Noir Twin Bandana Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-BANDANA-NOIR-F",
    location: "Designer Studio",
    physical: 0,
    reserved: 0,
    available: 0,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: true,
  },
  {
    id: 6,
    name: "Olive Twin Scarf Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-MATCHSCARF-OLIVE-F",
    location: "Designer Studio",
    physical: 0,
    reserved: 0,
    available: 0,
    transit: 0,
    returned: 0,
    damaged: 0,
    quarantined: 0,
    outOfStock: true,
  },
];

/* =========================================================
   METRIC CARD DATA
========================================================= */

const metricLabels = [
  {
    key: "physical",
    label: "PHYSICAL",
  },
  {
    key: "reserved",
    label: "RESERVED",
  },
  {
    key: "available",
    label: "AVAILABLE",
  },
  {
    key: "transit",
    label: "IN TRANSIT",
  },
  {
    key: "returned",
    label: "RETURNED",
  },
  {
    key: "damaged",
    label: "DAMAGED",
  },
  {
    key: "quarantined",
    label: "QUARANTINED",
  },
];

/* =========================================================
   INVENTORY PAGE
========================================================= */

const Inventory = () => {
  const [items, setItems] = useState(inventoryItems);

  /* -------------------------------------------------------
     TOTAL INVENTORY VALUES
  ------------------------------------------------------- */

  const totals = items.reduce(
    (acc, item) => {
      acc.physical += item.physical;
      acc.reserved += item.reserved;
      acc.available += item.available;
      acc.damaged += item.damaged;
      acc.quarantined += item.quarantined;

      return acc;
    },
    {
      physical: 0,
      reserved: 0,
      available: 0,
      damaged: 0,
      quarantined: 0,
    }
  );

  /* -------------------------------------------------------
     RECEIVE STOCK
  ------------------------------------------------------- */

  const handleReceive = (id, quantity) => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          physical: item.physical + qty,
          available: item.available + qty,
          outOfStock: false,
        };
      })
    );
  };

  /* -------------------------------------------------------
     MARK DAMAGED
  ------------------------------------------------------- */

  const handleDamaged = (id, quantity) => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const availableToDamage = Math.min(
          qty,
          item.available
        );

        return {
          ...item,
          available:
            item.available - availableToDamage,
          damaged:
            item.damaged + availableToDamage,
          outOfStock:
            item.available - availableToDamage <= 0,
        };
      })
    );
  };

  /* -------------------------------------------------------
     QUARANTINE
  ------------------------------------------------------- */

  const handleQuarantine = (id, quantity) => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const availableToQuarantine = Math.min(
          qty,
          item.available
        );

        return {
          ...item,
          available:
            item.available - availableToQuarantine,
          quarantined:
            item.quarantined +
            availableToQuarantine,
          outOfStock:
            item.available -
              availableToQuarantine <=
            0,
        };
      })
    );
  };

  /* -------------------------------------------------------
     RELEASE QUARANTINE
  ------------------------------------------------------- */

  const handleReleaseQuarantine = (
    id,
    quantity
  ) => {
    const qty = Number(quantity);

    if (!qty || qty <= 0) {
      return;
    }

    setItems((currentItems) =>
      currentItems.map((item) => {
        if (item.id !== id) {
          return item;
        }

        const quantityToRelease = Math.min(
          qty,
          item.quarantined
        );

        return {
          ...item,
          quarantined:
            item.quarantined -
            quantityToRelease,
          available:
            item.available +
            quantityToRelease,
          outOfStock: false,
        };
      })
    );
  };

  /* -------------------------------------------------------
     BACK TO ALL 12 LAYERS
  ------------------------------------------------------- */

  const handleBackToLayers = () => {
    window.history.back();
  };

  return (
    <div className="inventory-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="inventory-header">

        <div className="inventory-header-left">

          {/* LOGO */}

          {/*
          <div className="inventory-logo">

            <div className="logo-symbol">
              Z
            </div>

            <div className="logo-text">
              ZENVE
              <span>FASHION</span>
            </div>

          </div>
          */}

          <div className="inventory-title-area">

            {/* =================================================
                BACK LINK
            ================================================= */}

            <div
              className="back-link"
              onClick={handleBackToLayers}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (
                  e.key === "Enter" ||
                  e.key === " "
                ) {
                  handleBackToLayers();
                }
              }}
              style={{
                cursor: "pointer",
              }}
            >
              <span className="back-arrow">
                ←
              </span>

              <span>
                ALL 12 LAYERS
              </span>
            </div>

            <h1>

              <span className="page-number">
                05
              </span>{" "}

              Inventory Engine

            </h1>

            <p>
              Inventory layer · Physical, reserved,
              available, damaged, returned, in-transit
            </p>

          </div>

        </div>

        {/* =====================================================
            HEADER RIGHT
        ===================================================== */}

        <div className="inventory-header-right">

          <div className="search-box">

            <span className="search-icon">
              ⌕
            </span>

            <span className="search-placeholder">
              Search everything
            </span>

            <span className="search-shortcut">
              ⌘K
            </span>

          </div>

          <div className="profile-box">

            <span className="profile-icon">
              ♙
            </span>

            <span className="profile-name">
              Priya Raghavan
            </span>

            <span className="admin-badge">
              Admin
            </span>

          </div>

        </div>

      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="inventory-content">

        {/* ===================================================
            SUMMARY CARDS
        =================================================== */}

        <section className="summary-grid">

          <div className="summary-card">

            <span className="summary-label">
              PHYSICAL
            </span>

            <strong className="summary-value">
              {totals.physical}
            </strong>

            <span className="summary-description">
              Units on hand
            </span>

          </div>

          <div className="summary-card">

            <span className="summary-label">
              RESERVED
            </span>

            <strong className="summary-value">
              {totals.reserved}
            </strong>

            <span className="summary-description">
              Held by live orders
            </span>

          </div>

          <div className="summary-card">

            <span className="summary-label">
              AVAILABLE
            </span>

            <strong className="summary-value">
              {totals.available}
            </strong>

            <span className="summary-description">
              Sellable now
            </span>

          </div>

          <div className="summary-card">

            <span className="summary-label">
              BLOCKED
            </span>

            <strong className="summary-value">
              {
                totals.damaged +
                totals.quarantined
              }
            </strong>

            <span className="summary-description">
              Damaged + quarantined
            </span>

          </div>

        </section>

        {/* ===================================================
            STOCK LEDGER
        =================================================== */}

        <section className="ledger-section">

          <div className="section-heading">

            <h2>
              Stock ledger
            </h2>

            <p>
              Only available units are sellable.
              Receiving stock, damage and quarantine
              are all logged.
            </p>

          </div>

          <div className="inventory-list">

            {items.map((item) => (

              <InventoryCard
                key={item.id}
                item={item}
                onReceive={handleReceive}
                onDamaged={handleDamaged}
                onQuarantine={
                  handleQuarantine
                }
                onReleaseQuarantine={
                  handleReleaseQuarantine
                }
              />

            ))}

          </div>

        </section>

        {/* ===================================================
            INVENTORY RULES
        =================================================== */}

        <section className="rules-section">

          <div className="section-heading">

            <h2>
              Inventory rules in force
            </h2>

            <p>
              Applied automatically by the order
              and returns engines.
            </p>

          </div>

          <div className="rules-grid">

            <div className="rules-column">

              <div className="rule">
                • Order placed → Available −1,
                Reserved +1
              </div>

              <div className="rule">
                • Delivered → In transit −1,
                sold recorded
              </div>

              <div className="rule">
                • Return received → Returned +1
              </div>

              <div className="rule">
                • Return failed → Returned −1,
                Damaged +1
              </div>

            </div>

            <div className="rules-column">

              <div className="rule">
                • Shipped → Reserved −1,
                In transit +1
              </div>

              <div className="rule">
                • Cancelled before dispatch →
                Reserved −1, Available +1
              </div>

              <div className="rule">
                • Return passed inspection →
                Returned −1, Available +1
              </div>

            </div>

          </div>

        </section>

      </main>

    </div>
  );
};

/* =========================================================
   INVENTORY CARD COMPONENT
========================================================= */

const InventoryCard = ({
  item,
  onReceive,
  onDamaged,
  onQuarantine,
  onReleaseQuarantine,
}) => {

  const [quantity, setQuantity] =
    useState("");

  const handleReceiveClick = () => {

    onReceive(
      item.id,
      quantity
    );

    setQuantity("");

  };

  const handleDamagedClick = () => {

    onDamaged(
      item.id,
      quantity
    );

    setQuantity("");

  };

  const handleQuarantineClick = () => {

    onQuarantine(
      item.id,
      quantity
    );

    setQuantity("");

  };

  const handleReleaseClick = () => {

    onReleaseQuarantine(
      item.id,
      quantity
    );

    setQuantity("");

  };

  return (

    <article className="inventory-card">

      {/* -----------------------------------------------------
          PRODUCT HEADER
      ----------------------------------------------------- */}

      <div className="product-header">

        <div className="product-title-row">

          <h3>
            {item.name}
          </h3>

          {item.outOfStock && (

            <span className="out-stock-badge">
              Out of stock
            </span>

          )}

          <span className="location-badge">
            {item.location}
          </span>

        </div>

        <div className="product-sku">
          {item.sku}
        </div>

      </div>

      {/* -----------------------------------------------------
          INVENTORY METRICS
      ----------------------------------------------------- */}

      <div className="inventory-metrics">

        {metricLabels.map((metric) => (

          <div
            className="inventory-metric"
            key={metric.key}
          >

            <span className="metric-label">
              {metric.label}
            </span>

            <strong className="metric-value">
              {item[metric.key]}
            </strong>

          </div>

        ))}

      </div>

      {/* -----------------------------------------------------
          ACTIONS
      ----------------------------------------------------- */}

      <div className="inventory-actions">

        <input
          type="number"
          min="1"
          value={quantity}
          onChange={(e) =>
            setQuantity(
              e.target.value
            )
          }
          placeholder="Qty"
          className="quantity-input"
        />

        <button
          type="button"
          className="action-button primary-button"
          onClick={handleReceiveClick}
        >
          Receive (GRN)
        </button>

        <button
          type="button"
          className="action-button"
          onClick={handleDamagedClick}
          disabled={
            item.available === 0
          }
        >
          Mark damaged
        </button>

        <button
          type="button"
          className="action-button"
          onClick={
            handleQuarantineClick
          }
          disabled={
            item.available === 0
          }
        >
          Quarantine
        </button>

        <button
          type="button"
          className="action-button disabled-button"
          onClick={
            handleReleaseClick
          }
          disabled={
            item.quarantined === 0
          }
        >
          Release quarantine
        </button>

        <div className="location-select">

          <span>
            {item.location}
          </span>

          <span className="select-arrow">
            ▾
          </span>

        </div>

      </div>

    </article>

  );
};

export default Inventory;