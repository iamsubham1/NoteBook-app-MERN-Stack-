
import { Link } from 'react-router-dom'
import React from 'react'
import '../components/css/HeroElement.css'

const HeroElement = () => {
    const style = {
        fontSize: '30px',
        textDecoration: 'none'
    }
    return (
        <div id="heroelement">

            <svg>
                <text x="50%" y="50%" dy=".35em" text-anchor="middle">
                    Welcome to NoteBook-app
                </text>
            </svg>
            <div className='flex-container'>
                <h1>Create your Memo</h1>
                <Link to='/create' className="text-gradient-animation">now !</Link>

            </div>
        </div >
    )
}

export default HeroElement
