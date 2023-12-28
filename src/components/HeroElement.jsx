import { Link, useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import '../components/css/HeroElement.css'
import { getCookie } from '../utils/getCookie';
import ViewNotes from './ViewNotes';

const HeroElement = () => {
    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of the JWT token in cookies
        const JWT = getCookie('JWT');
        console.log(JWT)
        console.log(document.cookie);

        if (!JWT) {
            // If token is not present, navigate to login
            navigate('/login');
        }
        // If token is present, user stays on the home page
    }, [navigate]);
    return (
        <div id='container'>
            <section id="welcome-section" className='section'>
                <div id='heroElement'>
                    <svg>
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                            Welcome to Quick-Memo

                        </text>

                    </svg>
                    <h2>"QuickMemo – your instant note companion!"</h2>
                </div>

            </section>
            <section className='section' id="notes-section">
                <ViewNotes />
            </section>
        </div>
    )
}

export default HeroElement
