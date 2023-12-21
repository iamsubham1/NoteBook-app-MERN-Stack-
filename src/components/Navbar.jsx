import React from 'react'
import '../components/css/Navbar.css'
import { Link } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <div className='first-part'>
                        <i className="icon fa-solid fa-book-open"></i>
                        <div className='links'>
                            <Link to="/home">Home</Link>
                            <Link to="/about">About</Link>

                        </div>
                    </div>
                </li>
                <li>
                    <div className='second-part'>
                        <button type='button'>Sign Up</button>
                        <button id='login' type='button'>Login</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
