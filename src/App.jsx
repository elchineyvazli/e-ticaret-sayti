import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"

import Home from "./pages/Home"
import About from "./pages/About"
import Preferences from "./pages/Preferences"

import Services from "./pages/Services"
import ServicesDetail from "./pages/ServicesDetail"
import ProductList from "./pages/ProductList"
import ProductDetail from "./pages/ProductDetail"

import Students from "./subPages/Students"
import Staffs from "./subPages/Staffs"


import NothingPage from "./Error/NothingPage"

import Loading from "./components/Loading"

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />}>
          <Route path="students" element={<Students />}></Route>
          <Route path="staffs" element={<Staffs />}></Route>
        </Route>
        <Route path="/preferences" element={<Preferences />} />
        <Route path="/services" element={<Services />} />
        <Route path="/services-detail/:id" element={<ServicesDetail />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/products-detail/:id" element={<ProductDetail />} />
        <Route path="*" element={<NothingPage />} />
      </Routes>
      <Loading />
    </>
  )
}

export default App 
