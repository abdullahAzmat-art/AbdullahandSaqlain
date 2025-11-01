// import { Footer, Navbar } from 'flowbite-react'
import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

const Layouts = () => {
  return (
    <div>
        <Navbar/>
       <main className=''> <Outlet/></main>
        <Footer/>
      
    </div>
  )
}

export default Layouts
