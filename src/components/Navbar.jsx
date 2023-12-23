import React, { useState } from 'react';

import LoadingBar from 'react-top-loading-bar'
import '../components/css/Navbar.css'
import { Link, NavLink } from 'react-router-dom';


const Navbar = () => {
    const [progress, SetProgress] = useState(0);
    const slowSetProgress = async (stages) => {
        for (let i = 0; i < stages.length; i++) {
            await new Promise((resolve) => {
                setTimeout(() => {
                    SetProgress(stages[i]);
                    resolve();
                }, 5); // Adjust the delay time (in milliseconds) as needed
            });
        }
    };
    const paragraphStyle = {
        color: 'white',
        fontSize: '12px',
        display: 'inline',
        marginLeft: '10px',
        fontFamily: 'poppins'
        // Add any other styles as needed
    };
    return (
        <>  <LoadingBar
            color='rgb(163, 212, 254)'
            progress={progress}
            onLoaderFinished={() => slowSetProgress(0)}
        />
            <div className='Navbar'>
                <ul>
                    <li>
                        <div className='first-part'>
                            <i class="fa-solid fa-book icon"><p style={paragraphStyle}>Quick Memo</p></i>
                            <div className='links' id='links'>
                                <NavLink to="/" onClick={() => slowSetProgress([10, 30, 60, 100])} className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : "fresh"
                                }>Home</NavLink>
                                <NavLink to="/about" onClick={() => slowSetProgress([10, 30, 60, 100])} className={({ isActive, isPending }) =>
                                    isPending ? "pending" : isActive ? "active" : "fresh"
                                }>About</NavLink>


                            </div>
                        </div>
                    </li>
                    <li>
                        <div className='second-part'>
                            <Link to="/signup">
                                <button type='button' onClick={() => slowSetProgress([10, 30, 60, 100])} className='navBtn'>Sign Up</button>
                            </Link>
                            <Link to="/login">
                                <button id='login' onClick={() => slowSetProgress([10, 30, 60, 100])} type='button' className='navBtn'>Login</button>
                            </Link>
                        </div>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default Navbar