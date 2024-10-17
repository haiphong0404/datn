import React from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Main from "./components/Main";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Shop from "./pages/Shop/Shop";
import Blog from "./pages/Blog";
import MyAccount from "./pages/My_account/Myacc";
import Contact_us from "./pages/Contact_us";
import Product_details from "./pages/Product_details";
import Cart from "./pages/cart/Cart";
import LayoutClient from "./layout/LayoutClient";
import Blog_detail from "./pages/Blog_detail";
import Checkout from "./pages/Checkout";
import AboutUs from "./pages/About_us";
import Login from "./pages/Auth/Login";
import Register from './pages/Auth/Register';
import NotFoundPage from "./pages/404";
import Order_detail_cancel from "./pages/Order_detail_cancel";
import FAQs from "./pages/FAQs";
import Bill from "./pages/Bill";  




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
      { path: "my_account", element: <MyAccount /> },
      { path: "contact_us", element: <Contact_us /> },
      { path: "product_details", element: <Product_details /> },
      { path: "cart", element: <Cart /> },
      { path: "about_us", element: <AboutUs /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
      { path: "*", element: <NotFoundPage /> },
      { path: "faqs", element: <FAQs /> },
      { path: "Order_detail_cancel", element: <Order_detail_cancel /> },
      { path: "checkout/bill", element: <Bill /> },

    ],
    


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