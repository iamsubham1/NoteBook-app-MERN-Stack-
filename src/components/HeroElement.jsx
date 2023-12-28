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
        <div id="heroelement">
            <svg>
                <text x="50%" y="50%" dy=".35em" textAnchor="middle">
                    Welcome to NoteBook-app
                </text>

            </svg>
            <div className='flex-container'>
                <h1>Create your Memo</h1>
                <Link to='/create' className="text-gradient-animation" >now !</Link>
            </div>
            <ViewNotes />
        </div>
    )
}

export default HeroElement
