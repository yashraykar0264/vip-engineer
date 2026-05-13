import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter } from "react-router-dom";
import App from "./App";

import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
// DISABLE RIGHT CLICK

document.addEventListener("contextmenu", (e) => {
  e.preventDefault();
});

// DISABLE INSPECT SHORTCUTS

document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
    (e.ctrlKey && e.keyCode === 85) // Ctrl+U
  ) {
    return false;
  }
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <HashRouter>
    <App />

    <ToastContainer position="top-right" autoClose={2500} theme="dark" />
  </HashRouter>,
);
