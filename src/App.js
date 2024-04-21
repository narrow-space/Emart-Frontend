import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Layout from "./layouts/Layout.js";
import Banner from "./Components/Banner/Banner.js";
import Home from "./Pages/Home/Home.js";

import ThemeProvider from "./Contexapi/Themecontex.js";
import NavProvider from "./Contexapi/NavopenContex.js";
import Lottie from "lottie-react";
import animationData from "./Animation - 1702200728330.json";
import { Routes, Route, useLocation } from "react-router-dom";
import ListingProductMain from "./Components/ListingPageMain/ListingProductMain.js";
import ProductDetails from "./Components/ProductDetails/ProductDetails.js";
import Notfound from "./Components/Share/Notfound.js";
import Viewcart from "./Components/carts/Viewcart/Viewcart.js";
import Checkout from "./Components/carts/Checkout/Checkout.js";
import Dashboard from "./Components/user_Authentication/Dashboard.js"
import { FaBagShopping } from "react-icons/fa6";
import Myaccount from "./Components/user_Authentication/Myaccount.js";
import Orderhistory from "./Components/user_Authentication/Orderhistory.js";
import Accountdetails from "./Components/user_Authentication/Accountdetails.js";
import Editaddress from "./Components/user_Authentication/Editaddress.js";
import Login from "./Components/user_Authentication/Login.js";
import Forgotpassword from "./Components/user_Authentication/Forgotpassword.js";
import Resetpassword from "./Components/user_Authentication/Resetpassword.js";
import Register from "./Components/user_Authentication/Register.js";
import Shipping from "./Components/Shipping/Shipping.js";

import AdminLogin from "./Components/Admin_Authentication/AdminLogin.js";
import AdminAccount from "./Components/Admin_Authentication/AdminAccount.js";
import Admindashboard from "./Components/Admin_Authentication/Admindashboard.js";
import AddBannerImages from "./Components/Admin_Authentication/AddBannerImages.js";

import Addproducts from "./Components/Admin_Authentication/Addproducts.js";
import Addcategories from "./Components/Admin_Authentication/Addcategories.js";
import Addbrand from "./Components/Admin_Authentication/Addbrand.js";
import Orders from "./Components/Admin_Authentication/Orders.js";
import Settings from "./Components/Admin_Authentication/Settings.js";
import Adminproducts from "./Components/Admin_Authentication/Adminproducts.js";
import toast, { Toaster } from 'react-hot-toast';
import UpdateProduct from "./Components/Admin_Authentication/UpdateProduct.js";
import ScroolToTop from "./Components/Share/ScroolToTop.js";
import UserProtectedRoutes from "./Components/ProtectRoutes/UserProtectedRoutes.js";
import AdminProtectedRoutes from "./Components/ProtectRoutes/AdminProtectRoutes.js";
import { useSelector } from "react-redux";
import CartProvider, { CartopenContex } from "./Contexapi/Cartopencontex.js";

const App = () => {

  const { addToCartLoading,getCartProduct} = useSelector((state) => state.cart);
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const cartopenbyclck=()=>{
    setCartopen(!cartopen)
  }
  const location = useLocation();
  
  useEffect(() => {
    if (location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

    // Trigger jerk animation when routes change
    const cartElement = document.querySelector(".cart-container");
    cartElement.classList.add("animate-jerk");

    // Remove jerk animation class after a short delay
    setTimeout(() => {
      cartElement.classList.remove("animate-jerk");
    }, 1000); // Adjust the delay as needed
  }, [location]); 

  const [totalPrice, setTotalPrice] = useState(0);






  ///Disable mouse Right Click////
  // useEffect(() => {
  //   // Add event listener to disable right-click
  //   function disableRightClick(event) {
  //     event.preventDefault();
  //   }

  //   document.body.addEventListener('contextmenu', disableRightClick);

  //   // Clean up event listener on component unmount
  //   return () => {
  //     document.body.removeEventListener('contextmenu', disableRightClick);
  //   };
  // }, []);
 
 
  useEffect(() => {
    animateTotalPrice();
  }, [getCartProduct,location]);
  
  // Calculate total price whenever getCartProduct changes
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    getCartProduct.forEach((item) => {
      totalPrice += item.details.price * item.quantity;
    });
    return totalPrice;
  };

  // Animate total price increase
  const animateTotalPrice = () => {
    const interval = 50; // Adjust the interval for smoother animation
    const increment = Math.ceil(calculateTotalPrice() / 20); // Adjust the increment for desired speed

    let currentPrice = 0;
    const timer = setInterval(() => {
      currentPrice += increment;
      setTotalPrice(currentPrice);
      if (currentPrice >= calculateTotalPrice()) {
        clearInterval(timer);
        setTotalPrice(calculateTotalPrice());
      }
    }, interval);
  };
  return (
    <div className="webkit">
      <div 
      onClick={cartopenbyclck}
      className={`cart-container ${
       addToCartLoading ? "animate-jerk" : ""
      } cursor-pointer bg-[black] h-[80px] w-[70px] fixed top-[38%] right-0 z-10 flex flex-col items-center justify-center rounded-tl-xl rounded-b-xl `}>
        <div className="w-full h-[70%] flex flex-col items-center justify-center  ">
          <FaBagShopping size={33} color="white" />
          <small className="text-[white]">{getCartProduct.length} items</small>
        </div>
        <div className="bg-[#FF3D71] flex items-center justify-center rounded-bl-xl  w-full h-[30%]">
        <p className="text-sm text-white">${totalPrice}</p></div>
      </div>

      <ThemeProvider>
       
          <NavProvider>
            <Routes>

              {/* Admin Router */}

              <Route exact={true} path="/admin/login" element={<Layout><AdminLogin /></Layout>} />

              {/*Admin account Nested Route  */}
              <Route path="adminaccount" element={<AdminProtectedRoutes Components={AdminAccount} />}>
                <Route
                  exact={true}
                  path="dashboard"
                  element={<Admindashboard />}
                />
                <Route
                  exact={true}
                  path="bannerimages"
                  element={<AddBannerImages />}
                />
                <Route
                  exact={true}
                  path="addproducts"
                  element={<Addproducts />}
                />
                <Route
                  exact={true}
                  path="updateproduct/:id"
                  element={<UpdateProduct />}
                />
                <Route
                  exact={true}
                  path="addcategories"
                  element={<Addcategories />}
                />
                <Route
                  exact={true}
                  path="addbrand"
                  element={<Addbrand />}
                />
                <Route
                  exact={true}
                  path="orders"
                  element={<Orders />}
                />
                <Route
                  exact={true}
                  path="settings"
                  element={<Settings />}
                />
                <Route
                  exact={true}
                  path="products"
                  element={<Adminproducts />}
                />
              </Route>

              {/* User Router */}
              <Route exact={true} path="/" element={<Layout><Home /></Layout>} />

              <Route
                exact={true}
                path="/products-filter"
                element={<Layout><ListingProductMain /></Layout>}
              />

              <Route
                exact={true}
                path="/allproduct/:id"
                element={<Layout><ProductDetails /></Layout>}
              />
              <Route
                exact={true}
                path="/viewcart"
                element={<Layout><Viewcart /></Layout>}
              />
              <Route
                exact={true}
                path="/viewcart/checkout"
                element={<Layout><Checkout /></Layout>}
              />
              {/*user account Nested Route  */}
              <>
                <Route path="myaccount" element={<UserProtectedRoutes Components={Myaccount} />}>
                  <Route index path="dashboard" element={<Dashboard />}></Route>
                  <Route index path="orderhistory" element={<Orderhistory />}></Route>
                  <Route path="accountdetails" element={<Accountdetails />}></Route>
                  <Route path="editaddress" element={<Editaddress />}></Route>
                </Route>
              </>

              <Route path="/login" element={<Layout><Login /></Layout>} />
              <Route path="/register" element={<Layout><Register /></Layout>} />
              <Route path="/forgotpassword" element={<Layout><Forgotpassword /></Layout>} />
              <Route path="/resetpassword/:id/:token" element={<Layout><Resetpassword /></Layout>} />
              <Route path="/shipping" element={<Layout><Shipping /></Layout>} />

              <Route exact={true} path="*" element={<Layout><Notfound /></Layout>} />
            </Routes>
            <Toaster />
          </NavProvider>
       
      </ThemeProvider>
      <ScroolToTop />
    </div >
  );
};

export default App;
