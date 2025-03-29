import { Route, Routes } from "react-router"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import About from "./pages/About"
import Preferences from "./pages/Preferences"
import Services from "./pages/Services"
import NothingPage from "./Error/NothingPage"
import Students from "./subPages/Students"
import Staffs from "./subPages/Staffs"
import ServicesDetail from "./pages/ServicesDetail"
import BasketPage from "./pages/BasketPage"

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
        <Route path="/basket" element={<BasketPage />} />
        <Route path="*" element={<NothingPage />} />
      </Routes>
    </>
  )
}

export default App 
