import React from 'react'

import { useState } from "react";
import { FaCross, FaMinus, FaPlus } from 'react-icons/fa';
import { RxCrossCircled } from 'react-icons/rx';
import { ImCross } from "react-icons/im";

const Cartsingle = ({ data }) => {
    const [items, setItems] = useState(1);
    const totalprice = data.details.price * data.
    quantity
    ;

    return (
        <>
            <div className="border-b p-4  ">
            <div  className="w-full flex items-center">
                    <div className='flex flex-col items-center'>
                        <div
                            onClick={() => setItems(items + 1)}
                            className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        >
                            <FaPlus size={20} color="white" />
                        </div>
                        <span className="">{data.quantity}</span>
                        <div
                            className="bg-[#4b4747]  rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer "
                            onClick={() => setItems(items > 1 ? items - 1 : 1)}
                        >
                            <FaMinus size={20} color="white" />
                        </div>
                    </div>
                    <img
                        className="w-[80px] h-[80px] ml-2"
                        src={data.details.images[0]}
                        alt=""
                    />
                    <div className="mx-3">
                        <h1>{data.details.productName}</h1>
                        <h4 className="font-[400] flex items-center  text-[15px] text-[black]">
                             <span className='mr-3'>${data.details.price}</span><ImCross /> <span className='ml-4'>{data.quantity}{" "}</span>
                        </h4>
                        <h4 className="font-[600] text-[17px] pt-[3px] font-roboto text-[black]">
                            $USD {data.details.price*data.quantity}
                        </h4>
                    </div>
                    <div className="ml-auto cursor-pointer">
                        <RxCrossCircled size={25} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cartsingle