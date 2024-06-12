import React, { useContext, useEffect, useState } from 'react'
import Catslider from '../../Components/catSlider/Catslider'
import Allproduct from '../../Components/Allproduct/Allproduct'
import NewarivalProducts from '../../Components/NewArivalProducts/NewarivalProducts'
import Modal, { MyDialog } from '../../Components/Allproduct/Modal'
import Header2 from '../../layouts/HeADER/Header2'
import Homecontact from '../../Components/Homecontact/Homecontact'
import Banner from '../../Components/Banner/Banner'
import ShoppingBag from '../../Components/Share/ShoppingBag'
import FlotingComponentsMobile from '../../Components/Share/FlotingComponentsMobile'
import SkeletonLoadingForHome from '../../Components/Share/SkeletonLoadingForHome'
import Skeleton from '../../Components/Skeleton/Skeleton'






const Home = () => {
  const [skeletonLoading, setSkeletonLoading] = useState(true)
  useEffect(() => {

    setSkeletonLoading(true);
    // Simulate loading delay
    const timer = setTimeout(() => {
      setSkeletonLoading(false);
    }, 2000); // Adjust the delay as needed
    return () => clearTimeout(timer);
  }, []);

  return (
    <>

     <Banner />

        <Catslider />
        <Allproduct />

        <Modal />
        <NewarivalProducts />
        <Homecontact />
      </>


  

   
  )
}

export default Home
