import React from 'react'
import { IoHomeOutline } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { IoIosHeartEmpty } from "react-icons/io";
import { VscAccount } from "react-icons/vsc";
import { IoBagHandleOutline } from "react-icons/io5";

import "./FlotingComponentsMobile.scss"
const FlotingComponentsMobile = () => {
  return (
    <div className='lg:hidden  relative'>
      <div className='navbar'>
      <div className='flex flex-col'>
              <IoHomeOutline className='' size={30 }/>
              <small className='uppercase'>Home</small>
            </div>
            
            <div className='flex flex-col'>
              <HiBars3 size={30 }/>
              <small className='uppercase'>category</small>
            </div>
            <div className=' flex flex-col relative'>
              <IoIosHeartEmpty size={30 }/>
              <small className='uppercase'>wishlist</small>

              <div className='absolute bottom-4 
              sm:right-[15px]
              md:right-[3.5rem]
              '> 
              <span className='bg-black rounded-full text-white pl-1 pr-1 text-center text-xs'>0</span>
              </div>
            </div>
            <div className=' flex flex-col'>
              <VscAccount size={30 } className=''/>
              <small className='uppercase'>Account</small>
            </div>
            <div className=' flex flex-col relative'>
              <IoBagHandleOutline size={30 }/>
              <small className='uppercase'>cart</small>
              <div className='fixed bottom-4 
              sm:right-[15px]
              md:right-[3.2rem]
              
              
              '> 
              <span className='bg-black rounded-full text-white pl-1 pr-1 text-center text-xs'>0</span>
              </div>
            </div>
      </div>

    </div>
  )
}

export default FlotingComponentsMobile