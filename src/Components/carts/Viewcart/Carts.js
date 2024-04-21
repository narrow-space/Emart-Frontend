import React, { useContext, useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { TrashIcon} from "@heroicons/react/24/outline";
import { CartopenContex } from "../../../Contexapi/Cartopencontex";
import { Button } from "@mui/material";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { RxCross1, RxCrossCircled } from "react-icons/rx";
import './Carts.scss'

const Carts = () => {
  const navigation=useNavigate()
  const { cartopen,setCartopen,cartRef } = useContext(CartopenContex);

  const cartData = [
    {
      name: "Iphone 11 256 gb 8 gb ram duel sim 5.5 inche ips diplay",
      description: "test",
      price: "999",
    },
    {
      name: "Iphone 12",
      description: "test",
      price: "999",
    },
    {
      name: "Iphone 13",
      description: "test",
      price: "999",
    },
    {
      name: "Iphone 14",
      description: "test",
      price: "999",
    },
  ];
  const viewhandaler=()=>{
    window.scrollTo(0,0)
    navigation('/viewcart')
    setCartopen(false)
  }
  const checkhandaler=()=>{
    window.scrollTo(0,0)
    navigation('/viewcart/checkout')
    setCartopen(false)
  }

   const Cartsingle = ({ data }) => {
    const [items, setItems] = useState(1);
    const totalprice = data.price * items;

    return (
      <div className="border-b p-4 webkit ">
        <div  className="w-full flex items-center">
          <div>
            <div
              onClick={() => setItems(items + 1)}
              className="bg-[#e44343] border border-[#e4434373] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
            >
              <FaPlus size={20} color="white" />
            </div>
            <span className="pl-[10px]">{items}</span>
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
            src="https://www.incredible.co.za/media/catalog/product/cache/7ce9addd40d23ee411c2cc726ad5e7ed/1/9/194252097076_08d6.jpg"
            alt=""
          />
          <div className="">
            <h1>{data.name}</h1>
            <h4 className="font-[400] text-[15px] text-[#00000082]">
              ${data.price}* {items}{" "}
            </h4>
            <h4 className="font-[600] text-[17px] pt-[3px] font-roboto text-[#ff3333]">
              $USD{totalprice}
            </h4>
          </div>
          <div className="ml-auto cursor-pointer">
          <RxCrossCircled size={25}/>
          </div>
         
        </div>
      
      </div>
    );
  };

  return (
    <div    className="fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-50 ">
      
      <div  ref={cartRef}   className={`${cartopen?"translate-x-0":"translate-x-full"}  ease-in-out duration-1000 fixed  md:z-0 md:top-0 right-0 min-h-full md:w-[27%] w-[78%]  bg-white flex flex-col justify-between shadow-sm  `}>
        <div  className="flex w-full justify-end pt-5 pr-5">
          <svg
            onClick={()=>setCartopen(false)}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6 cursor-pointer"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        {/* items length */}
        <div className="flex justify-center p-6 absolute top-0 bottom-0">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
            />
          </svg>
          <h5 className="pl-2 text-[20px] font-[500]">4 items</h5>
        </div>
        {/*    */}
        <br />
        
        <div className=" w-full  border-t absolute top-20 bottom-0">
          {cartData &&
            cartData.map((i, index) => {
              return <Cartsingle key={index} data={i} />;
            })}
             
        </div>
        <div className="w-full flex flex-col pb-3 items-center justify-center">
       <Button 
        onClick={viewhandaler}
       sx={{
        margin:"5px ",
        width:"80%"
       }} variant="contained" color="error">View Cart</Button>
       <Button 
       onClick={checkhandaler}
       sx={{
        width:"80%",
        margin:"5px "
       }}
       variant="outlined" color="success">Checkout</Button>
        </div>
      
   
      </div>
     
      
    </div>
  );
};

export default Carts;
