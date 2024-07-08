import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const AcPage = () => {
  const [apiData, setApiData] = useState([]);

  useEffect(() => {
      fetchData();
  }, []);

  async function fetchData() {
      try {
          const response = await fetch('http://192.168.1.163:8093/getProducts');
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setApiData(data);
      } catch (error) {
          console.error('Error fetching data:', error);
      }
  }

  return (
    <>
      <div className="proTitle">
        {/* <h2>Air Condition</h2> */}
      </div>
      <div className="proSection">
        {apiData.map((item) => {
          return (
            <div key={item.id} className="imgBox">
              <Link to='/ac'>
                <div className="pageImg">
                <img className="image2" src={`data:image/jpeg;base64,${item.image_url}`} alt={item.productName} />
              </div>
              </Link>
            </div>
          );
        })}
      </div>
    </>
  );
};

export default AcPage;
