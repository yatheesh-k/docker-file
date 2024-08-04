import React, { useState } from 'react';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowCircleLeft, faBars, faBell, faCaretRight, faLocationDot, faMessage, faPhone, faSearch, faShoppingBag, faSmile, faUser, faUsers } from '@fortawesome/free-solid-svg-icons';
import Anav from './Anav';

const Admin = () => {
    const [activeItem, setActiveItem] = useState('Dashboard');

    const handleItemClick = (itemName) => {
        setActiveItem(itemName);
    };

    return (
        <div>
            <Anav />
            <section className="sidebar">
                <a href="#" className="brand">
                    <img src="/logo.png" alt="Arzooo" />
                </a>
                <ul className="side-menu top">
                    <li className={activeItem === 'Dashboard' ? 'active' : ''}>
                        <Link to="#" onClick={() => handleItemClick('Dashboard')}>
                            <FontAwesomeIcon icon={faSmile} className='fa' />
                            <span className="text">Dashboard</span>
                        </Link>
                    </li>
                    <li className={activeItem === 'My Store' ? 'active' : ''}>
                        <Link to="#" onClick={() => handleItemClick('My Store')}>
                            <FontAwesomeIcon icon={faShoppingBag} className='fa' />
                            <span className="text">My Store</span>
                        </Link>
                    </li>
                    <li className={activeItem === 'Add Products' ? 'active' : ''}>
                        <Link to="#" onClick={() => handleItemClick('Add Products')}>
                            <FontAwesomeIcon icon={faMessage} className='fa' />
                            <span className="text">Add Products</span>
                        </Link>
                    </li>
                    <li className={activeItem === 'Users' ? 'active' : ''}>
                        <Link to="#" onClick={() => handleItemClick('Users')}>
                            <FontAwesomeIcon icon={faUsers} className='fa' />
                            <span className="text">Users</span>
                        </Link>
                    </li>
                    <li className={activeItem === 'Logout' ? 'active' : ''}>
                        <Link to="#" className='logout' onClick={() => handleItemClick('Logout')}>
                            <FontAwesomeIcon icon={faArrowCircleLeft} className='fa' />
                            <span className="text">Logout</span>
                        </Link>
                    </li>
                </ul>
            </section>
        </div>
    );
};

export default Admin;
