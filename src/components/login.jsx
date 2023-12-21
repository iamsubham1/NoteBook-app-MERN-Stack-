import React from 'react'
import './css/Login.css'

const Login = () => {
    return (

        <form className='loginForm'>
            <div className="mb-3">
                <label for="emailInput" className="form-label" id='label'>Email address</label>
                <input type="email" className="form-control" id="emailInput" aria-describedby="emailHelp" />

            </div>
            <div className="mb-3">
                <label for="passwordInput" className="form-label">Password</label>
                <input type="password" className="form-control" id="passwordInput" />
            </div>
            <button type="submit" className="btn btn-primary" id='loginBtn'>Login</button>
        </form>


    )
}

export default Login
