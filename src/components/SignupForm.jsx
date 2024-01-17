import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../components/css/SignupForm.css'
const SignupForm = () => {
    const navigate = useNavigate();
    const [userData, setuserData] = useState({
        name: '',
        email: '',
        password: '',
    })

    const handleInput = (e) => {
        const { name, value } = e.target;
        setuserData({
            ...userData,
            [name]: value
        })


    }
    const SignUp = async (e) => {
        e.preventDefault();
        // Add logic to handle the submission of the form (e.g., save the note)
        console.log('Account created');
        try {
            const response = await fetch(`https://quickmemo-backend.onrender.com/api/auth/createuser`, {
                method: 'POST',

                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(userData)
            })
            if (response.ok) {
                navigate('/login');
                alert('Account Created');
                // Redirect or perform other actions
            }
            else if (response.status === 400) {
                alert("msg:", response.error);
                navigate('/login')
            }
            else {

                alert('form cannot be blank');

            }

        } catch (error) {
            console.log(error)

        }

    };

    return (


        <div className="form-container">
            <form className="fr">
                <h1 id='h1'>Sign Up</h1>
                <div className="name-container">
                    <label htmlFor='name' className='label'>Name</label>
                    <input type="text" id="name" name="name" className="elem" onChange={handleInput} value={userData.name} />
                </div>
                <div className='email-container'>
                    <label htmlFor='email' className='label'>Email</label>
                    <input type="email" id="email" name="email" className="elem" onChange={handleInput} value={userData.email} />
                </div>
                <div className='password-container'>
                    <label htmlFor='password' className='label'>Password</label>
                    <input type="password" id="password" name="password" className="elem" onChange={handleInput} value={userData.password} />
                </div>
                <input type="button" value="Create account" className="submit-btn elem" onClick={SignUp} />
                <p id='paragraph'>Have an account ? <Link to="/login" id='link'>Login</Link></p>
            </form>
        </div>

    )
}

export default SignupForm
