import React, { useState } from 'react';
import '../components/css/Notes.css';

const Notes = () => {

    const [loading, setLoading] = useState(false);
    const [notesData, setNotesData] = useState({
        title: '',
        description: '',
        tag: '',
    });

    const handleInput = (e) => {
        const { name, value } = e.target;
        setNotesData({
            ...notesData,
            [name]: value,
        });
    };

    const handleTagSelection = (tag) => {
        setNotesData({
            ...notesData,
            tag: tag,
        });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!notesData.tag || !notesData.title) {
            alert('Please select a tag.');
            return;
        }
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:4000/api/notes/addnotes`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU4OTgzMjIwZjhjZjMyZDQxY2Y5MWMzIn0sImlhdCI6MTcwMzUxMTU0NX0.WYwV8yaClJESQLXLlwGJcdOXvTvc9TAXMBJtYWvNBa8"
                },
                body: JSON.stringify(notesData)
            });

            if (!response.ok) {
                // Handle HTTP error
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // const responseData = await response.json();
            alert('Memo created successfully');
            // console.log('Server response:', responseData);

            // Reset tag after submission
            setNotesData({
                title: '',
                description: '',
                tag: '',
            });

        } catch (error) {
            console.error('Error:', error.message);
            if (error.message.includes('500')) {
                alert('A memo with the same title already exists.');
            } else {
                alert('Failed to create memo. Please try again.');
            }
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
                            value={notesData.title}
                            onChange={handleInput}
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
                            {notesData.tag ? notesData.tag : 'Tags'}
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
                        value={notesData.description}
                        onChange={handleInput}
                        name='description'
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-primary createBtn" disabled={loading || !notesData.tag || !notesData.title}>{loading ? 'Creating...' : 'Create'}</button>
            </form>
        </div>
    );
};

export default Notes;
