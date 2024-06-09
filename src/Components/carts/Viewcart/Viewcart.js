import React, { useEffect, useState } from 'react'
import { ArrowDownCircleIcon, ArrowPathIcon, TrashIcon } from '@heroicons/react/24/outline';
import { FaHeart, FaPlus, FaRegHeart } from 'react-icons/fa';
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import { Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ImCross } from 'react-icons/im';
import { BsArrowBarRight, BsFillCartXFill } from 'react-icons/bs';

const Viewcart = () => {

  const navigator = useNavigate()
  const { getCartProduct } = useSelector((state) => state.cart)

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
            className="w-[80px] h-[80px] ml-2"
            src={data.details.images[0]}
            alt=""
          />
          <div className="mx-3 text-xs">
            <h1>{data.details.productName.length > 20 ? data.details.productName.substring(0, 50) : data.details.productName}</h1>

            <h4 className="font-[400] flex items-center  text-[black]">
              <span className='mr-3'>${data.details.price}</span> <span className='font-[200]'><RxCross1 /></span> <span className='ml-1'>{data.quantity}{" "}</span>
            </h4>
            <h4 className="  pt-[3px] font-roboto text-[black]">
              $USD {data.details.price * data.quantity}
            </h4>
          </div>
          <div className="ml-auto cursor-pointer">
            <RxCrossCircled size={15} />
          </div>
        </div>

      </div>

    );
  };



  return (
    <div className='container-fluide '>
      {
        getCartProduct.length > 0 ?
          <div className='grid  md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-1    xl:grid-cols-2'>

            <div className=''>
              <div style={{
                boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",

              }} className='p-6 '>
                <h2 className='text-2xl'>Shopping Carts({getCartProduct.length})</h2>

                {getCartProduct &&
                  getCartProduct.map((i, index) => {
                    return <Cartsingle key={index} data={i} />;
                  })}
              </div>
             

            </div>

            <div style={{
                  boxShadow: "rgba(100, 100, 111, 0.2) 0px 7px 29px 0px",
                }} className='p-6 '>
                  <p className='text-lg text-center'>CART TOTALS</p>
                  <div className='flex items-center'>
                    <p className='text-sm'>Subtotal:</p>

                    <p className='ml-auto text-sm'>$ {price}</p>
                  </div>

                  <hr className='mt-7' />
                  <div className='flex items-center'>
                    <p className='text-sm'>Total ammount (including vat)</p>
                    <p className='ml-auto text-sm '>$ {price}</p>
                  </div>
                  <div className='flex items-center justify-center mt-12'>

                    <div
                      onClick={() => navigator("/viewcart/checkout")} className='text-white bg-black p-3 text-center text-sm mt-3 uppercase cursor-pointer flex justify-center items-center w-auto'>
                        <BsArrowBarRight size={25}/>
                       <span> Procced to Checkout</span>
                    </div>



                  </div>
                </div>

          </div> : <div className=' flex flex-col justify-center items-center mt-9'>


            <BsFillCartXFill className='opacity-[0.2]' size={130} />
            <p className='font-[700]'>No products in the cart</p>
          </div>
      }



    </div>
  )
}

export default Viewcart





