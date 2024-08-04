import React from "react";
import { furnitureData } from "../data/furniture";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";

const FurnitureSingle = () => {
  const { id } = useParams();

  const { addToCart, cartItems } = useCart()

  const product = furnitureData.find((item) => item.id === id);

  return (
    <>
      <Navbar />
      <div className="ind-section">
        <div className="ind-image">
          <img src={product.image} alt="" />
        </div>
        <div className="ind-details space">
          <div className="ind-company">
            <h2>{product.company}</h2>
          </div>
          <div className="ind-model space">
            <h3>{product.model}</h3>
          </div>
          <div className="ind-price space">
            <h2>
            <FontAwesomeIcon icon={faInr} />
            {product.price}</h2>
          </div>
          <div className="ind-desc space">
            <p>{product.description}</p>
          </div>
          <button onClick={() => addToCart(product)}>Add to Cart</button><br />
          <button onClick={() => addToCart(product)}>Buy Now</button>
        </div>
      </div>
    </>
  );
};

export default FurnitureSingle;
