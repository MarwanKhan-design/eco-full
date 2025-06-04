import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProductsByCategory } from "../api/ProductApi";
import ProductCardTwo from "../components/ProductCardTwo";
import { Col, Container, Row } from "react-bootstrap";

const ProductsByCategory = () => {
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
  return (
    <Container className="mt-4">
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.id} xs={12} sm={6} md={4} lg={3}>
            <ProductCardTwo product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ProductsByCategory;
