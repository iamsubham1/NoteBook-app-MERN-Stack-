import React, { useState } from 'react'
import '../components/css/Contact.css'
import { Link } from 'react-router-dom';

import Vector from '../assets/Get in touch-cuate.svg'

const ContactPage = () => {

    const [contactData, setcontactData] = useState({
        email: "",
        message: "",
    });
    const [sending, setsending] = useState(false);
    const handleInput = (e) => {
        const { name, value } = e.target
        setcontactData({
            ...contactData,
            [name]: value,

        });
    }
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setsending(true);
            const response = await fetch('/api/auth/sendsms', {
                method: 'POST',
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(contactData),
                credentials: 'include'
            })

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`error! Status: ${response.status}. ${errorMessage}`);

            }
            alert('message sent')
            setcontactData({
                email: '',
                message: ''
            });
        } catch (error) {
            console.error('Error:', error.message);
            alert(`Failed to send message. ${error.message}`);

        } finally {
            setsending(false);
        }
    };
    if (sending) {
        return (<div className="spinner-border" role="status" id='spinner'>
            <span class="visually-hidden">Loading...</span>
        </div>
        )
    }

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
