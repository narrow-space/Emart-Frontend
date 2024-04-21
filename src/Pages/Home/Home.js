import React, { useEffect } from 'react'
import Catslider from '../../Components/catSlider/Catslider'
import Allproduct from '../../Components/Allproduct/Allproduct'
import NewarivalProducts from '../../Components/NewArivalProducts/NewarivalProducts'
import Modal, { MyDialog } from '../../Components/Allproduct/Modal'
import Header2 from '../../layouts/HeADER/Header2'
import Homecontact from '../../Components/Homecontact/Homecontact'
import Banner from '../../Components/Banner/Banner'
import { FaBagShopping } from 'react-icons/fa6'



const Home = () => {
 

  return (
    <>
       
      <Banner/>
    <Catslider/> 
    <Allproduct/>
   
     <Modal/>
     <NewarivalProducts/>
    <Homecontact/>
   
    </>
  )
}

export default Home
