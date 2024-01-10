import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'
import '../components/css/HeroElement.css'
import { getCookie } from '../utils/getCookie';
import Notes from './Notes';
import ViewNotes from './ViewNotes';
import AOS from 'aos';
import 'aos/dist/aos.css';

const HomePage = () => {
    const navigate = useNavigate();

    useEffect(() => {
        if (!getCookie('JWT')) {
            // If token is not present, navigate to login
            navigate('/login');
        }
        // If token is present, user stays on the home page
    }, [navigate]);

    //animate on scroll
    AOS.init();

    return (
        <div id='container'>
            <section id="welcome-section" className='section'>
                <div id='heroElement'>
                    <svg>
                        <text x="50%" y="50%" dy=".35em" textAnchor="middle" >
                            Welcome to Quick-Memo

                        </text>

                    </svg>
                    <h2>"QuickMemo – your instant note companion!"</h2>
                    <div className="scroll-downs"  >
                        <div className="mousey">
                            <div className="scroller"></div>
                        </div>
                    </div>
                </div>

            </section>
            <section className='section' id="notes-section">
                <div id='create-section' data-aos="zoom-in-right" data-aos-offset="300">
                    <Notes />
                </div>
                <div className='view-section' data-aos="zoom-in-left" data-aos-offset="300">
                    <ViewNotes />
                </div>

            </section>
        </div>
    )
}

export default HomePage;
