import React from 'react'
import './css/Login.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {
    return (

        <form className='loginForm'>
            <div id='Textfield'>
                <h1 id='h1'>Login</h1>
                <div className="mb-3">
                    <label for="emailInput" className="form-label" id='label'>Email address</label>
                    <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label for="passwordInput" className="form-label">Password</label>
                    <input type="password" className="form-control" id="passwordInput" />
                </div>
            </div>
            <div id='lower-section'>
                <button type="submit" className="btn btn-primary" id='loginBtn'>Login</button>
                <p>Dont have an account ? <Link to="/signup" id='link'>Register</Link></p>
            </div>
        </form>


    )
}

export default LoginForm
