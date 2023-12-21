import React from 'react'
import '../components/css/Navbar.css'
import { Link, NavLink } from 'react-router-dom';

const Navbar = () => {
    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <div className='first-part'>
                        <i className="icon fa-solid fa-book-open"></i>
                        <div className='links' id='links'>
                            <NavLink to="/home" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : "fresh"
                            }>Home</NavLink>
                            <NavLink to="/about" className={({ isActive, isPending }) =>
                                isPending ? "pending" : isActive ? "active" : "fresh"
                            }>About</NavLink>


                        </div>
                    </div>
                </li>
                <li>
                    <div className='second-part'>
                        <Link to="/signup">
                            <button type='button' className='navBtn'>Sign Up</button>
                        </Link>
                        <Link to="/login">
                            <button id='login' type='button' className='navBtn'>Login</button>
                        </Link>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
