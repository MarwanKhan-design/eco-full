import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CustomNavbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "./api/ProductApi";
import CreateProductForm from "./pages/CreateProduct";

function App() {
  const [products, setProducts] = useState([]);

  const getProductData = async () => {
    const res = await getProducts();
    console.log(res.data);
    setProducts(res.data);
  };

  useEffect(() => {
    getProductData();
  }, []);
  return (
    <>
      <Router>
        <CustomNavbar />

        <Routes>
          <Route
            path="/"
            element={<Home products={products} setProducts={setProducts} />}
          />
          <Route
            path="/admin"
            element={<Admin products={products} setProducts={setProducts} />}
          />
          <Route
            path="/create/product"
            element={
              <CreateProductForm
                products={products}
                setProducts={setProducts}
              />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
