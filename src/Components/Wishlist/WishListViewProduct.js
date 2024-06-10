import React, { useEffect, useState } from 'react';
import { FaAngleLeft } from "react-icons/fa";
import { FaAngleRight } from "react-icons/fa";

const WishListViewProduct = ({ wishListView }) => {
    const [img, setImg] = useState("")
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNextImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === wishListView.images.length - 1 ? 0 : prevIndex + 1));
    };

    const handlePrevImage = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? wishListView.images.length - 1 : prevIndex - 1));
    };

    // Reset the img state when a new product is rendered
    useEffect(() => {
        setImg("");
        setCurrentIndex(0)
    }, [wishListView]);


    const handleImageClick = (url) => {
        console.log(url)
        setImg(url)

    }

    return (
        <div className="webkit p-6">
            <div className="container  flex flex-col lg:flex-row ">
                {/* Product Image */}
                <div className="w-full lg:w-1/2 flex justify-center items-center ">
                    <div className='flex flex-col relative'>
                        {wishListView && wishListView.images && wishListView.images.length > 0 && (
                            <img
                            src={ (wishListView.images[currentIndex] ||wishListView.images[0] )}
                            
                                alt="Product Image"
                                className="max-w-full h-[350px]"
                            />
                            
                        )}
                       <FaAngleLeft onClick={handlePrevImage} className='absolute bottom-1/2 transform -translate-y-1/2 left-0' size={23} />
                       <FaAngleRight onClick={handleNextImage}  className='absolute bottom-1/2 transform -translate-y-1/2 right-0' size={23} />
                        {
                            wishListView && wishListView.images && wishListView.images.length > 0 &&
                            <div className='flex flex-row  '>


                                {
                                    wishListView.images.map((img, index) => {
                                        return <img
                                            src={img}
                                            alt="Product Image"
                                            className={`w-40 h-20 mx-2 cursor-pointer ${currentIndex === index ? 'border border-blue-500' : ''}`}
                                            onClick={() =>{ handleImageClick(img);setCurrentIndex(index)}}
                                        />
                                    })
                                }

                            </div>
                        }

                       

                    </div>

                </div>

                {/* Product Details */}
                <div className="w-full lg:w-1/2 p-4 space-y-4">
                    {/* Product Title */}
                    <h1 className="text-2xl font-bold">Rhoto Hadalabo Gokujun Aging Care Milk Lotion 140ml</h1>

                    {/* Reviews */}
                    <div className="flex items-center space-x-2">
                        <div className="text-yellow-400">
                            {/* Star icons */}
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
                            </svg>
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
                            </svg>
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
                            </svg>
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
                            </svg>
                            <svg className="w-4 h-4 inline" fill="currentColor" viewBox="0 0 20 20">
                                <path d="M10 15l-6.16 3.58L5 12.25 1 8.09l6.32-.9L10 1l2.68 6.19 6.32.9-4 4.16 1.16 6.33L10 15z"></path>
                            </svg>
                        </div>
                        <span className="text-sm">(There is no review yet.)</span>
                    </div>

                    {/* Price */}
                    <div className="text-xl text-gray-800">৳1,680.00</div>

                    {/* Category and Availability */}
                    <div className="text-sm text-gray-600">
                        <div>Category: <span className="text-gray-800">Skin Care, Toner/Lotion</span></div>
                        <div>Availability: <span className="text-green-600 font-semibold">In Stock</span></div>
                    </div>

                    {/* Quantity and Add to Cart */}
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center border border-gray-300">
                            <button className="px-2 py-1">-</button>
                            <input type="number" className="w-12 text-center border-none" defaultValue="1" />
                            <button className="px-2 py-1">+</button>
                        </div>
                        <button className="px-4 py-2 bg-black text-white uppercase">Add to Cart</button>
                    </div>

                    {/* Social Share and Wishlist */}
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-facebook-f"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-twitter"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fab fa-linkedin-in"></i>
                        </a>
                        <a href="#" className="text-gray-600 hover:text-gray-900">
                            <i className="fas fa-envelope"></i>
                        </a>
                        <a href="#" className="text-red-600 hover:text-red-800">
                            <i className="fas fa-heart"></i> Go to Wishlist
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WishListViewProduct;
