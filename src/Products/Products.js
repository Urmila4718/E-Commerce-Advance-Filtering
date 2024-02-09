import "./Product.css";
import React  from 'react';

const Products = ({ result }) => {
  console.log(result);
  return (
    <>
      <section className="card-container">{result}</section>
    </>
  );
};

export default Products;
