import React, { useEffect, useState } from 'react'
import { ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa';
import { RxCrossCircled } from "react-icons/rx";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImCross } from 'react-icons/im';

const Viewcart = () => {

  const navigator = useNavigate()
  const { getCartProduct } = useSelector((state) => state.cart)
  console.log(getCartProduct)
 const [price,setPrice]=useState("")
 const total=()=>{
  let totalprice=0
  getCartProduct.map((el,index)=>{
   totalprice= el.details.price*el.quantity+totalprice
  })
  setPrice(totalprice)
  
 }
 useEffect(()=>{
  total()
 },[total])

  const Cartsingle = ({ data }) => {
    const [items, setItems] = useState(1);
    
    const [click, setClcik] = useState(false);
    
   
    const calculateDeliveryDate = () => {
      const currentDate = new Date();
      const deliveryDate = new Date(currentDate.getTime() + 3 * 24 * 60 * 60 * 1000); // Add 3 days in milliseconds
      
      return deliveryDate.toLocaleDateString(); // Convert to a readable date format
    };
  
    return (
      <div className="border-b p-4  webkit">

        <div className="w-full flex items-center">
          <div>
            <div
              onClick={() => setItems(items + 1)}
              className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            >
              <FaPlus size={20} color="white" />

            </div>
            <div className='flex items-center justify-center'>
              <span
                className="">{data.quantity}</span>
            </div>
            <div
              className="bg-[#4b4747]  rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer "
              onClick={() => setItems(items > 1 ? items - 1 : 1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 text-white cursor-pointer"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M19.5 12h-15"
                />
              </svg>
            </div>
          </div>
          <img
            className="w-[80px] h-[80px] ml-2"
            src={data.details.images[0]}
            alt=""
          />
          <div className="ml-2">
            <h1>{data.details.productName}</h1>
            <h4 className="font-[400] flex items-center  text-[15px] text-[black]">
              <span className='mr-3'>${data.details.price}</span><ImCross /> <span className='ml-4'>{data.quantity}{" "}</span>
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] font-roboto text-[black]">
              $USD {data.details.price * data.quantity}
            </h4>
            <div className='flex items-center'>
            <p>Delivery Date: {calculateDeliveryDate()}</p>

            </div>

          </div>

          <div className="ml-auto cursor-pointer  ">
            <RxCrossCircled size={25} />
            <div className='mt-7'>
              {click ? (

                <div
                  className=" tooltip tooltip-accent flex justify-center items-center"
                  data-tip="Remove Wishlist"
                >
                  <FaHeart
                    size={22}
                    onClick={() => setClcik(!click)}
                    className="w-5 "
                    color={click ? "#C62828" : "#C62828"}
                  />
                </div>

              ) : (


                <div
                  className=" tooltip tooltip-accent flex justify-center items-center"
                  data-tip="Add Wishlist"
                >
                  <FaRegHeart
                    size={22}
                    onClick={() => setClcik(!click)}
                    className="w-5 "
                    color={click ? "#C62828" : "#C62828"}
                  />
                </div>

              )}
            </div>
          </div>

        </div>
      </div>

    );
  };



  return (
    <div className='container-fluide'>

      <div className='grid md:grid-cols-6  grid-cols-1 gap-x-10'>

        <div className=' col-span-4  '>
          <div style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

          }} className='p-6 '>
            <h2 className='text-2xl'>Carts({getCartProduct.length})</h2>

            {getCartProduct &&
              getCartProduct.map((i, index) => {
                return <Cartsingle key={index} data={i} />;
              })}
          </div>

        </div>
        <div

          className=' col-span-2'>
          <div style={{
            boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
          }} className='p-6 '>
            <p className='text-lg text-center'>CART TOTALS</p>
            <div className='flex items-center'>
              <p className='text-xl'>Subtotal:</p>

              <p className='ml-auto text-xl'>${price}</p>
            </div>

            <hr className='mt-7' />
            <div className='flex items-center'>
              <p className='text-xl'>Total ammount (including vat)</p>
              <p className='ml-auto text-xl font-bold'>{price}</p>
            </div>
            <div className='flex items-center justify-center mt-12'>
              <Button onClick={() => navigator("/viewcart/checkout")} variant='contained' color='error'>Procced to Checkout</Button>
            </div>
          </div>
        </div>


      </div>

    </div>
  )
}

export default Viewcart