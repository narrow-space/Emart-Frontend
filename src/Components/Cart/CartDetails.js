import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useContext, useEffect, useState } from 'react'
import Cartsingle from './Cartsingle';
import { useNavigate } from 'react-router-dom';
import { CartopenContex } from '../../Contexapi/Cartopencontex';
import { Button } from '@mui/material';
import { useSelector } from 'react-redux';
import { BsFillCartXFill } from "react-icons/bs";

const CartDetails = ({ getCartProduct }) => {
    const navigation = useNavigate()
    const { cartopen, setCartopen, cartRef } = useContext(CartopenContex);

    const viewhandaler = () => {
        window.scrollTo(0, 0);
        navigation("/Viewcart");
        setCartopen(false);
    };
    const checkhandaler = () => {
        window.scrollTo(0, 0);
        navigation("/Viewcart/Checkout");
        setCartopen(false);
    };



    const [price, setPrice] = useState("")
    const total = () => {
        let totalprice = 0
        getCartProduct.map((el, index) => {
            totalprice = el.details.price * el.quantity + totalprice
        })
        setPrice(totalprice)

    }
    useEffect(() => {
        total()
    }, [total])

    const token = localStorage.getItem('usertoken')

    return (
        <>

            <div>


                <div className='h-[60px] border-b-1' >
                    {/* items length */}
                    <div className="flex border-b justify-center p-6 absolute top-0 bottom-0 ">

                        <ShoppingBagIcon className="w-5 h-5 text-[#5F5F5F]" />
                        <h5 className="pl-2 text-md ">Shopping Cart</h5>

                    </div>
                    <div className="absolute  top-6 right-1">
                        <XMarkIcon onClick={() => {
                            setCartopen(false);
                        }} className="w-5 h-5 cursor-pointer text-[#5F5F5F]" />

                    </div>
                </div>
                <hr />

                {/*    */}
                <br />

                {
                    getCartProduct.length > 0 ?
                        <div className=" w-full  border-b absolute top-20 bottom-0">
                            {getCartProduct &&
                                getCartProduct.map((i, index) => {
                                    return <Cartsingle key={index} data={i} />;
                                })}

                            <div className='flex justify-center items-center my-7'>
                                <h1 className='ml-3 text-sm uppercase font-[800]'>Subtotal:</h1>
                                <h1 className='ml-auto mr-3 text-sm uppercase font-[800]'>$ {price}.00</h1>
                            </div>

                            <div className="w-full flex flex-col  items-center justify-center ">

                                <div
                                    onClick={viewhandaler}
                                    className='text-white bg-black p-3 w-[70%] text-center text-sm uppercase cursor-pointer'>
                                    view cart
                                </div>

                                <div
                                    onClick={checkhandaler} className='text-black bg-gray-200 p-3 w-[70%] text-center text-sm mt-3 uppercase cursor-pointer'>
                                    Checkout
                                </div>



                            </div>

                        </div> : <div className=' flex flex-col justify-center items-center mt-9'>


                            <BsFillCartXFill className='opacity-[0.2]' size={130} />
                            <p className='font-[700]'>No products in the cart</p>
                        </div>
                }




            </div>





        </>


    )
}

export default CartDetails