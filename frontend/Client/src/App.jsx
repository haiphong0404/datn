import React, { useEffect, useState } from "react";
import { useRoutes, useLocation } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop";
import Blog from "./pages/Blog";
import My_account from "./pages/My_account";
import Contact_us from "./pages/Contact_us";
import Product_details from "./pages/Product_details";
import Cart from "./pages/cart/Cart";
import LayoutClient from "./layout/LayoutClient";
import Blog_detail from "./pages/Blog_detail";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/About_us";
import NotFoundPage from "./pages/404";
import Login from "./pages/login";
import Register from "./pages/register";
import Order from "./pages/order";
import Order_detail from "./pages/Order_detail";
import Order_detail_cancel from "./pages/Order_detail_cancel";
import Dashboard_account from "./pages/Dashboard_account";

const queryClient = new QueryClient();

const routeConfig = [
  {
    path: "/",
    element: <LayoutClient />,
    children: [
      { path: "", element: <Main /> },
      { path: "shop", element: <Shop /> },
      { path: "blog", element: <Blog /> },
      { path: "checkout", element: <Checkout /> },
      { path: "blog/blog_detail", element: <Blog_detail /> },
      { path: "my_account", element: <My_account /> },
      { path: "contact_us", element: <Contact_us /> },
      { path: "product_details", element: <Product_details /> },
      { path: "cart", element: <Cart /> },
      { path: "about_us", element: <AboutUs /> },
      { path: "404", element: <NotFoundPage /> }
    ],
    element: < My_account />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "dashboard_account", element: <Dashboard_account /> },
      { path: "order", element: <Order /> },
      { path: "order_detail", element: <Order_detail /> },
      { path: "order_detail_cancel", element: <Order_detail_cancel /> },
    ]
  },
];

function AppRoutes() {
  return useRoutes(routeConfig);
}

const theme = createTheme({});

function App() {

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Header />
        <main>
          <AppRoutes />
          <ToastContainer />
        </main>
        <Footer />
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
