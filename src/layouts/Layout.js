import React from 'react'

import Footer from './Footer/Footer'
import Navbar2 from './HeADER/Navbar2'
import Header2 from './HeADER/Header2'





const Layout = ({children}) => {
  return (
    <div>
    <div className='mb-40'>
    <Header2/>
    </div>
    
    {children}
   
    <Footer/>
    </div>
  )
}

export default Layout