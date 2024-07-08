import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import { useCart } from "../context/CartContext";

const Anav = () => {

  const { cartItems } = useCart()

  return (
    <div className="navbar-section">

      <div className="anavSection">
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
      </div>
    </div >
  );
};

export default Anav;
