import React, { Children } from "react";
import { useRoutes } from "react-router-dom";
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




const queryClient = new QueryClient();


const routeConfig = [
  { path: "/", element: <LayoutClient />,
    children:[
      { path: "", element: <Main /> },
      { path: "shop", element: <Shop /> },
      { path: "blog", element: <Blog /> },
      { path: "my_account", element: <My_account /> },
      { path: "contact", element: <Contact_us /> },
      { path: "product_details", element: <Product_details /> },
      { path: "cart", element: <Cart /> },
    ]
  },


];


function AppRoutes() {
  return useRoutes(routeConfig);
}


const theme = createTheme({

});


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
