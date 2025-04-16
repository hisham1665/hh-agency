import React from 'react'
import Catogories from '../components/Catogories'
import Product from './Product-page'
import HeroSection from '../components/HeroSection'

function Home() {
 
  return (
    <div>
      <HeroSection/>
        <Catogories  />
        <Product/>
    </div>

  )
}

export default Home