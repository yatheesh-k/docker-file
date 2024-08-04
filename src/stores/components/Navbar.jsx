import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { cartItems } = useCart();
  const [apiData, setApiData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    fetch('http://192.168.1.163:8093/getCategories')
      .then(response => response.json())
      .then(data => setApiData(data))
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className="navbar-section">
      <div className="navSection">
        <Link to='/' className="custom-link">
          <div className="title">
            <img src="/logo.png" alt="Arzooo" />
          </div>
        </Link>

        <div className="search">
          <input type="text" placeholder="Search..." />
          <button type="submit" className="search-btn">
            <FontAwesomeIcon icon={faSearch} className="find" />
          </button>
        </div>
        <div className="user">
          <div className="user-detail">
            <div className="dropdown">
              <div className="dropdownbtn">
                <FontAwesomeIcon icon={faUser} style={{ fontSize: 25 }} />
              </div>
              <div className="dropdown-content">
                <a href="#" >My Profile</a>
                <a href="#">Orders</a>
                <a href="/">Logout</a>
              </div>
            </div>
          </div>
        </div>
        <Link to='/cart'>
          <div className="cart">
            <FontAwesomeIcon icon={faShoppingCart} style={{ fontSize: 25 }} />
            <span className="num">
              {cartItems.length}
            </span>
          </div>
        </Link>
      </div>
      <div className="subMenu">
        <ul>
          {apiData.map(item => (
            <li key={item.categoryId}>
              <div className="dropdown">
                <div className="dropdownbtn" onClick={() => handleCategoryClick(item)}>
                  {item.categoryName}
                </div>
                <div className="dropdown-content">
                  {selectedCategory && selectedCategory.categoryId === item.categoryId && (
                    item.subCategories.map(subCategory => (
                      <Link key={subCategory.subCategoryId} to={subCategory.link} className="custom-link">
                        <div>{subCategory.subCategoryName}</div>
                      </Link>
                    ))
                  )}
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
