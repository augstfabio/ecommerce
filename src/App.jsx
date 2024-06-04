import { BrowserRouter, Routes, Route } from 'react-router-dom'

import './App.css'
import Home from './pages/Home'
import Clothes from './pages/Clothes'
import Electronics from './pages/Electronics'
import Jewelery from './pages/Jewelery'
import About from './pages/About'
import Contact from './pages/Contact'
import Product from './pages/Product'


import NavBar from './components/NavBar'
import Footer from './components/Footer'
import Results from './pages/Results'
import Bag from './pages/Bag'

import { CartProvider } from './context/ItemsContext'


function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <CartProvider>
            <NavBar />
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/clothes' element={<Clothes />} />
              <Route path='/electronics' element={<Electronics />} />
              <Route path='/jewelery' element={<Jewelery />} />
              <Route path='/about' element={<About />} />
              <Route path='/contact' element={<Contact />} />
              <Route path='/product/:id' element={<Product />} />
              <Route path='/results' element={<Results />} />
              <Route path='/bag' element={<Bag />} />
  
            </Routes>
            <Footer />
        </CartProvider>
      </BrowserRouter>
    </div>
  )
}

export default App
