import React from "react";
import { useRoutes } from "react-router-dom";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';

import Main from "./components/Main"; // Đảm bảo tệp Main.jsx tồn tại
import Header from "./components/Header"; // Đảm bảo tệp Header.jsx tồn tại
import Footer from "./components/Footer"; // Đảm bảo tệp Footer.jsx tồn tại
import Shop from "./pages/Shop"; // Kiểm tra tệp Shop.jsx
import Blog from "./pages/Blog"; // Kiểm tra tệp Blog.jsx
import My_account from "./pages/My_account"; // Kiểm tra tệp My_account.jsx
import Contact_us from "./pages/Contact_us"; // Kiểm tra tệp Contact_us.jsx
import Product_details from "./pages/Product_details"; // Kiểm tra tệp Product_details.jsx
import Cart from "./pages/cart/Cart"; // Đảm bảo tệp Cart.jsx tồn tại
import LayoutClient from "./layout/LayoutClient"; // Đảm bảo tệp LayoutClient.jsx tồn tại
import Blog_detail from "./pages/Blog_detail";
import Checkout from "./pages/Checkout";

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
      { path: "blog_detail", element: <Blog_detail /> },
      { path: "my_account", element: <My_account /> },
      { path: "contact_us", element: <Contact_us /> },
      { path: "product_details", element: <Product_details /> },
      { path: "cart", element: <Cart /> },
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
