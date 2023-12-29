import React, { useState } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import LoadingBar from 'react-top-loading-bar';
import { getCookie } from '../utils/getCookie';
import { logout } from '../utils/logout';

import '../components/css/Navbar.css'

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const token = getCookie('JWT');

    const [progress, setProgress] = useState(0);

    const slowSetProgress = async (stages) => {
        for (let i = 0; i < stages.length; i++) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    setProgress(stages[i]);
                    resolve();
                }, 100);
            });
        }
    };

    const brandStyle = {
        color: 'white',
        fontSize: '12px',
        display: 'inline',
        marginLeft: '10px',
        fontFamily: 'poppins',
    };
    const handleLogout = () => {
        logout();
        slowSetProgress([10, 30, 60, 100]);
        navigate('/login');
    };
    const getUserInfo = () => {
        slowSetProgress([10, 30, 60, 100]);
        navigate('/userinfo');
    };
    return (
        <>
            <LoadingBar
                color='rgb(163, 212, 254)'
                progress={progress}
                onLoaderFinished={() => slowSetProgress(0)}
            />
            <div className='Navbar'>
                <ul>
                    <li>
                        <div className='first-part'>
                            <i className="fa-solid fa-book icon">
                                <p style={brandStyle}>Quick Memo</p>
                            </i>
                            <div className='links' id='links'>
                                <NavLink
                                    to="/"
                                    onClick={() => slowSetProgress([10, 30, 60, 100])}
                                    activeclassName="active"
                                    className="fresh"
                                >
                                    Home
                                </NavLink>
                                <NavLink
                                    to="/about"
                                    onClick={() => slowSetProgress([10, 30, 60, 100])}
                                    activeclassName="active"
                                    className="fresh"
                                >
                                    About
                                </NavLink>
                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='second-part'>
                            {token ? (
                                // If authenticated, show logout button
                                <> <i className={`fa-solid fa-user ${location.pathname === '/userinfo' ? 'active-icon' : ''}`}
                                    id='userIcon'
                                    onClick={getUserInfo}></i>
                                    <button type='button' onClick={handleLogout} className='navBtn'>
                                        Logout
                                    </button>


                                </>
                            ) : (
                                // If not authenticated, show sign up and login buttons
                                <>

                                    <Link to="/signup">
                                        <button type='button' onClick={() => slowSetProgress([10, 30, 60, 100])} className='navBtn'>
                                            Sign Up
                                        </button>
                                    </Link>
                                    <Link to="/login">
                                        <button type='button' onClick={() => slowSetProgress([10, 30, 60, 100])} className='navBtn'>
                                            Login
                                        </button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </li>
                </ul>
            </div>
        </>
    );
};

export default Navbar;
