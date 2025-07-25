import React from 'react'
import { ScrollTrigger, SplitText } from 'gsap/all';
import gsap from 'gsap';
import Navbar from './components/navbar';
import Hero from './components/Hero';
import Art from './components/Art';
import Cocktail from './components/Cocktail';

gsap.registerPlugin(ScrollTrigger, SplitText);

const App = () => {
  return (
    <main>
      <Navbar />
      <Hero />
      <Cocktail />
      <Art />
    </main>
  )
}

export default App