import React, { useEffect } from 'react'
import './css/AboutPage.css'
import mongodb from '../assets/mongodb-ar21.svg'
import express from '../assets/expressjs-ar21.svg'
import firebase from '../assets/firebase-icon.svg'
import { getCookie } from '../utils/getCookie';
import { useNavigate } from 'react-router-dom'
const AboutPage = () => {

    const navigate = useNavigate();

    useEffect(() => {
        // Check for the presence of the JWT token in cookies
        const JWT = getCookie('JWT');
        // console.log(JWT)
        // console.log(document.cookie);

        if (!JWT) {
            // If token is not present, navigate to login
            navigate('/login');
        }
        // If token is present, user stays on the home page
    }, [navigate]);
    const imageStyle = {

        maxHeight: '11vh'


    };
    const imageStyle1 = {
        maxHeight: '12vh'
    };

    return (
        <div id='Container'>
            <div className='section-1' id='section1'>
                <h1>About the product</h1>
                <p>QuickMemo is not just a cloud platform,it's your personal space in the digital sky, where organization meets simplicity. Say goodbye to scattered notes and missed memos – with QuickMemo, managing your thoughts and ideas has never been easier.</p>
            </div>
            <div id='divider'></div>
            <div className='section-2' id='section2'>
                <h1>Technologies Used</h1>
                <div id='grid'>
                    <i className="fa-brands fa-html5"></i>
                    <i className="fa-brands fa-css3-alt"></i>
                    <i className="fa-brands fa-js"></i>
                    <i className="fa-brands fa-react"></i>
                    <i className="fa-brands fa-node"></i>
                    <img src={firebase} alt='firebase' style={imageStyle} />
                    <img src={mongodb} alt='mongodb' style={imageStyle1} />
                    <img src={express} alt='express.js' style={imageStyle1} />

                </div>
            </div>

        </div >
    )
}

export default AboutPage





