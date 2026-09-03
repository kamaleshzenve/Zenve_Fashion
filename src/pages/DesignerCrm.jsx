import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/DesignerCRM.css";

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
   CHEVRON ICON
========================================================= */

function ChevronDown() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6 9L12 15L18 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* =========================================================
   DESIGNER DATA
========================================================= */

const initialDesigners = [
  {
    id: "DSG-001",
    name: "Aarav Pet Atelier",
    owner: "Aarav Mehta",
    email: "aarav@petatelier.in",
    city: "Mumbai",
    category: "Pet Occasion Wear",
    takeRate: "28%",
    contractEnd: "2027-03-31",
    status: "ACTIVE",
    tier: "Premium",
    kyc: "KYC verified",
  },

  {
    id: "DSG-002",
    name: "Studio Ira Pets",
    owner: "Ira Nair",
    email: "ira@studioirapets.com",
    city: "Bangalore",
    category: "Pet Everyday",
    takeRate: "32%",
    contractEnd: "2026-12-31",
    status: "LIVE",
    tier: "Core",
    kyc: "KYC verified",
  },

  {
    id: "DSG-003",
    name: "Sen & Co Pets",
    owner: "Kabir Sen",
    email: "kabir@sencopets.in",
    city: "Delhi",
    category: "Pet + Owner Twinning",
    takeRate: "35%",
    contractEnd: "",
    status: "PORTFOLIO",
    tier: "Emerging",
    kyc: "KYC missing",
  },
];

/* =========================================================
   DESIGNER CRM PAGE
========================================================= */

function DesignerCRM() {
  const [designers, setDesigners] = useState(initialDesigners);

  const [formData, setFormData] = useState({
    designerName: "",
    brand: "",
    contact: "",
    city: "Mumbai",
    category: "Pet Occasion Wear",
    tier: "Emerging",
    takeRate: "32",
    gst: "",
    contractDate: "",
  });

  /* =======================================================
     FORM INPUT HANDLER
  ======================================================= */

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  /* =======================================================
     CREATE DESIGNER LEAD
  ======================================================= */

  const handleCreateLead = (event) => {
    event.preventDefault();

    if (!formData.designerName.trim()) {
      alert("Please enter designer name.");
      return;
    }

    if (!formData.brand.trim()) {
      alert("Please enter brand.");
      return;
    }

    if (!formData.contact.trim()) {
      alert("Please enter contact email / phone.");
      return;
    }

    const newDesigner = {
      id: `DSG-${String(designers.length + 1).padStart(3, "0")}`,
      name: formData.designerName,
      owner: formData.brand,
      email: formData.contact,
      city: formData.city,
      category: formData.category,
      takeRate: `${formData.takeRate}%`,
      contractEnd: formData.contractDate,
      status: "LEAD",
      tier: formData.tier,
      kyc: "KYC missing",
    };

    setDesigners((previous) => [...previous, newDesigner]);

    setFormData({
      designerName: "",
      brand: "",
      contact: "",
      city: "Mumbai",
      category: "Pet Occasion Wear",
      tier: "Emerging",
      takeRate: "32",
      gst: "",
      contractDate: "",
    });
  };

  /* =======================================================
     STAGE CHANGE
  ======================================================= */

  const handleStageChange = (id, value) => {
    setDesigners((previous) =>
      previous.map((designer) =>
        designer.id === id
          ? {
              ...designer,
              status: value,
            }
          : designer
      )
    );
  };

  /* =======================================================
     KYC ACTION
  ======================================================= */

  const handleKycAction = (id) => {
    setDesigners((previous) =>
      previous.map((designer) =>
        designer.id === id
          ? {
              ...designer,
              kyc: "KYC verified",
            }
          : designer
      )
    );
  };

  /* =======================================================
     ADVANCE STAGE
  ======================================================= */

  const handleAdvanceStage = (id) => {
    const stages = [
      "LEAD",
      "QUALIFIED",
      "PORTFOLIO",
      "REVIEW",
      "APPROVED",
      "CONTRACT",
      "SIGNED",
      "LIVE",
      "ACTIVE",
    ];

    setDesigners((previous) =>
      previous.map((designer) => {
        if (designer.id !== id) {
          return designer;
        }

        const currentIndex = stages.indexOf(designer.status);

        if (currentIndex === -1 || currentIndex >= stages.length - 1) {
          return designer;
        }

        return {
          ...designer,
          status: stages[currentIndex + 1],
        };
      })
    );
  };

  /* =======================================================
     RENDER
  ======================================================= */

  return (
    <main className="designer-crm-page">

      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="crm-header">

        {/* LEFT SIDE */}
        <div className="crm-header-left">

          {/* LOGO */}
          <Link to="/" className="crm-logo-link">
            <img
              src="/logo.png"
              alt="Zenve Fashion"
              className="crm-logo"
            />
          </Link>

          {/* TITLE AREA */}
          <div className="crm-title-area">

            <Link to="/" className="all-layers-link">
              <span className="back-arrow">←</span>
              <span>ALL 12 LAYERS</span>
            </Link>

            <h1 className="crm-page-title">
              <span className="crm-number">01</span>
              Designer CRM
            </h1>

            <p className="crm-page-description">
              Supply layer · Lead, qualification, approval, KYC,
              contract, status
            </p>

          </div>
        </div>

        {/* RIGHT SIDE */}
        <div className="crm-header-right">

          {/* SEARCH */}
          <div className="crm-search">

            <SearchIcon />

            <span>Search everything</span>

            <kbd>⌘K</kbd>

          </div>

          {/* USER */}
          <div className="crm-user">

            <UserIcon />

            <span className="crm-user-name">
              Priya Raghavan
            </span>

            <span className="crm-admin">
              Admin
            </span>

          </div>

        </div>

      </header>


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <section className="crm-content">

        {/* =================================================
            KPI CARDS
        ================================================= */}

        <section className="crm-kpi-grid">

          {/* PIPELINE */}
          <div className="crm-kpi-card">

            <div className="crm-kpi-label">
              PIPELINE
            </div>

            <div className="crm-kpi-value">
              {designers.length}
            </div>

            <div className="crm-kpi-subtitle">
              All designers
            </div>

          </div>


          {/* SELLING NOW */}
          <div className="crm-kpi-card">

            <div className="crm-kpi-label">
              SELLING NOW
            </div>

            <div className="crm-kpi-value">
              {
                designers.filter(
                  (designer) =>
                    designer.status === "LIVE" ||
                    designer.status === "ACTIVE"
                ).length
              }
            </div>

            <div className="crm-kpi-subtitle">
              Live or active
            </div>

          </div>


          {/* KYC PENDING */}
          <div className="crm-kpi-card">

            <div className="crm-kpi-label">
              KYC PENDING
            </div>

            <div className="crm-kpi-value">
              {
                designers.filter(
                  (designer) =>
                    designer.kyc === "KYC missing"
                ).length
              }
            </div>

            <div className="crm-kpi-subtitle">
              Blocks contract
            </div>

          </div>

        </section>


        {/* =================================================
            DESIGNER PIPELINE
        ================================================= */}

        <section className="pipeline-card">

          <div className="pipeline-heading">

            <h2>
              Designer pipeline
            </h2>

            <p>
              Stages follow the blueprint: lead → qualified →
              portfolio → review → approved → contract →
              signed → live → active.
            </p>

          </div>


          {/* DESIGNER LIST */}

          <div className="designer-list">

            {designers.map((designer) => (

              <article
                className="designer-row"
                key={designer.id}
              >

                {/* LEFT CONTENT */}
                <div className="designer-information">

                  <div className="designer-name-line">

                    <h3>
                      {designer.name}
                    </h3>

                    <span
                      className={`status-pill ${designer.status.toLowerCase()}`}
                    >
                      {designer.status}
                    </span>

                    <span className="tier-pill">
                      {designer.tier}
                    </span>

                    <span
                      className={`kyc-pill ${
                        designer.kyc === "KYC verified"
                          ? "verified"
                          : "missing"
                      }`}
                    >
                      {designer.kyc}
                    </span>

                  </div>


                  <p className="designer-details">

                    {designer.id}
                    {" · "}
                    {designer.owner}
                    {" · "}
                    {designer.email}
                    {" · "}
                    {designer.city}
                    {" · "}
                    {designer.category}
                    {" · take rate "}
                    {designer.takeRate}

                    {designer.contractEnd && (
                      <>
                        {" · contract ends "}
                        {designer.contractEnd}
                      </>
                    )}

                  </p>

                </div>


                {/* RIGHT ACTIONS */}
                <div className="designer-actions">

                  {/* STAGE SELECT */}
                  <div className="stage-select-wrapper">

                    <select
                      value={designer.status}
                      onChange={(event) =>
                        handleStageChange(
                          designer.id,
                          event.target.value
                        )
                      }
                      className="stage-select"
                    >
                      <option value="LEAD">
                        LEAD
                      </option>

                      <option value="QUALIFIED">
                        QUALIFIED
                      </option>

                      <option value="PORTFOLIO">
                        PORTFOLIO
                      </option>

                      <option value="REVIEW">
                        REVIEW
                      </option>

                      <option value="APPROVED">
                        APPROVED
                      </option>

                      <option value="CONTRACT">
                        CONTRACT
                      </option>

                      <option value="SIGNED">
                        SIGNED
                      </option>

                      <option value="LIVE">
                        LIVE
                      </option>

                      <option value="ACTIVE">
                        ACTIVE
                      </option>
                    </select>

                    <ChevronDown />

                  </div>


                  {/* KYC BUTTON */}
                  <button
                    type="button"
                    className="secondary-button"
                    onClick={() =>
                      handleKycAction(designer.id)
                    }
                  >
                    {designer.kyc === "KYC verified"
                      ? "Revoke KYC"
                      : "Verify KYC"}
                  </button>


                  {/* ADVANCE */}
                  <button
                    type="button"
                    className="advance-button"
                    onClick={() =>
                      handleAdvanceStage(designer.id)
                    }
                  >
                    Advance stage
                  </button>

                </div>

              </article>

            ))}

          </div>

        </section>


        {/* =================================================
            ADD DESIGNER LEAD
        ================================================= */}

        <section className="add-designer-card">

          <div className="add-designer-heading">

            <h2>
              Add a designer lead
            </h2>

            <p>
              Creates the designer record used by every other
              layer.
            </p>

          </div>


          <form
            className="designer-form"
            onSubmit={handleCreateLead}
          >

            {/* ROW 1 */}

            <div className="form-group">

              <label htmlFor="designerName">
                DESIGNER NAME
              </label>

              <input
                id="designerName"
                name="designerName"
                type="text"
                value={formData.designerName}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="brand">
                BRAND
              </label>

              <input
                id="brand"
                name="brand"
                type="text"
                value={formData.brand}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="contact">
                CONTACT EMAIL / PHONE
              </label>

              <input
                id="contact"
                name="contact"
                type="text"
                value={formData.contact}
                onChange={handleInputChange}
              />

            </div>


            {/* ROW 2 */}

            <div className="form-group">

              <label htmlFor="city">
                CITY
              </label>

              <input
                id="city"
                name="city"
                type="text"
                value={formData.city}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="category">
                PRIMARY CATEGORY
              </label>

              <input
                id="category"
                name="category"
                type="text"
                value={formData.category}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group select-form-group">

              <label htmlFor="tier">
                TIER
              </label>

              <select
                id="tier"
                name="tier"
                value={formData.tier}
                onChange={handleInputChange}
              >
                <option value="Emerging">
                  Emerging
                </option>

                <option value="Core">
                  Core
                </option>

                <option value="Premium">
                  Premium
                </option>
              </select>

              <ChevronDown />

            </div>


            {/* ROW 3 */}

            <div className="form-group">

              <label htmlFor="takeRate">
                TAKE RATE %
              </label>

              <input
                id="takeRate"
                name="takeRate"
                type="number"
                min="0"
                max="100"
                value={formData.takeRate}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="gst">
                GST NUMBER
              </label>

              <input
                id="gst"
                name="gst"
                type="text"
                value={formData.gst}
                onChange={handleInputChange}
              />

            </div>


            <div className="form-group">

              <label htmlFor="contractDate">
                CONTRACT END DATE
              </label>

              <input
                id="contractDate"
                name="contractDate"
                type="date"
                value={formData.contractDate}
                onChange={handleInputChange}
              />

            </div>


            {/* SUBMIT */}

            <div className="form-submit">

              <button
                type="submit"
                className="create-lead-button"
              >
                Create lead
              </button>

            </div>

          </form>

        </section>

      </section>

    </main>
  );
}

export default DesignerCRM;