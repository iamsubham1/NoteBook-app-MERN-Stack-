
import React, { useState } from 'react'
import './css/Login.css'
import { Link } from 'react-router-dom'

const LoginForm = () => {

    const [userData, setuserData] = useState({
        email: '',
        password: ''
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setuserData({
            ...userData,
            [name]: value
        })

    }
    const submit = (e) => {
        e.preventDefault();
        console.log('login succesfully', userData);

    }
    return (

        <form className='loginForm'>
            <div id='Textfield'>
                <h1 id='h1'>Login</h1>
                <div className="mb-3">
                    <label htmlfor="email" className="form-label" id='label'>Email address</label>
                    <input type="email" name='email' className="form-control" id="email" aria-describedby="emailHelp"
                        value={userData.email} onChange={handleInput}
                    />
                </div>
                <div className="mb-3">
                    <label htmlfor="password" className="form-label">Password</label>
                    <input type="password" name='password' className="form-control" id="password"
                        value={userData.password} onChange={handleInput}
                    />
                </div>
            </div>
            <div id='lower-section'>
                <button type="submit" className="btn btn-primary" id='loginBtn' onClick={submit}>Login</button>
                <p>Dont have an account ? <Link to="/signup" id='link'>Register</Link></p>
            </div>
        </form>


    )
}

export default LoginForm
