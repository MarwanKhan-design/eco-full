import React from "react";
import HeroSection from "../components/Hero";
import Products from "../components/Products";

const Home = ({ products, setProducts, cartItems, setCartItems }) => {
  return (
    <>
      <HeroSection heading={"Home Page"} subHeading={"Discount of 50%"} />
      <Products
        products={products}
        setProducts={setProducts}
        cartItems={cartItems}
        setCartItems={setCartItems}
      />
    </>
  );
};

export default Home;
