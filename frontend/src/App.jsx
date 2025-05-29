import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import CustomNavbar from "./components/Navbar";
import { useEffect, useState } from "react";
import { getProducts } from "./api/ProductApi";
import CreateProductForm from "./pages/CreateProduct";
import { ProtectedRoute } from "./util/protectedRoute.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";

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
            element={
              <ProtectedRoute>
                <Admin products={products} setProducts={setProducts} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create/product"
            element={
              <ProtectedRoute>
                <CreateProductForm
                  products={products}
                  setProducts={setProducts}
                />
              </ProtectedRoute>
            }
          />
          <Route
            path="/login"
            element={<Login products={products} setProducts={setProducts} />}
          />
          <Route
            path="/register"
            element={<Register products={products} setProducts={setProducts} />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
