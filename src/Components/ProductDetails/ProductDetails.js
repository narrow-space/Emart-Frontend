import React, { useEffect, useRef, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./ProductDetails.scss";
import { IoIosArrowUp, IoIosArrowDown } from "react-icons/io";
import { BsCart2 } from "react-icons/bs";
import { Rating, ThinRoundedStar } from "@smastrom/react-rating";
import { Avatar, Button, LinearProgress } from "@mui/material";
import ProgressBar from "@ramonak/react-progress-bar";
import { MdOutlineDeleteForever } from "react-icons/md";
import ReactImageMagnify from 'react-image-magnify';


import {
  DeleteReview,
  addReview,
  adminGetProducts,
  getReview,
  getSingleProduct,
} from "../../redux/Slice/ProductSlice/ProductSlice";
import { useDispatch, useSelector } from "react-redux";

import Loading from "../Share/Loading";
import { userLoggedIn } from "../../redux/Slice/Userauthslice/userAuthSlice";
import toast from "react-hot-toast";
import { addtoCart, getCart } from "../../redux/Slice/cartSlice/cartSlice";
const ProductDetails = () => {
  const [currentData, setCurrentData] = useState({});
  const [newimage, setNewImage] = useState("");
  const [count, setCount] = useState(1);
  const [active, setActive] = useState(0);
  const [size, setSize] = useState("");
  const [tabActive, setTabActive] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [rating, setRating] = useState(0);
  const [description, setDiscription] = useState("");
  const [review, setReview] = useState([]);
  const { id } = useParams();
  const {
    productDetails,
    productdetaillsLoading,
    getReviewLoading,
    DeleteReviewLoading,
    reviewLoading,
  } = useSelector((state) => state.products);
  const [isLoading, setIsLoading] = useState(false);
  const { userLoggedInData } = useSelector((state) => state.user);
  const { getCartProduct } = useSelector((state) => state.cart);
  const Navigate = useNavigate();

  ///Get current user///
  const userverify = () => {
    dispatch(userLoggedIn());
  };

  useEffect(() => {
    userverify();
  }, []);

  ///fetch singel product from database///
  const dispatch = useDispatch();
  const productApi = () => {
    const data = {
      productid: id,
    };

    dispatch(getSingleProduct(data));
  };

  useEffect(() => {
    productApi();
  }, [dispatch, id, getCartProduct]);
  // Update image when product details change
  useEffect(() => {
    if (productDetails.images && productDetails.images.length > 0) {
      setNewImage(productDetails.images[0]);
    }
  }, [productDetails]);

  const detailsRef = useRef();

  const imageHandler = (i, index) => {
    setNewImage(i);

    detailsRef.current.slickGoTo(index);
  };
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
    handleAddtoCart(productDetails._id);
  };

  const decrease = () => {
    if (count > 1) {
      setCount(count - 1);
    }
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

  ///GEt product Review////



  const fetchReview = () => {
    const data = {
      productid: productDetails._id,
    };
    dispatch(getReview(data))
      .then((res) => {
        setReview(res.payload);
      })
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });
  };

  useEffect(() => {
    fetchReview();
  }, [productDetails._id, userLoggedInData[0]?._id]);

  ////submit review data///
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("usertoken");

    if (token == null) {
      toast.error("please login before write a review");
      Navigate("/login");
    } else if (rating == "") {
      toast.error("please give me a rating");
    } else if (description === "") {
      toast.error("please write a description");
    } else {
      const data = {
        productid: productDetails._id,
        usermainid: userLoggedInData[0]?._id,
        username: userLoggedInData[0]?.firstname,
        avatar: userLoggedInData[0]?.userprofile,
        description,
        rating,
      };
      dispatch(addReview(data))
        .then((res) => {
          if (res.payload) {
            fetchReview();
            setDiscription("");
            setRating(0);
          }
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  const ratingPercentageCalculation = (starRating) => {
    const totalReviews = review.length;
    if (totalReviews === 0) {
      return 0;
    }
    const starReviews = review.filter(
      (review) => review.rating == starRating
    ).length;

    return (starReviews / totalReviews) * 100;
  };

  const formatCreatedAt = (createdAt) => {
    const date = new Date(createdAt);
    console.log(date);
    return date.toLocaleString();
  };

  ///deleteReview///
  const handleDeleteReview = (id) => {
    const data = {
      reviewid: id,
    };
    dispatch(DeleteReview(data))
      .then((res) => {
        if (res.payload) {
          fetchReview();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    // Check if the screen width meets the criteria for a "mobile" device
    const isMobileScreen = window.matchMedia("(max-width: 660px)").matches;
    setIsMobileDevice(isMobileScreen);
  }, []);

  ////Calculate discount//
  const handleDiscount = (productPrice) => {
    const discount = productDetails?.discount;
    const actualPrice = productPrice - (productPrice * discount / 100)
    return actualPrice
  }

  ///add to cart Function///
  const token = localStorage.getItem("usertoken")
  const handleAddtoCart = async (id) => {
    if (!token) {
      Navigate("/login");
      return;
    }

    try {
      setIsLoading(true);
      await dispatch(addtoCart({ productid: id }));
      // await dispatch(getCart());

    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };








  return (
    <>
      {productdetaillsLoading ? (
        <Loading />
      ) : (
        <div className="container-fluide">
          <div className=" grid grid-cols-1 md:grid-cols-2 gap-x-0">
            <div className="flex flex-col items-center justify-center">
              <div className="w-[400px] h-[auto] ">



              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Product Image",
                    isFluidWidth: true,
                    src: newimage,

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





                {/* <InnerImageZoom
                  className="w-full h-full object-cover md:object-contain"
                  zoomScale={2}
                  zoomType="hover"
                  src={newimage}
                /> */}
              </div>


              <Slider
                ref={detailsRef}
                {...settings}
                className="details_slider w-full md:w-[70%] mb-0  "
              >
                {productDetails.images &&
                  productDetails.images.map((el, index) => {
                    return (
                      <div onClick={() => imageHandler(el, index)}>
                        <img className="h-32 w-40" src={`${el}`} alt="" />
                      </div>
                    );
                  })}
              </Slider>
            </div>

            <div className="info p-3">
              <div className="badge bg-[#fde0e9] text-[#f74b81] p-[18px]">
                <h2 className="uppercase"><span className="mr-2">{productDetails?.type}</span>{productDetails?.discount}%</h2>
              </div>
              <h3 className="text-[20px] md:text-4xl my-5">
                {productDetails.productName}
              </h3>
              <p className="text-black text-sm ">{productDetails.description}</p>
              <br />

              {/* size/weight chart */}

              <div className="product_size flex  items-center my-5">
                <span>Size / Weight:</span>
                <ul className="list-items flex items-center pl-4">
                  {productDetails.sizes &&
                    productDetails.sizes.map((i, index) => {
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

              <span className="bg-red-600 text-white p-[1px] text-sm">Stocks</span><span className="text-black ">:{productDetails?.quantity}</span>
              
                    <div className="flex items-center">
                        <Rating
                            style={{ maxWidth: 80 }}
                            value={currentData?.rating?.rate}
                            readOnly
                            itemStyles={myStyles}
                        />
                        <br /> <br />
                        <span className="pl-3">{currentData?.rating?.rate}</span>
                    </div>

              <div className="flex items-center">
                <h4 className="text-[20px] md:text-[58px] font-[900]">
                  ${handleDiscount(productDetails?.price)}
                </h4>
                <div className="pl-2 flex flex-col items-center">
                  <p className="text-[red] text-[12px] md:text-[20px] ">
                    {productDetails?.discount}% off
                  </p>
                  <span className="line-through text-[20px]  md:text-[38px] font-[500]  text-[gray]">
                    ${productDetails?.price}

                  </span>

                </div>
              </div>

              {/* inc and dec and button add to cart */}
              <div className="inc_dec  flex items-center">
                {/* <div className="counter">
                <input value={count} type="number" />
                <span onClick={() => { increase()}}className="arrow up">
                  <IoIosArrowUp />
                </span>
                <span onClick={decrease} className="arrow down">
                  <IoIosArrowDown />
                </span>
              </div> */}
                <button onClick={(e) => {

                  handleAddtoCart(productDetails._id);
                }} className=" btn  bg-[#5C0F8B] text-[white] hover:bg-[#FF3D71]">
                  {productDetails?.quantity < 1 ? <p>Out of Stock</p> : <>

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
          <div className="w-[100%] mt-5 h-[60%] p-6 border-solid border-2 border-[#8080801c] rounded-2xl">
            <div className="customtabs">
              <ul className="flex items-center ">
                <li>
                  <Button onClick={() => setTabActive(0)}>Description</Button>
                </li>
                <li>
                  <Button onClick={() => setTabActive(1)}>
                    Review({review?.length})
                  </Button>
                </li>
              </ul>
            </div>
            {tabActive === 0 ? (
              <div className="w-[100%] ">
                <p className="line-clamp-7 text-sm p-3">{productDetails.description}</p>
              </div>
            ) : null}
            {tabActive === 1 ? (
              <div className=" grid grid-col-1 md:grid-cols-2 gap-x-6">
                <div className="">
                  <h3 className="text-2xl mt-3">
                    Customers questions & Answers
                  </h3>
                  <br />
                  <>
                    {DeleteReviewLoading || getReviewLoading ? (
                      <Loading />
                    ) : (
                      <>
                        {" "}
                        {review.map((review, index) => {
                          return (
                            <div
                              key={index}
                              className="w-full p-6 border-solid border-2 border-[#8080801c] rounded-2xl"
                            >
                              <div className="flex gap-x-10">
                                <div className="flex flex-col gap-y-5">
                                  <Avatar
                                    alt="Remy Sharp"
                                    src={review?.avatar}
                                    sx={{ width: 56, height: 56 }}
                                  />
                                  <h1 className="">{review.username}</h1>
                                </div>
                                <div className="w-full">
                                  <div className="flex">
                                    <p className="text-sm text-gray-500">
                                      {formatCreatedAt(review.createdAt)}
                                    </p>
                                    <div className="ml-auto">
                                      <Rating
                                        style={{ maxWidth: 80 }}
                                        value={review?.rating}
                                        readOnly
                                        itemStyles={myStyles}
                                      />
                                    </div>
                                  </div>
                                  <p className="mt-6 ">{review.description}</p>
                                </div>
                              </div>
                              <div className="flex items-center justify-end">
                                <div data-tip="delete review" className="tooltip flex">

                                  {
                                    localStorage.getItem("usertoken") ? <MdOutlineDeleteForever
                                      onClick={() => handleDeleteReview(review._id)}
                                      className=" cursor-pointer  "

                                      size={25}
                                    /> : null
                                  }

                                </div>
                              </div>


                            </div>
                          );
                        })}
                      </>
                    )}
                  </>

                  <h2 className="text-2xl capitalize my-5">Add a Review</h2>
                  <form action="">
                    <div className="w-full">
                      <textarea
                        onChange={(e) => setDiscription(e.target.value)}
                        required
                        className="w-[100%] md:w-[90%] outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="write Comment.."
                        id="description"
                        name="description"
                        rows="7"
                        cols="52"
                        type="text"
                        value={description}
                      />
                      <Rating
                        style={{ maxWidth: 180 }}
                        value={rating}
                        onChange={setRating}
                        isRequired
                      />
                      <input
                        value={
                          userLoggedInData.length > 0
                            ? userLoggedInData[0]?.firstname
                            : ""
                        }
                        required
                        className="w-[100%] md:w-[40%] my-2 outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="Name"
                        type="text"
                      />
                      <input
                        value={
                          userLoggedInData.length > 0
                            ? userLoggedInData[0]?.email
                            : ""
                        }
                        required
                        className="w-[100%] md:w-[40%] outline-none border-2 border-[#8080801c] resize-none p-5 "
                        placeholder="email"
                        type="text"
                      />
                    </div>
                    {reviewLoading ? (
                      <Loading />
                    ) : (
                      <Button
                        onClick={handleSubmit}
                        type="Submit"
                        sx={{
                          marginTop: "18px",
                        }}
                        variant="contained"
                        color="success"
                      >
                        Submit
                      </Button>
                    )}
                  </form>
                </div>

                <div className="mt-4">
                  <h2>Customers Review</h2>
                  {/* <div className=' flex items-center gap-x-3 '>
                            <Rating
                                className=''
                                style={{ maxWidth: 80 }}
                                value={currentData?.rating?.rate}
                                readOnly
                                itemStyles={myStyles}
                            />
                            <span className='font-bold'>{currentData?.rating?.rate} out of 5</span>

                        </div> */}
                  {[5, 4, 3, 2, 1].map((star, index) => (
                    <div key={index} className="flex items-center">
                      <span>{star} star</span>
                      <ProgressBar
                        className="ml-4 w-[200px] md:w-[400px]"
                        completed={ratingPercentageCalculation(star)}
                        bgColor="#FFB700"
                        height="20px"
                        width=""
                        borderRadius="0px"
                        isLabelVisible={true}
                        labelColor="white"
                      />
                    </div>
                  ))}
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}

    </>
  );
};

export default ProductDetails;
