import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/ProductApi";
import ProductCardTwo from "../components/ProductCardTwo";
import { Col, Container, Row } from "react-bootstrap";
import { postProductToCart } from "../api/cart";
import HeroSection from "../components/Hero";

const ProductsByCategory = ({ setCartItems, cartItems }) => {
  const { name } = useParams();
  const [products, setProducts] = useState([]);

  const getProductsOfCategory = async () => {
    const res = await getProductsByCategory(name);
    setProducts(res.data);
  };

  useEffect(() => {
    getProductsOfCategory();
    console.log(products);
  }, [name]);
  const handleAddToCart = async (productId) => {
    const res = await postProductToCart(productId, 1);
    if (res.status === 200) {
      setCartItems(res.data);
    }
    console.log(res.data);
  };
  const checkProductInCart = (productId) => {
    const product = cartItems.find((item) => productId === item.product._id);
    console.log("Check Product in Cart", product, productId);
    return product ? true : false;
  };
  return (
    <>
      <HeroSection heading={name} />
      <Container className="mt-4">
        <Row className="g-4">
          {products.map((product) => (
            <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
              <ProductCardTwo
                product={product}
                handleAddToCart={handleAddToCart}
                checkProductInCart={checkProductInCart}
              />
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
};

export default ProductsByCategory;
