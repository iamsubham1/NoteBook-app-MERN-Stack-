import React, { useState } from 'react';
import '../components/css/Notes.css'

const Notes = () => {
    console.log('All Cookies:', document.cookie);
    const [loading, setLoading] = useState(false);
    const [noteData, setNoteData] = useState({
        title: '',
        description: '',
        tag: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNoteData({
            ...noteData,
            [name]: value,
        });
    };

    const handleTagSelection = (tag) => {
        setNoteData({
            ...noteData,
            tag,
        });
    };

    // Function to get the value of a cookie by its name
    const getCookie = (name) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();


    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const authToken = getCookie('auth-token');

        console.log('All Cookies:', document.cookie);

        try {
            setLoading(true);

            // Retrieve the token from the cookie

            const response = await fetch('http://localhost:4000/api/notes/addnotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4YWI3N2Q1ZjYxNGRiYmJjYjRjMmJjIn0sImlhdCI6MTcwMzU5MDA2Mn0.8g98_wQQUERVPcGZjKCHS91rHc6QXH1N_tZIKT1lQmI',
                },
                body: JSON.stringify(noteData),
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // Extract error message from response
                throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`);
            }

            alert('Memo created successfully');
            setNoteData({
                title: '',
                description: '',
                tag: '',
            });
        } catch (error) {
            console.error('Error:', error.message);
            alert(`Failed to create memo. ${error.message}`);
        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='Container'>
            <form className='notesForm' onSubmit={handleSubmit}>
                <h1>Create Memo</h1>
                <div className='topWrapper'>
                    <div className="mb-3 title">
                        <label htmlFor="Title" className="form-label" id='colorChange'>Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="Title"
                            aria-describedby="emailHelp"
                            placeholder='example title'
                            value={noteData.title}
                            onChange={handleInputChange}
                            autoComplete='off'
                            name='title'
                        />
                    </div>
                    <div className="dropdown">
                        <button
                            className="btn btn-secondary dropdown-toggle"
                            type="button"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                            required
                        >
                            {noteData.tag ? noteData.tag : 'Tags'}
                        </button>
                        <ul className="dropdown-menu">
                            <li><a className="dropdown-item" onClick={() => handleTagSelection('Work')}>Work</a></li>
                            <li><a className="dropdown-item" onClick={() => handleTagSelection('Personal')}>Personal</a></li>
                            <li><a className="dropdown-item" onClick={() => handleTagSelection('Other')}>Other</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Description" className="form-label" id='colorChange'>Description</label>
                    <textarea
                        className="form-control"
                        id="Description"
                        placeholder='write your memo here...'
                        required
                        autoComplete='off'
                        rows="4"
                        cols="50"
                        value={noteData.description}
                        onChange={handleInputChange}
                        name='description'
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary createBtn" disabled={loading || !noteData.tag || !noteData.title}>{loading ? 'Creating...' : 'Create'}</button>
            </form>
        </div>
    );
};

export default Notes;
























