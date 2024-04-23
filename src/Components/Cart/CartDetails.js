import { ShoppingBagIcon, XMarkIcon } from '@heroicons/react/24/outline';
import React, { useContext } from 'react'
import Cartsingle from './Cartsingle';
import { useNavigate } from 'react-router-dom';
import { CartopenContex } from '../../Contexapi/Cartopencontex';
import { Button } from '@mui/material';

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


    return (
        <div><div className="flex w-full justify-end pt-5 pr-5">
            <XMarkIcon onClick={() => {
                setCartopen(false);
            }} className="w-5 h-5 cursor-pointer text-[#5F5F5F]" />

        </div>
            {/* items length */}
            <div className="flex justify-center p-6 absolute top-0 bottom-0">

                <ShoppingBagIcon className="w-5 h-5 text-[#5F5F5F]" />
                <h5 className="pl-2 text-md ">Shopping Cart</h5>
            </div>
            {/*    */}
            <br />
            <div className=" w-full  border-t absolute top-20 bottom-0">
                {getCartProduct &&
                    getCartProduct.map((i, index) => {
                        return <Cartsingle key={index} data={i} />;
                    })}
                    <div className="w-full flex flex-col  items-center justify-center ">
                    

                    <div 
                    onClick={checkhandaler}className='text-black bg-gray-200 p-3 w-[70%] text-center text-sm mt-3'>
                   Checkout
                   </div>
                   <div 
                   onClick={viewhandaler}
                   className='text-white bg-black p-3 w-[70%] text-center text-sm my-3 '>
                    view cart
                   </div>
                  

                </div>
                
            </div>
            
            
            
            </div>
    )
}

export default CartDetails