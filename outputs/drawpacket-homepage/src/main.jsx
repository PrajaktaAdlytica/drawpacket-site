import React from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import Router from "./Router";
import { normalizePath } from "./pages/catalog";
import "./pages/pages.css";
import "./styles.css";
const el = document.getElementById("root");
const app = (
  <React.StrictMode>
    <Router path={location.pathname} />
  </React.StrictMode>
);
if (el.hasChildNodes() && el.dataset.route === normalizePath(location.pathname)) hydrateRoot(el, app);
else createRoot(el).render(app);
