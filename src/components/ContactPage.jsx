import React, { useState, useCallback } from 'react'
import '../components/css/Contact.css'
import { Link } from 'react-router-dom';

import Vector from '../assets/Get in touch-cuate.svg'

const ContactPage = () => {

    const [contactData, setcontactData] = useState({
        email:"",
        message:"",
    });

    const handleInput=(e)=>{
    const{name, value} = e.target
    setcontactData({
        ...contactData,
        [name]: value,
        
    });
}
const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', contactData);
        // You can send the form data to a server or perform other actions as needed
    };
    return (
        <div id='page-container'>

            <div id='image-section'><img src={Vector} alt='vector'></img></div>

            <div id='contact-section'>
                <h1>Contact Me !</h1>
                <div id='Contact-form'>
                <form className='loginForm' onSubmit={handleSubmit}>

                    <div id='Textfield'>

                        <div className="mb-3">
                            <label htmlFor="email" className="form-label" id='label'>
                                Email address
                            </label>
                            <input
                                type="email"
                                name='email'
                                className="form-control"
                                id="email"
                                aria-describedby="emailHelp"
                                value={contactData.email}
                                onChange={handleInput}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="message" className="form-label">
                                message
                            </label>
                            <input
                                type="message"
                                name='message'
                                className="form-control"
                                id="message"
                                value={contactData.message}
                                onChange={handleInput}

                            />
                        </div>
                    </div>
                    <div id='lower-section'>
                        <button
                            type="submit"
                            className="btn btn-primary"
                            id='submit-btn'
                        disabled={!contactData.email || !contactData.message}
                        >
                            submit
                        </button>

                    </div>
                </form></div>

                <ul id='social-handles'>
                    <li><Link to='/linkedin' id='social'><i class="fa-brands fa-linkedin"></i></Link></li>
                    <li><Link to='/linkedin' id='social'><i class="fa-brands fa-github"></i></Link></li>
                    <li><Link to='/linkedin' id='social'><i class="fa-brands fa-whatsapp"></i></Link></li>
                </ul>
            </div>
        </div >
    )
}

export default ContactPage
