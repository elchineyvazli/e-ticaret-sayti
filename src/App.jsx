import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Preferences from "./pages/About"

import BasketProducts from './pages/BasketProducts'

import NothingPage from "./Error/NothingPage"

import Loading from "./components/Loading"
import About from "./pages/About"
import Contact from "./pages/Contact"

function App() {

  return (
    <>
      <Navbar />
      <main id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/haqqimizda" element={<About />} />
          <Route path="/elaqe" element={<Contact />} />
          <Route path="/product_basket" element={<BasketProducts />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>
      <Loading />
    </>
  )
}

export default App 
