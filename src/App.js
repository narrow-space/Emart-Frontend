import React, { useContext, useEffect, useState } from "react";
import "./App.css";
import Layout from "./layouts/Layout.js";
import Banner from "./Components/Banner/Banner.js";
import Home from "./Pages/Home/Home.js";

import ThemeProvider from "./Contexapi/Themecontex.js";
import NavProvider from "./Contexapi/NavopenContex.js";
import Lottie from "lottie-react";
import animationData from "./Animation - 1702200728330.json";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import AdminRegister from "./Components/Admin_Authentication/AdminRegister.js";
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
import { useDispatch, useSelector } from "react-redux";
import CartProvider, { CartopenContex } from "./Contexapi/Cartopencontex.js";
import { jwtDecode } from 'jwt-decode';
import { clearuserLoggedInData } from "./redux/Slice/Userauthslice/userAuthSlice.js";
import { clearadminLoggedINData } from "./redux/Slice/adminAuthslice/adminAuthslice.js";
import ShoppingBag from "./Components/Share/ShoppingBag.js";
import FlotingComponentsMobile from "./Components/Share/FlotingComponentsMobile.js";
import WishList from "./Components/Wishlist/WishList.js";
const App = () => {
  const location = useLocation();

  const dispatch = useDispatch();
  const navigate = useNavigate()





  const { userLoggedInData } = useSelector((state) => state.user);
  useEffect(() => {
    if (location.pathname) {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
    }

  }, [location]);








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


  ////user automatic logout when token expired//
  useEffect(() => {
    const token = localStorage.getItem('usertoken');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          dispatch(clearuserLoggedInData());
          localStorage.removeItem('usertoken');
          navigate('/login');

        }

        else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            dispatch(clearuserLoggedInData());
            localStorage.removeItem('usertoken');
            navigate('/login');

          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      }
    }
  }, [navigate, userLoggedInData]);



  ////admin autometic logout when token expired//
  useEffect(() => {
    const token = localStorage.getItem('admintoken');

    if (token) {
      const decodedToken = jwtDecode(token);

      if (decodedToken && decodedToken.exp) {
        const currentTime = Math.floor(Date.now() / 1000);
        const expirationTime = decodedToken.exp;

        if (expirationTime < currentTime) {
          // Token expired, redirect to login page
          dispatch(clearadminLoggedINData());
          localStorage.removeItem('admintoken');
          navigate('/');

        }

        else {
          // Calculate time until token expiration
          const timeUntilExpiration = (expirationTime - currentTime) * 1000;

          // Set a timer to redirect the user when the token expires
          const expirationTimer = setTimeout(() => {
            dispatch(clearadminLoggedINData());
            localStorage.removeItem('admintoken');
            navigate('/');

          }, timeUntilExpiration);

          // Clean up the timer when the component unmounts or when the token changes
          return () => clearTimeout(expirationTimer);
        }
      }
    }
  }, [navigate, userLoggedInData]);





  const token = localStorage.getItem('admintoken');








  return (
    <div className="webkit">

      <ThemeProvider>

        <NavProvider>

          {
            token ? null : <>
              <ShoppingBag />
              <FlotingComponentsMobile />
            </>
          }


          <Routes>

            {/* Admin Router */}

            <Route exact={true} path="/admin/login" element={<Layout><AdminLogin /></Layout>} />
            <Route exact={true} path="/admin/register" element={<Layout><AdminRegister /></Layout>} />

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
            <Route
              exact={true}
              path="/wishlist"
              element={<Layout><WishList /></Layout>}
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
