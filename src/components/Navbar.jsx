import React from 'react'
import '../components/css/Navbar.css'
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    const paragraphStyle = {
        color: 'white',
        fontSize: '12px',
        display: 'inline',
        marginLeft: '10px',
        fontFamily: 'poppins'
        // Add any other styles as needed
    };
    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <div className='first-part'>
                        <i class="fa-solid fa-book icon"><p style={paragraphStyle}>Quick Memo</p></i>
                        <div className='links' id='links'>
                            <NavLink to="/" className={({ isActive, isPending }) =>
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
