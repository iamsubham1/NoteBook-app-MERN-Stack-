import React from 'react'
import './css/AboutPage.css'
import mongodb from '../assets/mongodb-ar21.svg'
import express from '../assets/expressjs-ar21.svg'
const AboutPage = () => {
    return (
        <div className='Container'>
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
                    <img src={mongodb} />
                    <img src={express} />
                </div>
            </div>

        </div >
    )
}

export default AboutPage





