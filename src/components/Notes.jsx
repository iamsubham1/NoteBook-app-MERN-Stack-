import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import '../components/css/Notes.css'
import { getCookie } from '../utils/getCookie';

const Notes = () => {
    const navigate = useNavigate();
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await fetch('/api/notes/addnotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                body: JSON.stringify(noteData),
                credentials: 'include'
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                throw new Error(`HTTP error! Status: ${response.status}. ${errorMessage}`);

            }
            window.location.reload();
            alert('Memo created successfully');
            navigate('/');
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

        <form className='notesForm' onSubmit={handleSubmit}>
            <h1>Create Note</h1>
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
                        <li><Link className="dropdown-item" onClick={() => handleTagSelection('Work')}>Work</Link></li>
                        <li><Link className="dropdown-item" onClick={() => handleTagSelection('Personal')}>Personal</Link></li>
                        <li><Link className="dropdown-item" onClick={() => handleTagSelection('Other')}>Other</Link></li>
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

    );
};

export default Notes;