import React, { useMemo, useState } from "react";
import "../styles/Catalogue.css"

const initialProducts = [
  {
    id: 1,
    name: "Ivory Silk Dog Kurta",
    sku: "ZNV-AAR-POC-DOGKURTA-IVORY-M",
    designer: "Aarav Pet Atelier",
    category: "Pet Occasion Wear · Ivory · M",
    mrp: 4200,
    price: 3499,
    fulfilment: "Mumbai FC · 14 available",
    status: "APPROVED",
    live: "LIVE",
    policy: "Returnable",
    fastDelivery: true,
  },
  {
    id: 2,
    name: "Rose Zari Dog Lehenga",
    sku: "ZNV-AAR-POC-DOGLEHENGA-ROSE-S",
    designer: "Aarav Pet Atelier",
    category: "Pet Occasion Wear · Rose · S",
    mrp: 7800,
    price: 6950,
    fulfilment: "Mumbai FC · 4 available",
    status: "APPROVED",
    live: "LIVE",
    policy: "Final sale",
    fastDelivery: false,
  },
  {
    id: 3,
    name: "Aqua Linen Cat Harness",
    sku: "ZNV-IRA-PEV-CATHARNESS-AQUA-L",
    designer: "Studio Ira Pets",
    category: "Pet Everyday · Aqua · L",
    mrp: 1800,
    price: 1299,
    fulfilment: "Bangalore FC · 26 available",
    status: "APPROVED",
    live: "LIVE",
    policy: "Returnable",
    fastDelivery: true,
  },
  {
    id: 4,
    name: "Sand Quilted Pet Bed",
    sku: "ZNV-IRA-PEV-PETBED-SAND-M",
    designer: "Studio Ira Pets",
    category: "Pet Everyday · Sand · M",
    mrp: 6500,
    price: 4999,
    fulfilment: "Bangalore FC · 0 available",
    status: "PENDING_QA",
    live: "NOT LIVE",
    policy: "Returnable",
    fastDelivery: true,
  },
  {
    id: 5,
    name: "Noir Twin Bandana Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-BANDANA-NOIR-F",
    designer: "Sen & Co Pets",
    category: "Pet + Owner Twinning · Noir · Free",
    mrp: 2400,
    price: 1899,
    fulfilment: "Designer Studio · 0 available",
    status: "PENDING_QA",
    live: "NOT LIVE",
    policy: "Returnable",
    fastDelivery: false,
  },
  {
    id: 6,
    name: "Olive Twin Scarf Set (Pet + Owner)",
    sku: "ZNV-KAB-TWN-MATCHSCARF-OLIVE-F",
    designer: "Sen & Co Pets",
    category: "Pet + Owner Twinning · Olive · Free",
    mrp: 3200,
    price: 2499,
    fulfilment: "Designer Studio · 0 available",
    status: "PENDING_QA",
    live: "NOT LIVE",
    policy: "Returnable",
    fastDelivery: false,
  },
];

function formatPrice(value) {
  return `₹${value.toLocaleString("en-IN")}`;
}

function StatusBadge({ children, type }) {
  return (
    <span className={`status-badge ${type || ""}`}>
      {children}
    </span>
  );
}

function ProductCard({ product, onUpdatePrice, onToggleDelivery }) {
  const [newPrice, setNewPrice] = useState("");

  const handleUpdate = () => {
    const numericPrice = Number(newPrice);

    if (!numericPrice || numericPrice <= 0) {
      return;
    }

    onUpdatePrice(product.id, numericPrice);
    setNewPrice("");
  };

  return (
    <article className="sku-card">
      {/* Product title */}
      <div className="sku-card-top">
        <div className="sku-title-row">
          <h3 className="sku-product-name">{product.name}</h3>

          <div className="sku-badges">
            <StatusBadge
              type={
                product.status === "APPROVED"
                  ? "approved"
                  : "pending"
              }
            >
              {product.status}
            </StatusBadge>

            <StatusBadge
              type={product.live === "LIVE" ? "live" : "not-live"}
            >
              {product.live}
            </StatusBadge>

            <StatusBadge
              type={
                product.policy === "Final sale"
                  ? "final-sale"
                  : "returnable"
              }
            >
              {product.policy}
            </StatusBadge>
          </div>
        </div>

        <div className="sku-code">{product.sku}</div>
      </div>

      {/* Product information */}
      <div className="sku-information-grid">
        <div className="sku-information-item">
          <span className="information-label">DESIGNER</span>
          <span className="information-value">
            {product.designer}
          </span>
        </div>

        <div className="sku-information-item">
          <span className="information-label">CATEGORY</span>
          <span className="information-value">
            {product.category}
          </span>
        </div>

        <div className="sku-information-item">
          <span className="information-label">MRP / PRICE</span>
          <span className="information-value">
            {formatPrice(product.mrp)}
            <span className="price-arrow"> → </span>
            {formatPrice(product.price)}
          </span>
        </div>

        <div className="sku-information-item">
          <span className="information-label">FULFILMENT</span>
          <span className="information-value">
            {product.fulfilment}
          </span>
        </div>
      </div>

      {/* Actions */}
      <div className="sku-actions">
        <div className="price-controls">
          <input
            type="number"
            value={newPrice}
            onChange={(e) => setNewPrice(e.target.value)}
            placeholder="New price"
            className="new-price-input"
          />

          <button
            type="button"
            className="update-price-button"
            onClick={handleUpdate}
          >
            Update price
          </button>
        </div>

        <button
          type="button"
          className={`delivery-toggle ${
            product.fastDelivery ? "active" : ""
          }`}
          onClick={() => onToggleDelivery(product.id)}
          aria-label="Toggle fast delivery"
        >
          <span className="toggle-knob"></span>
        </button>

        <span className="delivery-label">
          Fast delivery flag
        </span>
      </div>
    </article>
  );
}

export default function ProductSKU() {
  const [products, setProducts] = useState(initialProducts);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name.toLowerCase().includes(query) ||
        product.sku.toLowerCase().includes(query) ||
        product.designer.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    });
  }, [products, searchTerm]);

  const liveCount = products.filter(
    (product) => product.live === "LIVE"
  ).length;

  const qaCount = products.filter(
    (product) => product.status === "PENDING_QA"
  ).length;

  const finalSaleCount = products.filter(
    (product) => product.policy === "Final sale"
  ).length;

  const updatePrice = (id, newPrice) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              price: newPrice,
            }
          : product
      )
    );
  };

  const toggleDelivery = (id) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              fastDelivery: !product.fastDelivery,
            }
          : product
      )
    );
  };

  return (
    <div className="product-page">
      {/* =========================================
          HEADER
      ========================================= */}
      <header className="product-header">
        <div className="header-inner">
          {/* Logo */}
          <div className="brand-area">
            <img
              src="/zenve-logo.png"
              alt="Zenve Fashion"
              className="zenve-logo"
            />
          </div>

          {/* Header content */}
          <div className="header-main">
            <div className="header-top-row">
              <button
                type="button"
                className="back-link"
                onClick={() => window.history.back()}
              >
                <span className="back-arrow">←</span>
                <span>ALL 12 LAYERS</span>
              </button>

              <div className="header-actions">
                <button
                  type="button"
                  className="global-search-button"
                >
                  <span className="search-icon">⌕</span>
                  <span>Search everything</span>
                  <span className="keyboard-shortcut">
                    ⌘K
                  </span>
                </button>

                <div className="profile-box">
                  <span className="profile-icon">♙</span>

                  <span className="profile-name">
                    Priya Raghavan
                  </span>

                  <span className="admin-badge">
                    Admin
                  </span>
                </div>
              </div>
            </div>

            <div className="page-heading">
              <h1>
                <span className="layer-number">03</span>{" "}
                Product / SKU
              </h1>

              <p>
                Catalogue layer · Variants, attributes, media,
                pricing, policy
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* =========================================
          MAIN CONTENT
      ========================================= */}
      <main className="product-content">
        {/* Statistics */}
        <section className="statistics-grid">
          <div className="stat-card">
            <span className="stat-label">SKUS</span>
            <span className="stat-value">
              {products.length}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">LIVE</span>
            <span className="stat-value">
              {liveCount}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">IN QA</span>
            <span className="stat-value">
              {qaCount}
            </span>
          </div>

          <div className="stat-card">
            <span className="stat-label">FINAL SALE</span>
            <span className="stat-value">
              {finalSaleCount}
            </span>
          </div>
        </section>

        {/* SKU Master */}
        <section className="sku-master">
          <div className="sku-master-header">
            <div className="sku-master-heading">
              <h2>SKU master</h2>

              <p>
                Pattern: ZNV-DESIGNER-CATEGORY-PRODUCT-COLOUR-SIZE.
                Price edits are written to the audit log.
              </p>
            </div>

            <div className="sku-search-wrapper">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) =>
                  setSearchTerm(e.target.value)
                }
                placeholder="Search SKU, name, colour..."
                className="sku-search-input"
              />
            </div>
          </div>

          {/* SKU cards */}
          <div className="sku-list">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onUpdatePrice={updatePrice}
                  onToggleDelivery={toggleDelivery}
                />
              ))
            ) : (
              <div className="no-results">
                <h3>No SKU found</h3>
                <p>
                  Try searching by SKU, product name, designer
                  or colour.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}