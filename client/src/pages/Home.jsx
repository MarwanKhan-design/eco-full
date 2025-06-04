import React from "react";
import HeroSection from "../components/Hero";
import Products from "../components/Products";

const Home = ({ products, setProducts }) => {
  return (
    <>
      <HeroSection />
      <Products products={products} setProducts={setProducts} />
    </>
  );
};

export default Home;
