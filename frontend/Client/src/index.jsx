// src/index.js
import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import "./global.css";
import { configAxios } from "./api/axios.js";


import { Provider } from 'react-redux';
import store from "./features/store.js";






configAxios();

const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
                <App />
            </Provider>,
        </BrowserRouter>
    );
}

reportWebVitals();
