import React from "react";
import {ToastContainer} from "react-toastify";
import App from "./App";
import ReactDOM from "react-dom/client";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Router>
            <App />
        </Router>
        <ToastContainer />
    </React.StrictMode>
);