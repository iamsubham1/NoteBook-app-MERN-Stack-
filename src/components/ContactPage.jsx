import React from 'react'
import '../components/css/Contact.css'
import Vector from '../assets/Get in touch-cuate.svg'

const ContactPage = () => {
    return (
        <div id='page-container'>
            <img src={Vector} alt='vector'></img>
            <div className='contact-section'>
                <h1>Contact Me !</h1>
                <div id='Contact-form'>contact form</div>
                <ul><li>linkedin</li>
                    <li>github</li>
                    <li>whatsapp</li></ul>
            </div>
        </div>
    )
}

export default ContactPage
