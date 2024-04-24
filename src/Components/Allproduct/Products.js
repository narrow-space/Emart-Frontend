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
  ShoppingBagIcon,
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
    <div className="product-card relative">


      <div
        className={`  product-details  md:w-[full] md:h-[auto]`}>
        {/* {data?.type !== null && data?.type !== undefined && (
          <div className="badgge"><span className={`badgee sm:z-[5]   ${data.type}`}>{data.type}</span></div>
        )} */}

        <div className={`md:h-[310px] h-[300px]`}>
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
                        className=" tooltip  "
                        data-tip="Remove Wishlist"
                      >
                        <FaHeart
                          size={19}
                          onClick={() => setClcik(!click)}
                          className="w-5 "
                          color={click ? "white" : "#00d7c0"}
                        />
                      </div>
                    </>
                  ) : (
                    <div
                      className=" tooltip  "
                      data-tip="Add Wishlist"
                    >
                      <FaRegHeart
                        size={19}
                        onClick={() => setClcik(!click)}
                        className="w-5 "
                        color={click ? "#00D7C0" : "white"}
                      />
                    </div>
                  )}
                </li>

                <div className="tooltip " data-tip="View">
                  <li className="cursor-pointer">
                    <EyeIcon
                      onClick={() => setModalOpen(!modalOpen)}
                      className="w-5"
                    />
                  </li>
                </div>

                <div className="tooltip  " data-tip="Compare">
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
                className="title text-sm h-[40px] my-3"
              >
                {
                  data.productName.length > 20 ? data.productName.substring(0, 50) : data.productName}
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
              <div className="flex items-center justify-stretch mt-6">
                <span className="text-xl">$</span>
                <h4 className="text-sm font-[700]">

                  {handleDiscount(data?.price)}
                </h4>

                <span className="line-through text-xs   text-[gray] mx-5 font-thin">
                  ${data?.price}

                </span>

                <p className=" text-[orange] text-xs  ">
                  {data?.discount}%off
                </p>


              </div>
            </Link>
          
          </div>
        </div>
        

                 {data?.quantity === 0 ?
                    <button>
                 <div className=" sm:hidden add-to-cart-button text-white text-sm bg-[#ff00009d] w-[100%] h-[40px] p-3 lg:flex items-center justify-center ">

                        out of stock
                      </div>

                    </button> : <button  onClick={() => handleAddtoCart(data._id)}>
                   
                      <div className="text-sm  sm:hidden add-to-cart-button text-white bg-[black] w-[100%] h-[40px] p-3 lg:flex items-center justify-center ">
                        <>
                        {
                          isLoading ?(
                            <span className="loading loading-spinner loading-sm" />):

                            <>
                               <ShoppingBagIcon className="w-5 h-5 mr-1" /> 
                               <div>
                                Add To Cart
                               </div>
                            </>
                   
                        }
                        
                        </>
                        
                       

                      </div>

                    </button>

                  }

      {
        data.quantity===0 ?<button className="w-[100%]">
        <div className=" lg:hidden xl:hidden  text-white text-sm bg-[#ff00009d] w-[100%] h-[40px] p-3 sm:flex items-center justify-center ">

               out of stock
             </div>

           </button> : <button  className="w-[100%]"  onClick={() => handleAddtoCart(data._id)}>
          
             <div className="text-sm lg:hidden xl:hidden  text-white bg-[black] w-[100%] h-[40px] p-3 sm:flex items-center justify-center ">
               {
                 isLoading && (
                   <span className="loading loading-spinner loading-sm" />)
               }
             <ShoppingBagIcon className="w-5 h-5 mr-1" /> Add to cart

             </div>

           </button>
      }
     


        {/* </div> */}





        {modalOpen ? (
          <OpenCardModal setModalOpen={setModalOpen} data={data} />
        ) : null}
      </div>


    </div>
  );
};

export default Products;


