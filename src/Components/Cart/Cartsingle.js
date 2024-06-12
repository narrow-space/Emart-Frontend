import React from 'react'

import { useState } from "react";
import { FaCross, FaMinus, FaPlus } from 'react-icons/fa';
import { RxCross1, RxCrossCircled } from 'react-icons/rx';
import { ImCross } from "react-icons/im";
import { useDispatch } from 'react-redux';
import { deleteCart,getCart,deletefulquantityCart } from '../../redux/Slice/cartSlice/cartSlice';






const Cartsingle = ({ data }) => {
  
    const [items, setItems] = useState(1);
     const dispatch=useDispatch()

     const deleteSingleCartHandler=(id)=>{
          const data={
            productid:id
          }

        dispatch(deletefulquantityCart(data))
        .then((res)=>{
            console.log(res)
            dispatch(getCart())
        })
     } 

      console.log(data)
    

    return (
        <>
            <div className="border-b p-4  ">
            <div  className="w-full flex items-center">
                    <div className='flex flex-grow-1 items-center border'>
                       <div 
                       onClick={() => setItems(items + 1)}
                       className='border-r-2 p-[.3rem] cursor-pointer'>+</div>
                       <div className='border-r-2 p-[.3rem]'>{data.quantity}</div>
                       <div 
                       onClick={() => setItems(items > 1 ? items - 1 : 1)}
                       className='border-r-2 p-[.3rem] cursor-pointer'>-</div>
                    </div>
                    <img
                        className="w-[50px] h-[50px] ml-2"
                        src={data.details.images[0]}
                        alt=""
                    />
                    <div className="mx-3 text-xs">
                        <h1>{data.details.productName.length > 20?data.details.productName.substring(0, 50):data.details.productName }</h1>
                       
                        <h4 className="font-[400] flex items-center  text-[black]">
                             <span className='mr-3'>${data.details.price}</span> <span className='font-[200]'><RxCross1 /></span> <span className='ml-1'>{data.quantity}{" "}</span>
                        </h4>
                        <h4 className="  pt-[3px] font-roboto text-[black]">
                            $USD {data.details.price*data.quantity}
                        </h4>
                    </div>
                    <div className="ml-auto cursor-pointer">
                        <RxCrossCircled onClick={()=>deleteSingleCartHandler(data.productid)} size={15} />
                    </div>
                </div>
            </div>
        </>
    );
};
export default Cartsingle

// 
{/* <div
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
</div>  */}

// 