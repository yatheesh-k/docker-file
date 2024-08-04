import React from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretRight, faLocationDot, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faFacebook, faLinkedin, faTwitter, faInstagram, faXTwitter } from '@fortawesome/free-brands-svg-icons';
import "../../../src/App.css"

function Footer() {
  return (
    <footer className="foot">
      <div className="col-20">
        <img src="/logo.png" alt="Arzooo" />
        <p>Arzooo is India's largest and fastest-growing retail tech start-up organizing the highly fragmented
          physical retail and digitalizing them. It is a B2B platform that helps small retail stores to compete
          against retail giants.</p>
      </div>
      <div className="col-20">
        <h1>Our Products</h1>
        <Link to="/mobiles">
          <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />Mobiles</p>
        </Link>
        <Link to="/computers">
          <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />Computers</p>
        </Link>
        <Link to="/fridge">
          <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />Fridges</p>
        </Link>
        <Link to="/tv">
          <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />Tv</p>
        </Link>
        <Link to="/ac">
          <p className="prodf"><FontAwesomeIcon icon={faCaretRight} style={{ paddingRight: 20 }} />AC</p>
        </Link>
       
      </div>
      <div className="col-20">
        <h1>Address</h1>
        <div style={{paddingRight:80}}>
        <p><FontAwesomeIcon icon={faLocationDot} style={{ paddingRight: 10 }} />96/1, Srinivasa Nagar, AECS Layout,
          Singasandra, Bengaluru, Karnataka 560068</p>
        <p><FontAwesomeIcon icon={faPhone} style={{ paddingRight: 10 }} />99710 94095</p>
        <FontAwesomeIcon icon={faFacebook} className="contact" />
        <FontAwesomeIcon icon={faLinkedin} className="contact" />
        <FontAwesomeIcon icon={faXTwitter} className="contact" />
        <FontAwesomeIcon icon={faInstagram} className="contact" />
        </div>
      </div>
    </footer>
  );
}

export default Footer;
