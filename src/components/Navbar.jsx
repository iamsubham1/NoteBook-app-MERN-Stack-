import React from 'react'
import '../components/css/Navbar.css'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <div className='first-part'>
                        <i className="icon fa-solid fa-book-open"></i>
                        <div className='links'>
                            <a href="/home">Home</a>
                            <a href="/about">About</a>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='second-part'>
                        <button type='button'>Sign Up</button>
                        <button type='button'>Login</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
