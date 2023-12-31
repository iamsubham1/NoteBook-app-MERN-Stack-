import React, { useState } from 'react';
import './css/Login.css';
import { Link, useNavigate } from 'react-router-dom';

const LoginForm = () => {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({
        email: '',
        password: '',
    });
    const handleInput = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            [name]: value,
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        // Reset any previous success message
        try {
            const response = await fetch('http://localhost:4000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(userData),
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                alert('login successfull');
                console.log('Login successful:', data);
                navigate('/');
                // Optionally, you can redirect to another page after successful login
                // window.location.href = '/home';
            }
            else if (response.status === 400) {


                alert('Incorrect credentials');
            }
        } catch (error) {
            console.error('Network error:', error);

        }
    };

    return (

        <form className='loginForm' onSubmit={submit}>

            <div id='Textfield'>
                <h1 id='h1'>Login</h1>

                <div className="mb-3">
                    <label htmlFor="email" className="form-label" id='label'>
                        Email address
                    </label>
                    <input
                        type="email"
                        name='email'
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        value={userData.email}
                        onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        name='password'
                        className="form-control"
                        id="password"
                        value={userData.password}
                        onChange={handleInput}
                    />
                </div>
            </div>
            <div id='lower-section'>
                <button
                    type="submit"
                    className="btn btn-primary"
                    id='loginBtn'
                    disabled={!userData.email || !userData.password}
                >
                    Login
                </button>
                <p>
                    Don't have an account? <Link to="/signup" id='link'>Register</Link>
                </p>
            </div>
        </form>

    );
};

export default LoginForm;
