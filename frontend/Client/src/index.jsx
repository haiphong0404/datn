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
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';





configAxios();
const stripePromise = loadStripe('pk_test_51QSbecJMpBf2NQMLmRWimHDjNlzeFQCDaOZgdrIvgbeKZ2oCGQFReuzuMDb9d7LrAV59kah5Kcb6lkZKop0l4Z6A00xEjpeTkF');
const container = document.getElementById("root");
if (container) {
    const root = createRoot(container);
    root.render(
        <BrowserRouter>
            <Provider store={store}>
            <Elements stripe={stripePromise}>
                <App />
                </Elements>
            </Provider>
        </BrowserRouter>
    );
}

reportWebVitals();
