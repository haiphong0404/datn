import React, { useState, useEffect } from "react";
import { Link, Route, Router, Routes, useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Blog";
import MyAccount from "./pages/My_account/Myacc";
import Contact_us from "./pages/Contact_us";
import Cart from "./pages/cart/Cart";
import LayoutClient from "./layout/LayoutClient";
import Blog_detail from "./pages/Blog_detail";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/About_us";
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register';
import NotFoundPage from "./pages/404";
import Order_detail from "./pages/My_account/Order_detail";
import FAQs from "./pages/FAQs";
import Bill from "./pages/Bill";
import Dashboard from "./pages/My_account/dashboard";
import Orders from "./pages/My_account/orders";
import Account_info from "./pages/My_account/account_info";
import Product_details from "./pages/Product_Detail/Product_details";
import CheckoutDetail from "./pages/CheckoutDetail";

import ChangePassword from "./pages/My_account/changePass";
import EditProfile from "./pages/My_account/editProfile";

import PaymentSuccess from "./pages/Stripe/SuccessPage";
import PaymentCancel from "./pages/Stripe/PaymentCancel";
import LoadingSpinner from "./loading/LoadingSpinner";
import Brands from "./pages/Brands";
import BrandDetail from "./pages/BrandDetail";
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';




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
      { path: "/blog_details/:id", element: <Blog_detail /> },
      { path: "contact_us", element: <Contact_us /> },
      { path: "product_details/:productId", element: <Product_details /> },
      { path: "cart", element: <Cart /> },
      { path: "about_us", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "faqs", element: <FAQs /> },
      { path: "checkout/bill", element: <Bill /> },
      { path: "brands", element: <Brands /> },
      { path: "brand_detail/:id", element: <BrandDetail /> },


      { path: "/checkout-detail/:orderId", element: <CheckoutDetail /> },
      { path: "/payment-success", element: <PaymentSuccess /> },
      { path: "/payment-cancel", element: <PaymentCancel /> },
      { path: "brands", element: <Brands /> },
      { path: "brand_detail/:id", element: <BrandDetail /> },


    ],
  },
  {
    path: "/my_account",
    element:
      <MyAccount />
    ,
    children: [
      { path: "", element: <Dashboard /> },
      {
        path: "orders", element: <Orders />,
      },
      { path: "Order_detail/:orderId", element: <Order_detail /> },
      { path: "account_info", element: <Account_info /> },
      { path: "changePassword", element: <ChangePassword /> },
      { path: "editProfile", element: <EditProfile /> },
    ],
  },


];

function AppRoutes() {
  return useRoutes(routeConfig);
}

const theme = createTheme({});

function App() {


  return (
    <AuthProvider> {/* Bao bọc toàn bộ ứng dụng */}
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <CartProvider>
            <Header />
            <main>
              <AppRoutes />
              <ToastContainer />
            </main>
            <Footer />
          </CartProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;