import React from 'react'
import "./Checkout.scss"
import logo from"../../../assest/Purple-Rose.webp"
import { Button } from '@mui/material'
const Checkout = () => {
  return (
    <div className='container'>
      <div className='grid md:grid-cols-2 grid-cols-1 gap-3'>
        {/* Shipping Details */}
    <div className=' h-auto '>
     
    <div className='shipping-details bg-[#f6f6f8]'>
     <p>Shipping Details</p>
    <p>Address: <span>21/gulshan avenue,middle,badda</span> </p>
    <p>City: <span>Dhaka</span> </p>
    <p>State: <span>dhaka</span> </p>
    <p>Country: <span>Bangladesh</span></p>
    <p>ZipCode: <span>3700</span></p>
    <p>Mobile: <span>01647153126</span></p>
    <p>ShippingPrice:- <span>$12</span></p>
    <p>TotalPrice: <span>$1200</span></p>
    </div>
    </div> 
    {/* Shipping Cost + product Cost */}
    <div className='bg-[#f6f6f8]'>
    <h1 className='font-bold text-[20px] p-3'>Your Orders</h1>
     <div className='Order-details'>
    
      <div className='order_detail'>
        <img src={logo} alt="" />
        <div className='order-des'>
          <h1>Purpel T shirt</h1>
          <p>discount:- <span>15%</span> </p>
          <p>price:- <span>$12</span> </p>
          <p>Delevery-Date:- <span>12/05/2023</span> </p>
          <p>Total:- <span>$12</span></p>
        </div>
      </div>
     </div>
     <div className='Order-details'>
    
      <div className='order_detail'>
        <img src={logo} alt="" />
        <div className='order-des'>
          <h1>Purpel T shirt</h1>
          <p>discount:- <span>15%</span> </p>
          <p>price:- <span>$12</span> </p>
          <p>Delevery-Date:- <span>12/05/2023</span> </p>
          <p>Total:- <span>$12</span></p>
        </div>
      </div>
     </div>
     <div className='Order-details'>
    
      <div className='order_detail'>
        <img src={logo} alt="" />
        <div className='order-des'>
          <h1>Purpel T shirt</h1>
          <p>discount:- <span>15%</span> </p>
          <p>price:- <span>$12</span> </p>
          <p>Delevery-Date:- <span>12/05/2023</span> </p>
          <p>Total:- <span>$12</span></p>
        </div>
      </div>
     </div>
     <div className='flex flex-1 items-center justify-center'>
     <Button sx={{
        margin:2,
        width:"60%",
        background:"#4D2DB7"
      
      }} variant='contained'  >Payment</Button>
     </div>
    </div>
    </div>
    </div>
  )
}

export default Checkout