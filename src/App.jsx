import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";
import LayerPage from "./pages/LayerPage.jsx";
import DesignerCRM from "./pages/DesignerCrm.jsx";
import DesignerPortal from "./pages/DesignerPortal.jsx";
import Catalogue from "./pages/Catalogue.jsx";
import Orders from "./pages/Orders.jsx";

import { layers } from "./data/layers.js";
import CatalogueQA from "./pages/CatalogueQa.jsx";
import Inventory from "./pages/Inventory.jsx";
import Storefront from "./pages/Storefront.jsx";
import DeliveryEngine from "./pages/Delivery.jsx";
import Returns from "./pages/Returns.jsx";
import Settlement from "./pages/Settlement.jsx";
import Analytics from "./pages/Analytics.jsx";
import CommandCentre from "./pages/CommandCentre.jsx";


export default function App() {
  return (
    <Routes>
      {/* Home Page */}
      <Route path="/" element={<Home />} />

      {/* Storefront Page */}

        <Route path="/designer-crm" element={<DesignerCRM/>}/>
        <Route path="/designer-portal" element={<DesignerPortal/>}/>
        <Route path="/catalogue" element={<Catalogue/>}/>
        <Route path="/catalogueqa" element={<CatalogueQA/>}/>
        <Route path="/inventory" element={<Inventory/>}/>
        <Route path="/storefront" element={<Storefront />} />
        <Route path="/orders" element={<Orders/>}/>
        <Route path="/delivery" element={<DeliveryEngine/>}/>
        <Route path="/returns" element={<Returns/>}/>
        <Route path="/settlement" element={<Settlement/>}/>
        <Route path="/analytics" element={<Analytics/>}/>
        <Route path="/command-centre" element={<CommandCentre/>}/>







    </Routes>
  );
}