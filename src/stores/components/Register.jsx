import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../../src/App.css';

export default function Register() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userName, setUserName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [address, setAddress] = useState('');
    const [role, setRole] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUserNameChange = (event) => {
        setUserName(event.target.value);
    };

    const handlePhoneNoChange = (event) => {
        setPhoneNo(event.target.value);
    };

    const handleAddressChange = (event) => {
        setAddress(event.target.value);
    };

    const handleRoleChange = (event) => {
        setRole(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://192.168.1.163:8093/admin/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password, userName, role, address, phoneNo }),
            });

            if (!response.ok) {
                throw new Error('Registration failed');
            }

            navigate('/');
            console.log('Registration successful');
        } catch (error) {
            console.error('Registration error:', error.message);
            setError('Registration failed');
        }
    };

    return (
        <div className="container20">
            <h1 className='para'>Register</h1>
            <form onSubmit={handleSubmit} className='reg'>
                <div className='col'>
                    <label>User Name *</label>
                    <input type="text" className='box' placeholder="Enter your User Name" required value={userName} onChange={handleUserNameChange} />
                    <label>Mail Id *</label>
                    <input type="email" className='box' placeholder="Enter your Mail Id" required value={email} onChange={handleEmailChange} />
                    <label>Password *</label>
                    <div className="password-input">
                        <input type={showPassword ? "text" : "password"} className='box' placeholder="Enter Your Password" required value={password} onChange={handlePasswordChange} />
                        <FontAwesomeIcon className='fas1' icon={showPassword ? faEye : faEyeSlash} onClick={togglePasswordVisibility} style={{ cursor: "pointer" }} />
                    </div>
                </div>
                <div className='col'>
                    <label>Role *</label>
                    <input type="text" className='box' placeholder="Enter your Role" required value={role} onChange={handleRoleChange} />
                    <label>Address *</label>
                    <input type="text" className='box' placeholder="Enter your Address" required value={address} onChange={handleAddressChange} />
                    <label>Phone No *</label>
                    <input type="number" className='box' placeholder="Enter your Mobile Number" required value={phoneNo} onChange={handlePhoneNoChange} />
                </div>
                <button className='button10' type='submit'>Submit</button>
                {error && <p className="error">{error}</p>}
            </form>
        </div>
    );
}