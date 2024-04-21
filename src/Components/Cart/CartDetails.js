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
            }} className="w-8 h-8 cursor-pointer text-[#5F5F5F]" />

        </div>
            {/* items length */}
            <div className="flex justify-center p-6 absolute top-0 bottom-0">

                <ShoppingBagIcon className="w-6 h-6 text-[#5F5F5F]" />
                <h5 className="pl-2 text-[20px] font-[500]">{getCartProduct.length}items</h5>
            </div>
            {/*    */}
            <br />
            <div className=" w-full  border-t absolute top-20 bottom-0">
                {getCartProduct &&
                    getCartProduct.map((i, index) => {
                        return <Cartsingle key={index} data={i} />;
                    })}
                    <div className="w-full flex flex-col  items-center justify-center absolute bottom-0">
                    <Button
                        onClick={viewhandaler}
                        sx={{
                            marginTop: "45px ",
                            width: "80%",
                        }}
                        variant="contained"
                        color="error"
                    >
                        View Cart
                    </Button>
                    <Button
                        onClick={checkhandaler}
                        sx={{
                            width: "80%",
                            margin: "5px ",
                        }}
                        variant="outlined"
                        color="success"
                    >
                        Checkout
                    </Button>
                </div>
                
            </div>
            
            
            
            </div>
    )
}

export default CartDetails