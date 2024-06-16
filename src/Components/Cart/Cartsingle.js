import React, { useState, useEffect } from 'react';
import { RxCross1, RxCrossCircled } from 'react-icons/rx';
import { useDispatch, useSelector } from 'react-redux';
import { addtoCart, deleteCart, getCart } from '../../redux/Slice/cartSlice/cartSlice';
import Loading from '../Share/Loading';

const Cartsingle = ({ data, deleteSingleCartHandler }) => {
 

    const dispatch = useDispatch();
    (data)
    const handleAddtoCart = (id, quantity) => {
        const requestData = {
            productid: id,
            quantity: quantity
        };
        dispatch(addtoCart(requestData))
            .then((res) => {
                if (res.payload) {

                    dispatch(getCart())
                }
            })
            .catch((error) => {
                (error);
            });
    };

    const handleremovetoCart = (id) => {
        const requestData = {
            productid: id,
        };
        dispatch(deleteCart(requestData))
            .then((res) => {
                if (res.payload) {
                    // setCount(count - 1);
                    dispatch(getCart())
                }
            })
            .catch((error) => {
                (error);
            });
    };

    const increase = (id, quantity) => {
        handleAddtoCart(id, quantity);
    };

    const decrease = (id) => {
        handleremovetoCart(id);
    };

   




    return (
        <div className="border-b-2 p-4">
            <div className="w-full flex items-center">
                <div className="flex h-[40px]">
                    <button
                        onClick={() => decrease(data.productid)}
                        className={`border p-[.5rem] cursor-pointer ${data.quantity === 1
                            ? "bg-[#FAFAFA] cursor-not-allowed"
                            : "bg-[#DADADA]"
                            }`}
                    >
                        -
                    </button>
                    <div className="border p-[.5rem]">{data.quantity}</div>
                    <button
                        disabled={data.quantity === 5}
                        onClick={() => increase(data.productid, 1)}
                        className={`border p-[.5rem] cursor-pointer ${data.quantity === 5
                            ? "bg-[#FAFAFA] cursor-not-allowed"
                            : "bg-[#DADADA]"
                            }`}
                    >
                        +
                    </button>
                </div>
                <img className="w-[50px] h-[50px] ml-2" src={data.details.images[0]} alt="" />
                <div className="mx-3 text-xs">
                    <h1>{data.details.productName.length > 20 ? data.details.productName.substring(0, 50) : data.details.productName}</h1>
                    <h4 className="font-[400] flex items-center text-[black]">
                        <span className='mr-3'>${data.details.price}</span> <span className='font-[200]'><RxCross1 /></span> <span className='ml-1'>{data.quantity}{" "}</span>
                    </h4>
                    <h4 className="pt-[3px] font-roboto text-[black]">
                        $USD {data.details.price * data.quantity}
                    </h4>
                </div>
                <div className="ml-auto cursor-pointer">
                    <RxCrossCircled onClick={() => deleteSingleCartHandler(data.productid)} size={20} />
                </div>
            </div>
        </div>
    );
};

export default Cartsingle;
