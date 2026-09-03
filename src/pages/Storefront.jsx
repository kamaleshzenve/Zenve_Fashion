import React, { useMemo, useState } from "react";
import "../styles/StoreFront.css";

/* =========================================================
   ICONS
========================================================= */

const SearchIcon = () => (
  <svg
    className="sf-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="11" cy="11" r="6.5" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M16 16L21 21"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const UserIcon = () => (
  <svg
    className="sf-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle
      cx="12"
      cy="8"
      r="3.5"
      stroke="currentColor"
      strokeWidth="1.7"
    />
    <path
      d="M5 20C5.7 16.4 8.1 14.5 12 14.5C15.9 14.5 18.3 16.4 19 20"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
  </svg>
);

const ArrowLeftIcon = () => (
  <svg
    className="sf-back-icon"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M19 12H5"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
    />
    <path
      d="M10 7L5 12L10 17"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ChevronDownIcon = () => (
  <svg
    className="sf-chevron"
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

/* =========================================================
   PRODUCT DATA
========================================================= */

const PRODUCTS = [
  {
    id: 1,
    name: "Ivory Silk Dog Kurta",
    brand: "Aarav Pet Atelier",
    color: "Ivory",
    size: "M",
    price: 3499,
    mrp: 4200,
    delivery: "60 minutes",
    stock: 14,
    location: "Mumbai FC",
    returnPolicy: "7-day return eligible",
    fast: true,
  },
  {
    id: 2,
    name: "Rose Zari Dog Lehenga",
    brand: "Aarav Pet Atelier",
    color: "Rose",
    size: "S",
    price: 6950,
    mrp: 7800,
    delivery: "≤ 3 working days",
    stock: 4,
    location: "Mumbai FC",
    returnPolicy: "Final sale — no returns",
    fast: false,
  },
  {
    id: 3,
    name: "Aqua Linen Cat Harness",
    brand: "Studio Ira Pets",
    color: "Aqua",
    size: "L",
    price: 1299,
    mrp: 1800,
    delivery: "≤ 3 working days",
    stock: 26,
    location: "Bangalore FC",
    returnPolicy: "7-day return eligible",
    fast: false,
  },
];

/* =========================================================
   MAIN COMPONENT
========================================================= */

const Storefront = () => {
  const [globalSearch, setGlobalSearch] = useState("");
  const [catalogueSearch, setCatalogueSearch] = useState("");
  const [pincode, setPincode] = useState("400001");
  const [bag, setBag] = useState([]);

  /* -------------------------------------------------------
     SEARCH PRODUCTS
  ------------------------------------------------------- */

  const filteredProducts = useMemo(() => {
    const query = catalogueSearch.trim().toLowerCase();

    if (!query) {
      return PRODUCTS;
    }

    return PRODUCTS.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.brand.toLowerCase().includes(query) ||
        product.color.toLowerCase().includes(query) ||
        product.location.toLowerCase().includes(query)
      );
    });
  }, [catalogueSearch]);

  /* -------------------------------------------------------
     BAG
  ------------------------------------------------------- */

  const addToBag = (product) => {
    setBag((currentBag) => {
      const existing = currentBag.find(
        (item) => item.id === product.id
      );

      if (existing) {
        return currentBag.map((item) =>
          item.id === product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      }

      return [
        ...currentBag,
        {
          ...product,
          quantity: 1,
        },
      ];
    });
  };

  const removeFromBag = (productId) => {
    setBag((currentBag) => {
      return currentBag.filter((item) => item.id !== productId);
    });
  };

  const bagCount = bag.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const bagTotal = bag.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  /* -------------------------------------------------------
     PINCODE
  ------------------------------------------------------- */

  const isFastPincode =
    pincode.startsWith("400") ||
    pincode.startsWith("560");

  /* =======================================================
     JSX
  ======================================================= */

  return (
    <div className="storefront-page">
      {/* ===================================================
          HEADER
      =================================================== */}

      <header className="storefront-header">
        <div className="storefront-header-inner">

          {/* LOGO */}
          <div className="storefront-logo-area">
            {/*<div className="zenve-logo">*/}
            {/*  <div className="zenve-logo-mark">*/}
            {/*    Z*/}
            {/*  </div>*/}

            {/*  <div className="zenve-logo-text">*/}
            {/*    ZENVE*/}
            {/*  </div>*/}

            {/*  <div className="zenve-logo-subtitle">*/}
            {/*    FASHION*/}
            {/*  </div>*/}
            {/*</div>*/}
          </div>

          {/* HEADER CONTENT */}
          <div className="storefront-header-content">

            {/* TOP NAV */}
            <div className="storefront-top-line">
              <button
                type="button"
                className="layers-back"
                onClick={() => window.history.back()}
              >
                <ArrowLeftIcon />
                <span>ALL 12 LAYERS</span>
              </button>
            </div>

            {/* TITLE */}
            <div className="storefront-title-block">
              <h1>
                <span className="section-number">06</span>
                <span>Storefront</span>
              </h1>

              <p>
                Commerce layer · Search, filters, product page, cart, checkout
              </p>
            </div>

            {/* DESKTOP HEADER CONTROLS */}
            <div className="storefront-header-controls">

              {/* GLOBAL SEARCH */}
              <div className="global-search">
                <SearchIcon />

                <input
                  type="text"
                  placeholder="Search everything"
                  value={globalSearch}
                  onChange={(e) =>
                    setGlobalSearch(e.target.value)
                  }
                />

                <span className="keyboard-shortcut">
                  ⌘K
                </span>
              </div>

              {/* USER */}
              <div className="user-control">
                <UserIcon />

                <span className="user-name">
                  Priya Raghavan
                </span>

                <span className="admin-badge">
                  Admin
                </span>
              </div>
            </div>

            {/* DELIVERY PINCODE */}
            <div className="delivery-control">
              <label htmlFor="delivery-pincode">
                DELIVERY PINCODE
              </label>

              <input
                id="delivery-pincode"
                type="text"
                inputMode="numeric"
                maxLength={6}
                value={pincode}
                onChange={(e) =>
                  setPincode(
                    e.target.value.replace(/\D/g, "")
                  )
                }
              />
            </div>
          </div>
        </div>
      </header>

      {/* ===================================================
          MAIN
      =================================================== */}

      <main className="storefront-main">

        {/* =================================================
            SUMMARY CARDS
        ================================================= */}

        <section className="summary-grid">

          {/* LIVE SKUS */}
          <article className="summary-card">
            <div className="summary-label">
              LIVE SKUS
            </div>

            <div className="summary-value">
              3
            </div>

            <div className="summary-description">
              Only QA-approved, in-stock listings sell
            </div>
          </article>

          {/* BAG */}
          <article className="summary-card">
            <div className="summary-label">
              IN BAG
            </div>

            <div className="summary-value">
              {bagCount}
            </div>

            <div className="summary-description">
              ₹{bagTotal.toLocaleString("en-IN")}
            </div>
          </article>

          {/* PINCODE */}
          <article className="summary-card">
            <div className="summary-label">
              FAST PINCODE
            </div>

            <div className="summary-value summary-fast">
              {isFastPincode ? "Yes" : "No"}
            </div>

            <div className="summary-description">
              Mumbai 400xxx · Bangalore 560xxx
            </div>
          </article>

        </section>

        {/* =================================================
            SHOP
        ================================================= */}

        <section className="shop-section">

          {/* SHOP HEADER */}
          <div className="shop-header">

            <div className="shop-heading">
              <h2>Shop</h2>

              <p>
                Delivery promise is computed live from pincode,
                stocking location, fast flag and availability.
              </p>
            </div>

            {/* CATALOGUE SEARCH */}
            <div className="catalogue-search">
              <SearchIcon />

              <input
                type="text"
                placeholder="Search the catalogue..."
                value={catalogueSearch}
                onChange={(e) =>
                  setCatalogueSearch(e.target.value)
                }
              />
            </div>
          </div>

          {/* =================================================
              PRODUCT GRID
          ================================================= */}

          {filteredProducts.length > 0 ? (
            <div className="product-grid">

              {filteredProducts.map((product) => (
                <article
                  className="product-card"
                  key={product.id}
                >

                  {/* PRODUCT TOP */}
                  <div className="product-top">

                    <div className="product-title-row">
                      <h3>{product.name}</h3>

                      {product.fast && (
                        <span className="fast-badge">
                          60 min
                        </span>
                      )}
                    </div>

                    <p className="product-meta">
                      {product.brand} · {product.color} /{" "}
                      {product.size}
                    </p>
                  </div>

                  {/* PRICE */}
                  <div className="product-price-row">
                    <span className="product-price">
                      ₹{product.price.toLocaleString("en-IN")}
                    </span>

                    <span className="product-mrp">
                      ₹{product.mrp.toLocaleString("en-IN")}
                    </span>
                  </div>

                  {/* DELIVERY */}
                  <div className="product-details">

                    <div>
                      Delivery:{" "}
                      <strong>
                        {product.delivery}
                      </strong>
                    </div>

                    <div>
                      {product.stock} in stock ·{" "}
                      {product.location}
                    </div>

                    <div>
                      {product.returnPolicy}
                    </div>

                  </div>

                  {/* ADD TO BAG */}
                  <button
                    type="button"
                    className="add-to-bag-button"
                    onClick={() => addToBag(product)}
                  >
                    Add to bag
                  </button>

                </article>
              ))}

            </div>
          ) : (
            <div className="no-products">
              No products found.
            </div>
          )}

        </section>

        {/* =================================================
            BAG & CHECKOUT
        ================================================= */}

        <section className="bag-section">

          <div className="bag-header">
            <h2>Bag & checkout</h2>

            <p>
              Checkout reserves inventory instantly and creates
              a live order in the OMS.
            </p>
          </div>

          {bag.length === 0 ? (
            <div className="empty-bag">
              Your bag is empty.
            </div>
          ) : (
            <div className="bag-content">

              {/* BAG ITEMS */}
              <div className="bag-items">

                {bag.map((item) => (
                  <div
                    className="bag-item"
                    key={item.id}
                  >

                    <div className="bag-item-info">
                      <h3>{item.name}</h3>

                      <p>
                        {item.brand} · {item.color} /{" "}
                        {item.size}
                      </p>

                      <span>
                        Qty: {item.quantity}
                      </span>
                    </div>

                    <div className="bag-item-price">
                      ₹
                      {(
                        item.price * item.quantity
                      ).toLocaleString("en-IN")}
                    </div>

                    <button
                      type="button"
                      className="remove-bag-button"
                      onClick={() =>
                        removeFromBag(item.id)
                      }
                    >
                      Remove
                    </button>

                  </div>
                ))}

              </div>

              {/* BAG SUMMARY */}
              <div className="bag-summary">

                <div>
                  <span>Items</span>
                  <strong>{bagCount}</strong>
                </div>

                <div>
                  <span>Total</span>
                  <strong>
                    ₹{bagTotal.toLocaleString("en-IN")}
                  </strong>
                </div>

                <button
                  type="button"
                  className="checkout-button"
                  onClick={() =>
                    alert(
                      "Checkout demonstration — order would now be created."
                    )
                  }
                >
                  Proceed to checkout
                </button>

              </div>

            </div>
          )}

        </section>

      </main>
    </div>
  );
};

export default Storefront;