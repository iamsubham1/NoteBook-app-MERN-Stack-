import React, { useState } from 'react'
import '../components/css/Contact.css'
import Vector from '../assets/Get in touch-cuate.svg'

const ContactPage = () => {
    const [formData, setFormData] = useState({
        email: '',
        message: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        // Add your form submission logic here
        console.log('Form submitted:', formData);
        // You can send the form data to a server or perform other actions as needed
    };
    return (
        <div id='page-container'>
            <img src={Vector} alt='vector'></img>
            <div id='contact-section'>
                <h1>Contact Me !</h1>
                <div id='Contact-form'><form onSubmit={handleSubmit}>
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />

                    <label htmlFor="message">Message:</label>
                    <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        cols="50"
                        required
                    ></textarea>

                    <button type="submit">Submit</button>
                </form></div>
                <ul><li>linkedin</li>
                    <li>github</li>
                    <li>whatsapp</li></ul>
            </div>
        </div>
    )
}

export default ContactPage
