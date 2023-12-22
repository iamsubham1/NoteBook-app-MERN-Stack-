import React from 'react'
import { Link } from 'react-router-dom'
import '../components/css/SignupForm.css'
const SignupForm = () => {
    return (


        <div className="form-container">
            <form className="fr">
                <h1 id='h1'>Sign Up</h1>
                <div className="name-container">
                    <label htmlFor='name' className='label'>Name</label>
                    <input type="text" id="name" name="name" className="elem" />
                </div>
                <div className='email-container'>
                    <label htmlFor='email' className='label'>Email</label>
                    <input type="email" id="email" name="email" className="elem" />
                </div>
                <div className='password-container'>
                    <label htmlFor='password' className='label'>Password</label>
                    <input type="password" id="password" name="password" className="elem" />
                </div>
                <input type="button" value="Create account" className="submit-btn elem" />
                <p id='paragraph'>Have an account ? <Link to="/login">Login</Link></p>
            </form>
        </div>

    )
}

export default SignupForm
