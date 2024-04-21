import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import React, { useContext, useEffect, useRef, useState } from "react";
import { RxCross1 } from "react-icons/rx";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./OpenCardModal.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import ReactImageMagnify from "react-image-magnify";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CartopenContex } from "../../Contexapi/Cartopencontex";
import { adminGetProducts } from "../../redux/Slice/ProductSlice/ProductSlice";

const OpenCardModal = ({ setModalOpen, data }) => {
  const [count, setCount] = useState(1);

  const [active, setActive] = useState(0);

  const { getCartProduct, addToCartLoading } = useSelector((state) => state.cart)
  const [newimage, setNewImage] = useState(
    data.images ? data.images[0] : data.image
  );
  const [size, setSize] = useState("");

  const detailsRef = useRef();
  const imageHandler = (i, index) => {
    setNewImage(i);
    detailsRef.current.slickGoTo(index);
  };

  const isActive = (i, index) => {
    setActive(i);
    setSize(index);
  };


  const myStyles = {
    itemShapes: ThinRoundedStar,
    activeFillColor: "#ffb700",
    inactiveFillColor: "#fbf1a9",
  };

  ////Slider setings///

  var settings = {
    dots: false,

    speed: 500,
    infinite: false,
    speed: 500,
    slidesToShow: 3,

    slidesToScroll: 1,
    autoplay: false,
    arrows: true,
    fade: false,
  };

  const increase = () => {
    setCount(count + 1);
    handleAddtoCart(data._id)
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
  };

  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = data?.discount;
    const actualPrice = productPrice - (productPrice * discount / 100)
    return actualPrice
  }

  ///handle Add to cart///
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch()
  const Navigate = useNavigate()
  ///add to cart Function///
  const token = localStorage.getItem("usertoken")
  const handleAddtoCart = async(id) => {
    if (!token) {
      Navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(addtoCart({ productid: id }));
 
      await dispatch(getCart()); 
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };
console.log(isLoading)

  const handlecount = (id) => {

    const product = getCartProduct.find((pd) => pd.productid === id)
    return product ? product?.quantity : 0




  }


  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the screen width meets the criteria for a "mobile" device
    const isMobileScreen = window.matchMedia("(max-width: 660px)").matches;
    setIsMobileDevice(isMobileScreen);
  }, []);




  return (
    <div className="">
      {data ? (
        <div className="fixed w-full h-screen top-0 right-0 bg-[#80808034] z-50 flex items-center justify-center">
          <div className="w-[90%] md:w-[60%] h-[95vh] overflow-y-scroll md:h-[70vh] bg-[white] rounded-2xl shadow-2xl relative px-4 flex items-center justify-center  ">
            <RxCross1
              onClick={() => setModalOpen(false)}
              size={30}
              className="absolute right-3 top-3 z-10"
            />

            <div className="mt-auto">
              <div className="grid grid-cols-1 md:grid-cols-2 md:gap-10 ">
                <div className="">
                  <div className="border-solid border-2 border-[#80808016] rounded-2xl  ">
                    <div className="">
                    <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product Image",
                    isFluidWidth: true,
                    src: newimage,
                    width: 400,
                    height: 500,

                  },
                  largeImage: {
                    src: newimage,
                    width: isMobileDevice ? 400 : 550,
                    height: isMobileDevice ? 1200 : 1800,


                  },
                  enlargedImageContainerStyle: {
                    zIndex: 9999,
                    width: isMobileDevice ? "100%" : 700 // Set width to 100% on mobile devices
                  },
                  isHintEnabled: true,
                  shouldHideHintAfterFirstActivation: false,

                  enlargedImagePosition: isMobileDevice ? "over" : "side", // Set position to "over" on mobile devices

                  isActivatedOnTouch: false, // Enable inner zoom on touch devices
                  pressDuration: 200,
                  pressMoveThreshold: 9,
                  fadeDurationInMs: 700

                }}
              />
                   
             
                    </div>

                  </div>

                  <Slider
                    ref={detailsRef}
                    {...settings}
                    className="details_slider w-full md:w-full p-0 "
                  >
                    {data.images &&
                      data.images.map((el, index) => {
                        return (
                          <div
                            onClick={() => imageHandler(el, index)}
                            className=""
                          >
                            <img className="h-32 w-40" src={`${el}`} alt="" />
                          </div>
                        );
                      })}
                  </Slider>
                </div>

                <div className="info mt-8 ">
                  <div className="badge bg-[#fde0e9] text-[#f74b81] ">
                    <h2 className=""><span className="mr-2">{data?.type}</span> {data?.discount}%</h2>
                  </div>
                  <h3 className=" text-2xl ">{data.title}</h3>
                  <p className="text-sm">
                    {data.description.length > 140
                      ? data.description.slice(0, 340) + "..."
                      : data.description}
                  </p>
                  <br />

                  {/* size/weight chart */}

                  <div className="product_size flex  items-center">
                    <span>Size / Weight:</span>
                    <ul className="list-items flex items-center pl-4">
                      {data.sizes &&
                        data.sizes.map((i, index) => {
                          return (
                            <li className="list">
                              <a
                                className={`tag ${active === index ? "active" : ""
                                  }`}
                                onClick={() => isActive(index, i)}
                              >
                                {i}
                              </a>
                            </li>
                          );
                        })}
                    </ul>

                  </div>
                  <p>items left : {data?.quantity}</p>
                  <div className="flex items-center ">
                    <Rating
                      style={{ maxWidth: 80 }}
                      value={data?.rating?.rate}
                      readOnly
                      itemStyles={myStyles}
                    />
                    <br /> <br />
                    <span className="pl-3">{data?.rating?.rate}</span>
                  </div>
                  <div className="flex items-center">
                    <h4 className=" text-2xl font-[900]">${handleDiscount(data.price)}</h4>
                    <div className="pl-2 flex flex-col items-center">
                      <p className="text-[red] text-sm ">{data?.discount}% off</p>
                      <span className="line-through text-lg  font-[500]  text-[gray]">
                        ${data?.price}
                      </span>
                    </div>
                  </div>

                  {/* inc and dec and button add to cart */}
                  <div className="inc_dec  flex items-center">
                    <div className="counter">
                      <input value={handlecount(data._id)} type="number" />
                      <span onClick={increase} className="arrow up">
                        <IoIosArrowUp />
                      </span>
                      <span onClick={decrease} className="arrow down">
                        <IoIosArrowDown />
                      </span>
                    </div>





                    <button onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleAddtoCart(data._id);
                    }} className=" btn ml-4 bg-[#5C0F8B] text-[white] hover:bg-[#FF3D71]">
                      {data?.quantity < 1 ? <p>Out of Stock</p> : <>

                        {isLoading ? (
                          <span className="loading loading-spinner loading-lg" />
                        ) : (
                          <>

                            <span>
                              <BsCart2 size={15} />
                            </span>
                            <h2 className="">Add to cart</h2>
                          </>
                        )}
                      </>}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default OpenCardModal;
