import React, { useContext, useEffect, useRef, useState } from "react";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  HeartIcon,
  ShoppingCartIcon,
  UserIcon,
  XMarkIcon,
  MagnifyingGlassIcon,
  ShoppingBagIcon,
  Bars3Icon,
} from "@heroicons/react/24/outline";
import { BsInstagram, BsYoutube } from "react-icons/bs";
import { FaFacebook } from "react-icons/fa6";
import { IoSearchCircleOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../assest/Online_Nest_Logo_Text_Only (2).webp";
import CartDetails from "../../Components/Cart/CartDetails";
import { useDispatch, useSelector } from "react-redux";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";
import { searchProducts } from "../../redux/Slice/ProductSlice/ProductSlice";
import { NavOpenContex } from "../../Contexapi/NavopenContex";
import Loading from "../../Components/Share/Loading";
import "./Header.scss";
import ShoppingBag from "../../Components/Share/ShoppingBag";
import { getWishList } from "../../redux/Slice/wishListSlice/wishListSlice";

const Navbar2 = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [expandedMenu, setExpandedMenu] = useState(null);
  const [showSearchBar, setShowSearchBar] = useState(true);
  const [search, setSearch] = useState("");
  const [searchData, setSearchData] = useState(null);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [categories, setCategories] = useState([]);

  const { getCartProduct, addtoCart } = useSelector((state) => state.cart);
  const {
    searchProductsData: { searchproduct, results },
    searchLoading,
  } = useSelector((state) => state.products);
  const { userLoggedInData, userLoginData } = useSelector(
    (state) => state.user
  );
  const { CategoryData } = useSelector((state) => state.category);
  const { getWishListProduct, addtoWishList } = useSelector(
    (state) => state.wishlist
  );
  const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);
  const { navOpen, setNavOpen } = useContext(NavOpenContex);
  const navRef = useRef();
  const searchRef = useRef();
  const dispatch = useDispatch();
  const token = localStorage.getItem("usertoken");
  const navigate = useNavigate();

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowSearchBar(false);
      } else {
        setShowSearchBar(true);
      }
      lastScrollY = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setCartopen(false);
      }
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSearchResults(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cartRef, searchRef]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setNavOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [navRef]);

  useEffect(() => {
    dispatch(userLoggedIn());
  }, [userLoginData]);

  useEffect(() => {
    dispatch(getCart());
    dispatch(getWishList());
  }, [addtoCart, addtoWishList, userLoginData]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearch(term);
    dispatch(searchProducts({ productName: term }));
    setShowSearchResults(true);
  };

  useEffect(() => {
    setSearchData(searchproduct);
  }, [searchproduct]);

  ///Fetch the category data//
  useEffect(() => {
    let array = [];
    if (CategoryData && CategoryData.length) {
      CategoryData.map((cat) => {
        array.push(cat);
      });
    }

    setCategories(array);
  }, [CategoryData]);

  const toggleSubMenu = (menu) => {
    setExpandedMenu(expandedMenu === menu ? null : menu);
  };

  const closeMobileNavbar = () => {
    setNavOpen(false);
  };

  const handleLogin = () => {
    navigate("/login");
    closeMobileNavbar();
  };
  const handleRegister = () => {
    navigate("/register");
    closeMobileNavbar();
  };

  const handleUserAccount = () => {
    navigate("/myaccount/dashboard");
    closeMobileNavbar();
  };

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight / 2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full top-0 z-50 transition-all duration-700 ${
        isScrolled
          ? "bg-white shadow-md py-1 mb-40 translate-y-16"
          : "bg-white py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <button
            onClick={() => setNavOpen(true)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none md:hidden"
          >
            <Bars3Icon className="h-6 w-6 mr-auto "/>
          </button>
          <Link to="/">
            <img
              src={logo}
              alt="Online Nest Logo"
              className={`transition-all duration-300 ${
                isScrolled ? "h-8" : "h-12"
              }`}
            />
          </Link>
        </div>
        <div className="hidden md:flex items-center flex-grow mx-10">
          <input
            type="text"
            className="w-4/5 py-2 px-4  rounded-full custom-search-input"
            placeholder="Search products... (Ex: Mackbook pro 2024)"
            onChange={handleSearch}
            value={search}
            onFocus={() => setShowSearchResults(true)}
          />
          <IoSearchCircleOutline className="h-6 w-6 text-gray-500 ml-2" />
        </div>
        <div className="hidden md:flex flex-row items-center justify-center space-x-4">
          {token ? (
            <Link
              to="/myaccount/dashboard"
              className="text-gray-700 hover:text-gray-900 flex items-center"
            >
              <UserIcon className="h-10 w-10 mr-1" />
              <div className="flex flex-col">
                <span
                  className={`transition-opacity duration-300 text-sm font-thin`}
                >
                  wellcome
                </span>
                <span className={`transition-opacity duration-300 uppercase`}>
                  {userLoggedInData[0]?.firstname}
                </span>
              </div>
            </Link>
          ) : (
            <Link to="/login" className="flex flex-row">
              <UserIcon className="h-7 w-7 mr-1" />
              <span className={`transition-opacity duration-300`}>
                Sign In / Register
              </span>
            </Link>
          )}

          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-gray-900"
          >
            <HeartIcon className="h-8 w-8" />
            <span className="absolute top-[-5px] right-[-5px] inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full text-center">
              {" "}
              {userLoggedInData?.length > 0 ? getWishListProduct?.length : "0"}
            </span>
          </Link>

          <button
            onClick={() => setCartopen(true)}
            className="relative text-gray-700 hover:text-gray-900"
          >
            <ShoppingBagIcon className="h-7 w-8 " />
            <span className="absolute top-[-5px] right-[-3px] inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full text-center">
              {getCartProduct.length}
            </span>
          </button>
        </div>

        <div className="lg:hidden flex items-center space-x-4">
          {token ? (
            <Link
              to="/myaccount/dashboard"
              className="text-gray-700 hover:text-gray-900 flex items-center justify-center"
            >
              <UserIcon className="h-6 w-6 " />
            </Link>
          ) : (
            <Link
              to="/login"
              className="text-gray-700 hover:text-gray-900 flex items-center justify-center"
            >
              <UserIcon className="h-6 w-6 " />
            </Link>
          )}
          <Link
            to="/wishlist"
            className="relative text-gray-700 hover:text-gray-900 flex items-center justify-center"
          >
            <HeartIcon className="h-6 w-6" />
            <span className="absolute top-[-5px] right-[-5px] inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full text-center">
              {" "}
              {userLoggedInData?.length > 0 ? getWishListProduct?.length : "0"}
            </span>
          </Link>
          <button
            onClick={() => setCartopen(true)}
            className="relative text-gray-700 hover:text-gray-900 flex items-center justify-center"
          >
            <ShoppingBagIcon className="h-6 w-6 font-thin" />
            <span className="absolute top-[-5px] right-[-3px] inline-block w-4 h-4 text-xs text-white bg-red-500 rounded-full text-center">
              {getCartProduct.length}
            </span>
          </button>
        </div>
      </div>
      {showSearchBar && (
        <div className="md:hidden w-full p-2">
          <div className="flex items-center bg-white border border-gray-300 rounded-full py-2 px-4">
            <input
              type="text"
              className="w-full text-sm rounded-full mobile-custom-search-input"
              placeholder="Search products... (Ex: Mackbook pro 2024)"
              onChange={handleSearch}
              value={search}
              onFocus={() => setShowSearchResults(true)}
            />
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-500 ml-2" />
          </div>
        </div>
      )}
      {search && showSearchResults && searchData && searchData.length !== 0 ? (
        <div
          ref={searchRef}
          className="absolute overflow-y-auto w-[100%] h-[500px]  bg-slate-50 shadow-sm-2  p-4"
        >
          {searchLoading === true ? (
            <div className="flex justify-center items-center h-auto w-[100%]">
              <Loading />
            </div>
          ) : (
            searchData &&
            searchData.map((i, index) => (
              <Link
                onClick={() => setSearch("")}
                to={`/allproduct/${i._id}`}
                key={index}
              >
                <div className="w-full flex items-start py-3">
                  <img
                    className="w-[40px] h-[40px] mr-[10px]"
                    src={i.images[0]}
                    alt=""
                  />
                  <h1>{i.productName.slice(0, 50)}</h1>
                </div>
              </Link>
            ))
          )}
        </div>
      ) : (
        search &&
        showSearchResults &&
        searchData?.title !== search && (
          <div
            ref={searchRef}
            className="text-center absolute min-w-full min-h-[10vh] bg-slate-50 shadow-sm-2 z-[9] p-4"
          >
            <h1 className="font-[600]">Sorry! No product found</h1>
          </div>
        )
      )}
      <div
        ref={navRef}
        className={`fixed top-0 left-0 w-[58%] h-full bg-white shadow-md transition-transform duration-600 ease-in-out ${
          navOpen ? "translate-x-0" : "-translate-x-full"
        } md:hidden`}
      >
        <div className="p-4 flex justify-between items-center">
          <Link to="/">
            <img src={logo} alt="Online Nest Logo" className="h-10" />
          </Link>
          <button
            onClick={() => setNavOpen(false)}
            className="text-gray-700 hover:text-gray-900 focus:outline-none"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        <div className="flex flex-col items-start p-4 space-y-4 w-full text-sm font-thin">
          <Link
            to="/home"
            className="text-gray-700 hover:text-gray-900 w-full border-b py-2"
          >
            HOME
          </Link>

          <button
            onClick={() => toggleSubMenu("categories")}
            className={`w-full ${
              expandedMenu === "categories"
                ? "bg-red-700 text-white ease-in-out duration-700"
                : ""
            }  text-left text-gray-700  flex justify-between items-center border-b py-2`}
          >
            CATEGORIES{" "}
            {expandedMenu === "categories" ? (
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            ) : (
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            )}
          </button>
          {expandedMenu === "categories" && (
            <div className="pl-4 space-y-1 flex flex-col w-full border-b">
              {categories.length &&
                categories.map((cat, index) => (
                  <Link
                    key={index}
                    onClick={() => setNavOpen(!navOpen)}
                    to={`/products-filter?categoryId=${cat._id}`}
                    className="text-gray-700 hover:text-gray-900 w-full border-b py-2 text-sm"
                  >
                    {cat.categoryName}
                  </Link>
                ))}
            </div>
          )}

          <button
            onClick={() => toggleSubMenu("OnlineNest")}
            className={`${
              expandedMenu === "OnlineNest"
                ? "bg-red-700 text-white ease-in-out duration-700"
                : ""
            }  w-full text-left text-gray-700  flex justify-between items-center border-b py-2`}
          >
            Online Nest{" "}
            {expandedMenu === "OnlineNest" ? (
              <ChevronUpIcon className="w-4 h-4 ml-2" />
            ) : (
              <ChevronDownIcon className="w-4 h-4 ml-2" />
            )}
          </button>
          {expandedMenu === "OnlineNest" && (
            <div className="pl-4 space-y-1 flex flex-col border-b">
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 border-b py-2"
              >
                Subcategory A
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 border-b py-2"
              >
                Subcategory B
              </a>
            </div>
          )}

          <a
            href="#"
            className="text-gray-700 hover:text-gray-900 border-b py-2 w-full"
          >
            Contuct Us
          </a>
          <div className="flex space-x-4 my-4 w-full">
            <button
              onClick={handleLogin}
              className="px-4 py-2 bg-black text-white "
            >
              Login
            </button>
            <button
              onClick={handleRegister}
              className="px-4 py-2 bg-red-500 text-white "
            >
              Register
            </button>
          </div>
          <div className="flex justify-center space-x-4 w-full py-4 border-t">
            <a href="#" className="text-blue-600">
              <FaFacebook className="w-6 h-6" />
            </a>
            <a href="#" className="text-red-600">
              <BsYoutube className="w-6 h-6" />
            </a>
            <a href="#" className="text-pink-600">
              <BsInstagram className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Cart Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-md transition-transform duration-600 ease-in-out ${
          cartopen ? "translate-x-0" : "translate-x-full"
        } overflow-y-auto w-80`}
        ref={cartRef}
      >
        {/* Cart items should be mapped here */}
        <CartDetails getCartProduct={getCartProduct} />
      </div>
    </nav>
  );
};

export default Navbar2;
