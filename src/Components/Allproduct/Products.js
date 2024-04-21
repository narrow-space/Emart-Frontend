import React, { useContext, useEffect, useState } from "react";
import "./Products.scss";
import { FaHeart } from "react-icons/fa6";
import { FaRegHeart } from "react-icons/fa";

import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import {
  ShoppingCartIcon,
  HeartIcon,
  EyeIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
// import {HeartIcon} from "@heroicons/react/24/solid";

import "@smastrom/react-rating/style.css";
import { Link, useNavigate } from "react-router-dom";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { ThemeContex } from "../../Contexapi/Themecontex";
import OpenCardModal from "./OpenCardModal.js";

import { useDispatch, useSelector } from "react-redux";
import { addtoCart } from "../../redux/Slice/cartSlice/cartSlice.js";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice.js";


const Products = ({ data, height }) => {
  const { cartopen, setCartopen } = useContext(CartopenContex);
  const { theme } = useContext(ThemeContex);
  const [modalOpen, setModalOpen] = useState(false);
  const [click, setClcik] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate()


  ///add to cart Function///
  const token = localStorage.getItem("usertoken")
  const handleAddtoCart = (id) => {
    if (!token) {
      Navigate("/login")
    }
    else {
      setIsLoading(true);
      const data = {
        productid: id
      };
      dispatch(addtoCart(data))
        .then((res) => {
          if (res.payload) {

            // setCartopen(!cartopen);

          }
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };
  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    const actualPrice = productPrice - (productPrice * discount / 100)
    return actualPrice
  }





  return (
    <div className="">
     

      <div
        className={`  product-details  md:w-[full] md:h-[auto]`}>
        {data.type !== null && data.type !== undefined && (
          <div className="badgge"><span className={`badgee z-[5]   ${data.type}`}>{data.type}</span></div>
        )}

        <div className={`md:h-[280px] h-[300px]`}>
          <div className={`imgwraper`}>
            <Link

              // onClick={() => sessionStorage.setItem("title", `${product_name}`)} 


              to={`/allproduct/${data._id}`}>
              <div className="cursor-pointer relative overflow-hidden ">
                <img
                  className="w-full transform hover:scale-110 "
                  src={data.images[0]}
                  alt=""
                />
              </div>
            </Link>

            <div className="overlay transition flex justify-center items-center">
              <ul className="pb-0 flex justify-center  ">
                <li className="">
                  {click ? (
                    <>
                      <div
                        className=" tooltip tooltip-accent "
                        data-tip="Remove Wishlist"
                      >
                        <FaHeart
                          size={19}
                          onClick={() => setClcik(!click)}
                          className="w-5 "
                          color={click ? "#00D7C0" : "#00d7c0"}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className=" tooltip tooltip-accent "
                      data-tip="Add Wishlist"
                    >
                      <FaRegHeart
                        size={19}
                        onClick={() => setClcik(!click)}
                        className="w-5 "
                        color={click ? "#00D7C0" : "#00d7c0"}
                      />
                    </div>
                  )}
                </li>

                <div className="tooltip tooltip-accent" data-tip="View">
                  <li className="">
                    <EyeIcon
                      onClick={() => setModalOpen(!modalOpen)}
                      className="w-5"
                    />
                  </li>
                </div>

                <div className="tooltip tooltip-accent " data-tip="Compare">
                  <li className="">
                    <ArrowPathIcon className="w-5 " />
                  </li>
                </div>
              </ul>
            </div>
          </div>

          <div className="info p-3 ">
            <Link

              // onClick={() => sessionStorage.setItem("title", `${product_name}`)}


              to={`/allproduct/${data._id}`}>
              <span
                style={theme == "dark" ? { color: "white" } : { color: "black" }}
                className="block brand text-xs"
              >

                Brand:{data.brand}
              </span>
              <h4
                style={{ color: "" }}
                className="title text-sm"
              >
                {
                  data.productName}
              </h4>
            </Link>
            {/* <div className="flex items-center">
            <Rating
              style={{ maxWidth: 80 }}
              value={data?.rating?.rate}
              readOnly
              itemStyles={myStyles}
            />
            <span className="pl-3">{data?.rating?.rate}</span>
          </div> */}
            <Link
              // onClick={() => sessionStorage.setItem("title", `${product_name}`)} 

              to={`/allproduct/${data._id}`}>
              <div className="flex items-center justify-between">

                <h4 className="text-sm font-[900]">
                  <span className="text-xl">$</span>
                  {handleDiscount(data?.price)}
                </h4>
                <div className="pl-2 flex flex-col items-center">
                  <p className="text-[white] bg-[#5C0F8B] text-xs p-[2px] ">
                    {data?.discount}% off
                  </p>
                  <span className="line-through text-[gray]">
                    ${data?.price}

                  </span>

                </div>
              </div>
            </Link>
            {/* <div className="relative mb-6  hover:top-[-3px]  "> */}
            {/* <button
              onClick={() => setCartopen(!cartopen)}
              className="p-1 w-full  btn btn-xs md:btn-sm bg-[#9D44C0] text-[#FFf] hover:bg-[#9D44C0] hover:text-[white]   "
            >
              <ShoppingCartIcon className="w-3 " />
              Add to Cart
            </button> */}
          </div>
        </div>
        <div
          onClick={() => handleAddtoCart(data._id)}
          className="w-[100%] h-[47px] bg-[#5C0F8B] flex items-center justify-center rounded-b-lg p-0  cursor-pointer transition ease-in duration-300">

          <h1 className="text-center font-medium text-[white]">
            {data?.quantity < 1 ? <p>Out of Stock</p> : <>

              {isLoading ? (
                <span className="loading loading-spinner loading-lg" />
              ) : (
                <span>ADD TO CART</span>
              )}
            </>}
          </h1>
        </div>

        {/* </div> */}





        {modalOpen ? (
          <OpenCardModal setModalOpen={setModalOpen} data={data} />
        ) : null}
      </div>


    </div>
  );
};

export default Products;


