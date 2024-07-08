import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faIndianRupeeSign, faLocation, faMapMarker, faTruck } from '@fortawesome/free-solid-svg-icons';

function Acnow() {
  const [quantity, setQuantity] = useState(1);
  const [totalFee, setTotalFee] = useState(0);
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchapiData = async () => {
      try {
        const response = await fetch(`http://192.168.1.163:8093/getProducts`);
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        setApiData(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setLoading(false);
      }
    };

    fetchapiData();
  }, []);

  const calculateTotalFee = () => {
    const product = apiData.find(product => product.id === 1); 
    if (product) {
      const productPrice = product.price;
      return productPrice * quantity;
    }
    return 0;
  }

  useEffect(() => {
    setTotalFee(calculateTotalFee());
  }, [quantity, apiData]);

  const handleQuantityChange = (newQuantity) => {
    setQuantity(newQuantity);
  }

  const handleIncrement = () => {
    handleQuantityChange(quantity + 1);
  }

  const handleDecrement = () => {
    if (quantity > 1) {
      handleQuantityChange(quantity - 1);
    } else {
      alert("Are you sure you want to cancel the order?");
    }
  }

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="containernow">
        <div className="col-40">
          <p style={{ paddingLeft: 10 }}>
            <FontAwesomeIcon icon={faTruck} style={{ padding: '0px 10px 0px 0px' }} />
            Estimated Delivery</p>
          <hr />
          {apiData.map(item => (
            <div key={item.id}>
              <div className="col-3">
              <img className='image2' src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} />

              </div>
              <div className="col-4">
                <p>
                {item.ProductName}
                </p>
                <p><FontAwesomeIcon icon={faIndianRupeeSign} />{item.price}</p>
                <p style={{ marginBottom: '10px' }}>Quantity: {quantity}</p>
              </div>
            </div>
          ))}
          <hr />
          <h3>
            <FontAwesomeIcon icon={faMapMarker} style={{ fontSize: 'medium', padding: '15px 10px 0px 10px' }} />
            Delivery Address
          </h3>
        </div>
        <div className="col-30">
          <h3>Price Details</h3>
          <div className="col-5">
            <p className="p" style={{ fontSize: 'larger' }}>Total Price</p>
          </div>
          <div className="col-6">
            <p className="p" style={{ fontSize: 'larger' }}>
              <FontAwesomeIcon icon={faIndianRupeeSign} style={{ fontSize: 'medium' }} />{totalFee}
            </p>
          </div>
          <div className="button4">
            <button className='ba' onClick={handleDecrement}><b>-</b></button>
            <button className='ba'><b>{quantity}</b></button>
            <button className='ba' id="inc" onClick={handleIncrement}><b>+</b></button>
          </div>
          <button className="button5"><b>Continue</b></button>
        </div>
      </div>
    </div>
  )
}

export default Acnow;
