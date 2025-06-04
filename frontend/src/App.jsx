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
import ProductPage from "./pages/SingleProduct.jsx";
import { getCategories } from "./api/CategoriesApi.js";
import ProductsByCategory from "./pages/ProductsByCategory.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);

  const getProductData = async () => {
    const res = await getProducts();
    setProducts(res.data);
  };
  const getCategoriesData = async () => {
    const res = await getCategories();
    setCategories(res.data);
  };

  useEffect(() => {
    getProductData();
    getCategoriesData();
  }, []);
  return (
    <>
      <Router>
        <CustomNavbar categories={categories} />

        <Routes>
          <Route
            path="/"
            element={<Home products={products} setProducts={setProducts} />}
          />
          <Route
            path="/category/:name"
            element={<ProductsByCategory categories={categories} />}
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
                  categories={categories}
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
          <Route path="/product/:id" element={<ProductPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
