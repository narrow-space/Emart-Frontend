import React from 'react'

import Footer from './Footer/Footer'
import Header2 from './HeADER/Header2'
import Header from './HeADER/Header'
import Breadcrumbs from '../Components/ListingPageMain/Breadcrumbs'
import Navbar2 from './HeADER/Header'



const Layout = ({children}) => {
  return (
    <div>
    <div className='mb-40'>
    <Navbar2/>
    </div>
    
    {children}
   
    <Footer/>
    </div>
  )
}

export default Layout