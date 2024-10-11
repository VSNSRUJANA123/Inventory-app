import Home from "./components/Home.js";
import Navbar from "./components/Navbar.js";
import NotFound from "./components/NotFound.js";
import Order from "./components/Order.js";
import Product from "./components/Product.js";
import Supplier from "./components/Supplier.js";
import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/supplier" element={<Supplier />} />
        <Route path="/product" element={<Product />} />
        <Route path="/order" element={<Order />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
