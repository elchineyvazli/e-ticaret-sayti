import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import Preferences from "./pages/Preferences"

import ProductDetail from "./pages/ProductDetail"

import BasketProducts from './pages/BasketProducts'

import NothingPage from "./Error/NothingPage"

import Loading from "./components/Loading"

function App() {

  return (
    <>
      <Navbar />
      <main className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/preferences" element={<Preferences />} />
          <Route path="/product-detail/:id" element={<ProductDetail />} />
          <Route path="/product_basket" element={<BasketProducts />} />
          <Route path="*" element={<NothingPage />} />
        </Routes>
      </main>
      <Loading />
    </>
  )
}

export default App 
