import React from 'react'
import '../components/Navbar.css'

const Navbar = () => {
    return (
        <div className='Navbar'>
            <ul>
                <li>
                    <div className='first-part'>
                        <a href='#icons'>icon</a>
                        <div className='links'>
                            <a href="/home">Home</a>
                            <a href="/about">about</a>
                        </div>
                    </div>
                </li>
                <li>
                    <div className='second-part'>
                        <button type='button'>sign up</button>
                        <button type='button'>login</button>
                    </div>
                </li>
            </ul>
        </div>
    )
}

export default Navbar
