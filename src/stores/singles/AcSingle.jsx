import React, { useState, useEffect } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInr } from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../context/CartContext";
import Footer from "../components/Footer";

const AcSingle = () => {
  const { id } = useParams();
  const [apiData, setApiData] = useState([]);
  const { addToCart } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (location && location.state && location.state.productId) {
        fetch(`http://192.168.1.163:8093/getProducts/${location.state.productId}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                return response.json();
            })
            .then((productData) => {
                setApiData([productData]); 
            })
            .catch((error) => console.error(error));
    }
}, [location.state]);

  return (
    <>
      <Navbar />
      <div className="body1">
        <div className="ind-section">
          {apiData.map(item => (
            <div key={item.productId}>
              <div className="ind-image">
                <img className="image2" src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} />
              </div>

              <div className="ind-details space">
                <div className="ind-company">
                  <h2>{item.productName}</h2>
                </div>
                <div className="ind-model space">
                  <h3>{item.description}</h3>
                </div>
                <div className="ind-price space">
                  <h2>
                    <FontAwesomeIcon icon={faInr} />
                    {item.price}
                  </h2>
                </div>
                <button onClick={() => addToCart(item)}>Add to Cart</button>
                <br />
                <Link to="/acnow">
                  <button>Buy Now</button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default AcSingle;
