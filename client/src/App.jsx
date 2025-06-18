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
import Cart from "./pages/Cart.jsx";
import CreateOrder from "./pages/CreateOrder.jsx";
import { getCart } from "./api/cart.js";
import AdminOrders from "./pages/AdminOrders.jsx";
import SingleOrder from "./pages/SingleOrder.jsx";

function App() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [cartItems, setCartItems] = useState([]);

  const getCartItems = async () => {
    const res = await getCart();
    if (res.status === 200) {
      setCartItems(res.data);
    } else {
      console.log(res.error);
    }
  };

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
    getCartItems();
  }, []);
  return (
    <>
      <Router>
        <CustomNavbar categories={categories} />

        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={products}
                setProducts={setProducts}
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <Cart
                products={products}
                setProducts={setProducts}
                cartItems={cartItems}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/category/:name"
            element={
              <ProductsByCategory
                categories={categories}
                setCartItems={setCartItems}
                cartItems={cartItems}
              />
            }
          />
          <Route
            path="/all/orders"
            element={<AdminOrders categories={categories} />}
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
            path="/order/:id"
            element={
              <ProtectedRoute>
                <SingleOrder />
              </ProtectedRoute>
            }
          />
          <Route
            path="/order"
            element={
              <ProtectedRoute>
                <CreateOrder
                  products={products}
                  setProducts={setProducts}
                  cartItems={cartItems}
                  setCartItems={setCartItems}
                />
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
            element={
              <Login
                products={products}
                setProducts={setProducts}
                setCartItems={setCartItems}
              />
            }
          />
          <Route
            path="/register"
            element={<Register products={products} setProducts={setProducts} />}
          />
          <Route
            path="/product/:id"
            element={
              <ProductPage cartItems={cartItems} setCartItems={setCartItems} />
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
