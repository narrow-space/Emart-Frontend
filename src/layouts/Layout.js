import React from 'react'

import Footer from './Footer/Footer'
import Header2 from './HeADER/Header2'
import Header from './HeADER/Header'
import Breadcrumbs from '../Components/ListingPageMain/Breadcrumbs'


const Layout = ({children}) => {
  return (
    <div>
     <Header2 activeheading={1}/>
    
    {children}
   
    <Footer/>
    </div>
  )
}

export default Layout