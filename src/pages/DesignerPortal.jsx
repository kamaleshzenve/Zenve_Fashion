import React, { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DesignerPortal.css";

/* =========================================================
   SEARCH ICON
========================================================= */

function SearchIcon() {
  return (
    <svg
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
      width="21"
      height="21"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
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
   ARROW ICON
========================================================= */

function ArrowDownIcon() {
  return (
    <svg
      width="19"
      height="19"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   BACK ICON
========================================================= */

function BackIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M19 12H5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      <path
        d="M10 7L5 12L10 17"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   TOGGLE
========================================================= */

function Toggle({ enabled, onChange }) {
  return (
    <button
      type="button"
      className={`portal-toggle ${enabled ? "active" : ""}`}
      onClick={() => onChange(!enabled)}
      aria-pressed={enabled}
    >
      <span className="portal-toggle-knob" />
    </button>
  );
}

/* =========================================================
   DESIGNER PORTAL
========================================================= */

export default function DesignerPortal() {
  /* =======================================================
     FORM STATE
  ======================================================= */

  const [designer, setDesigner] = useState("Aarav Pet Atelier");

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("M");
  const [mrp, setMrp] = useState("0");
  const [sellingPrice, setSellingPrice] = useState("0");
  const [stockingLocation, setStockingLocation] =
    useState("Mumbai FC");

  const [fastDelivery, setFastDelivery] = useState(true);
  const [returnable, setReturnable] = useState(true);

  /* =======================================================
     SKU PREVIEW
  ======================================================= */

  const skuPreview = useMemo(() => {
    if (!productName.trim()) {
      return "—";
    }

    const cleanProduct = productName
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

    const cleanColour = colour
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-");

    const cleanSize = size
      .trim()
      .toUpperCase()
      .replace(/[^A-Z0-9]+/g, "-");

    return `ZNV-AAR-POC-${cleanProduct}-${cleanColour || "COLOUR"}-${
      cleanSize || "SIZE"
    }`;
  }, [productName, colour, size]);

  /* =======================================================
     SUBMIT
  ======================================================= */

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!productName.trim()) {
      alert("Please enter the product name.");
      return;
    }

    if (!category.trim()) {
      alert("Please enter the category.");
      return;
    }

    if (!colour.trim()) {
      alert("Please enter the colour.");
      return;
    }

    alert("SKU submitted to QA successfully.");

    setProductName("");
    setCategory("");
    setColour("");
    setSize("M");
    setMrp("0");
    setSellingPrice("0");
  };

  /* =======================================================
     DESIGNER DATA
  ======================================================= */

  const designerData = {
    "Aarav Pet Atelier": {
      brand: "Aarav Pet Atelier",
      owner: "Aarav Mehta",
      contact: "aarav@petatelier.in",
      city: "Mumbai",
      stage: "ACTIVE",
      kyc: "Verified",
      gst: "27AAACZ1234A1Z5",
      contract: "2027-03-31",
      takeRate: "28%",
      skus: "2",
      available: "18",
      gmv: "₹0",
      payable: "₹0",
    },

    "Studio Ira Pets": {
      brand: "Studio Ira Pets",
      owner: "Ira Nair",
      contact: "ira@studioirapets.com",
      city: "Bangalore",
      stage: "LIVE",
      kyc: "Verified",
      gst: "29AAACI1234B1Z4",
      contract: "2026-12-31",
      takeRate: "32%",
      skus: "1",
      available: "26",
      gmv: "₹0",
      payable: "₹0",
    },
  };

  const currentDesigner = designerData[designer];

  /* =======================================================
     RETURN JSX
  ======================================================= */

  return (
    <main className="designer-portal-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="designer-portal-header">

        <div className="portal-header-left">

          {/* LOGO */}

          <div className="portal-logo">
            <img
              src="/logo.png"
              alt="Zenve Fashion"
            />
          </div>

          {/* TITLE AREA */}

          <div className="portal-title-area">

            <Link
              to="/"
              className="portal-back-link"
            >
              <BackIcon />
              <span>ALL 12 LAYERS</span>
            </Link>

            <h1 className="portal-title">
              <span className="portal-title-number">
                02
              </span>

              Designer Portal
            </h1>

            <p className="portal-subtitle">
              Supply layer · Profile, SKU upload, inventory,
              orders, settlement view
            </p>

          </div>
        </div>

        {/* ===================================================
            HEADER RIGHT
        =================================================== */}

        <div className="portal-header-right">

          {/* SEARCH */}

          <div className="portal-search">

            <SearchIcon />

            <span>
              Search everything
            </span>

            <kbd>
              ⌘K
            </kbd>

          </div>

          {/* USER */}

          <div className="portal-user">

            <UserIcon />

            <span className="portal-user-name">
              Priya Raghavan
            </span>

            <span className="portal-admin">
              Admin
            </span>

          </div>

          {/* SIGNED IN */}

          <div className="signed-in-wrapper">

            <label>
              SIGNED IN AS
            </label>

            <div className="signed-in-select-wrapper">

              <select
                value={designer}
                onChange={(event) =>
                  setDesigner(event.target.value)
                }
                className="signed-in-select"
              >
                <option value="Aarav Pet Atelier">
                  Aarav Pet Atelier
                </option>

                <option value="Studio Ira Pets">
                  Studio Ira Pets
                </option>
              </select>

              <span className="select-arrow">
                <ArrowDownIcon />
              </span>

            </div>

          </div>

        </div>
      </header>

      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <div className="designer-portal-content">

        {/* ===================================================
            KPI SECTION
        =================================================== */}

        <section className="portal-kpi-grid">

          {/* KPI 1 */}

          <div className="portal-kpi-card">

            <div className="portal-kpi-label">
              MY SKUS
            </div>

            <div className="portal-kpi-value">
              {currentDesigner.skus}
            </div>

            <div className="portal-kpi-subtitle">
              {currentDesigner.skus} live
            </div>

          </div>

          {/* KPI 2 */}

          <div className="portal-kpi-card">

            <div className="portal-kpi-label">
              UNITS AVAILABLE
            </div>

            <div className="portal-kpi-value">
              {currentDesigner.available}
            </div>

          </div>

          {/* KPI 3 */}

          <div className="portal-kpi-card">

            <div className="portal-kpi-label">
              MY GMV
            </div>

            <div className="portal-kpi-value">
              {currentDesigner.gmv}
            </div>

            <div className="portal-kpi-subtitle">
              0 orders
            </div>

          </div>

          {/* KPI 4 */}

          <div className="portal-kpi-card">

            <div className="portal-kpi-label">
              NET PAYABLE
            </div>

            <div className="portal-kpi-value">
              {currentDesigner.payable}
            </div>

            <div className="portal-kpi-subtitle">
              Take rate {currentDesigner.takeRate}
            </div>

          </div>

        </section>

        {/* ===================================================
            PROFILE
        =================================================== */}

        <section className="portal-section profile-section">

          <div className="portal-section-heading">

            <h2>
              My profile
            </h2>

            <p>
              Maintained by the acquisition team in the CRM.
            </p>

          </div>

          <div className="profile-grid">

            {/* BRAND */}

            <div className="profile-item">
              <span className="profile-label">
                BRAND
              </span>

              <span className="profile-value">
                {currentDesigner.brand}
              </span>
            </div>

            {/* OWNER */}

            <div className="profile-item">
              <span className="profile-label">
                OWNER
              </span>

              <span className="profile-value">
                {currentDesigner.owner}
              </span>
            </div>

            {/* CONTACT */}

            <div className="profile-item">
              <span className="profile-label">
                CONTACT
              </span>

              <span className="profile-value">
                {currentDesigner.contact}
              </span>
            </div>

            {/* CITY */}

            <div className="profile-item">
              <span className="profile-label">
                CITY
              </span>

              <span className="profile-value">
                {currentDesigner.city}
              </span>
            </div>

            {/* STAGE */}

            <div className="profile-item">
              <span className="profile-label">
                STAGE
              </span>

              <span className="profile-value">
                {currentDesigner.stage}
              </span>
            </div>

            {/* KYC */}

            <div className="profile-item">
              <span className="profile-label">
                KYC
              </span>

              <span className="profile-value">
                {currentDesigner.kyc}
              </span>
            </div>

            {/* GST */}

            <div className="profile-item">
              <span className="profile-label">
                GST
              </span>

              <span className="profile-value">
                {currentDesigner.gst}
              </span>
            </div>

            {/* CONTRACT */}

            <div className="profile-item">
              <span className="profile-label">
                CONTRACT ENDS
              </span>

              <span className="profile-value">
                {currentDesigner.contract}
              </span>
            </div>

            {/* TAKE RATE */}

            <div className="profile-item">
              <span className="profile-label">
                TAKE RATE
              </span>

              <span className="profile-value">
                {currentDesigner.takeRate}
              </span>
            </div>

          </div>

        </section>

        {/* ===================================================
            UPLOAD SKU
        =================================================== */}

        <section className="portal-section upload-section">

          <div className="portal-section-heading">

            <h2>
              Upload a SKU
            </h2>

            <p>
              SKU ID is auto-generated and the row goes
              straight to QA.
            </p>

          </div>

          <form
            className="sku-form"
            onSubmit={handleSubmit}
          >

            {/* PRODUCT NAME */}

            <div className="form-field">

              <label>
                PRODUCT NAME
              </label>

              <input
                type="text"
                value={productName}
                onChange={(event) =>
                  setProductName(event.target.value)
                }
                placeholder=""
              />

            </div>

            {/* CATEGORY */}

            <div className="form-field">

              <label>
                CATEGORY
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder=""
              />

            </div>

            {/* COLOUR */}

            <div className="form-field">

              <label>
                COLOUR
              </label>

              <input
                type="text"
                value={colour}
                onChange={(event) =>
                  setColour(event.target.value)
                }
                placeholder=""
              />

            </div>

            {/* SIZE */}

            <div className="form-field">

              <label>
                SIZE
              </label>

              <input
                type="text"
                value={size}
                onChange={(event) =>
                  setSize(event.target.value)
                }
              />

            </div>

            {/* MRP */}

            <div className="form-field">

              <label>
                MRP
              </label>

              <input
                type="number"
                min="0"
                value={mrp}
                onChange={(event) =>
                  setMrp(event.target.value)
                }
              />

            </div>

            {/* SELLING PRICE */}

            <div className="form-field">

              <label>
                SELLING PRICE
              </label>

              <input
                type="number"
                min="0"
                value={sellingPrice}
                onChange={(event) =>
                  setSellingPrice(event.target.value)
                }
              />

            </div>

            {/* STOCKING LOCATION */}

            <div className="form-field">

              <label>
                STOCKING LOCATION
              </label>

              <div className="custom-select-wrapper">

                <select
                  value={stockingLocation}
                  onChange={(event) =>
                    setStockingLocation(event.target.value)
                  }
                >
                  <option value="Mumbai FC">
                    Mumbai FC
                  </option>

                  <option value="Bangalore FC">
                    Bangalore FC
                  </option>
                </select>

                <span className="form-select-arrow">
                  <ArrowDownIcon />
                </span>

              </div>

            </div>

            {/* FAST DELIVERY */}

            <div className="toggle-field">

              <span className="toggle-label">
                FAST DELIVERY ELIGIBLE
              </span>

              <Toggle
                enabled={fastDelivery}
                onChange={setFastDelivery}
              />

            </div>

            {/* RETURNABLE */}

            <div className="toggle-field">

              <span className="toggle-label">
                RETURNABLE
              </span>

              <Toggle
                enabled={returnable}
                onChange={setReturnable}
              />

            </div>

          </form>

          {/* SKU PREVIEW */}

          <div className="sku-preview">

            <span>
              SKU ID preview:
            </span>

            <strong>
              {skuPreview}
            </strong>

          </div>

          {/* SUBMIT */}

          <button
            type="button"
            className="submit-qa-button"
            onClick={handleSubmit}
          >
            Submit to QA
          </button>

        </section>

        {/* ===================================================
            MY SKUS & STOCK
        =================================================== */}

        <section className="portal-section stock-section">

          <div className="portal-section-heading">

            <h2>
              My SKUs &amp; stock
            </h2>

            <p>
              Live availability the storefront can sell.
            </p>

          </div>

          <div className="stock-table-wrapper">

            <table className="stock-table">

              <thead>

                <tr>
                  <th>SKU</th>
                  <th>PRICE</th>
                  <th>QA</th>
                  <th>AVAILABLE</th>
                  <th>RESERVED</th>
                  <th>SOLD</th>
                </tr>

              </thead>

              <tbody>

                <tr>

                  <td data-label="SKU">

                    <div className="sku-product-name">
                      Ivory Silk Dog Kurta
                    </div>

                    <div className="sku-code">
                      ZNV-AAR-POC-DOGKURTA-IVORY-M
                    </div>

                  </td>

                  <td data-label="PRICE">
                    ₹3,499
                  </td>

                  <td data-label="QA">
                    <span className="qa-badge">
                      APPROVED
                    </span>
                  </td>

                  <td data-label="AVAILABLE">
                    14
                  </td>

                  <td data-label="RESERVED">
                    0
                  </td>

                  <td data-label="SOLD">
                    0
                  </td>

                </tr>

                <tr>

                  <td data-label="SKU">

                    <div className="sku-product-name">
                      Rose Zari Dog Lehenga
                    </div>

                    <div className="sku-code">
                      ZNV-AAR-POC-DOGLEHENGA-ROSE-S
                    </div>

                  </td>

                  <td data-label="PRICE">
                    ₹6,950
                  </td>

                  <td data-label="QA">
                    <span className="qa-badge">
                      APPROVED
                    </span>
                  </td>

                  <td data-label="AVAILABLE">
                    4
                  </td>

                  <td data-label="RESERVED">
                    0
                  </td>

                  <td data-label="SOLD">
                    0
                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

        {/* ===================================================
            ORDERS & SETTLEMENTS
        =================================================== */}

        <section className="portal-section orders-section">

          <div className="portal-section-heading">

            <h2>
              My orders &amp; settlements
            </h2>

          </div>

          <div className="orders-empty-state">

            <p>
              No orders yet — sell something from the
              Storefront layer.
            </p>

            <Link
              to="/storefront"
              className="storefront-link"
            >
              Go to Storefront
            </Link>

          </div>

        </section>

      </div>

    </main>
  );
}