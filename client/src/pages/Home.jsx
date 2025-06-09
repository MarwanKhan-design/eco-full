import React from "react";
import HeroSection from "../components/Hero";
import Products from "../components/Products";

const Home = ({ products, setProducts }) => {
  return (
    <>
      <HeroSection heading={"Home Page"} subHeading={"Discount of 50%"} />
      <Products products={products} setProducts={setProducts} />
    </>
  );
};

export default Home;
