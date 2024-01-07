// UpdateNote.js

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/UpdateNotes.css';
import { getCookie } from '../utils/getCookie';

const UpdateNote = ({ onClose, noteId }) => {
    const [noteData, setNoteData] = useState({
        title: '',
        description: '',
        tag: ''
    });

    const handleInputChange = (e) => {
        setNoteData({
            ...noteData,
            [e.target.name]: e.target.value
        });
    };

    const handleTagSelection = (selectedTag) => {
        setNoteData({
            ...noteData,
            tag: selectedTag
        });
    };

    const updateNote = async (noteid) => {

        try {
            const response = await fetch(`http://localhost:4000/api/notes/updatenote/${noteid}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                credentials: 'include',
                body: JSON.stringify(noteData)
            });

            if (response.ok) {
                // Optionally, you can handle successful update logic here
                onClose();
                window.location.reload();
                // Close the UpdateNote component after successful update
            } else {
                throw new Error(`Error updating note: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error updating note:', error);
        }
    };

    return (
        <div id='shell'>
            <div id='border'>
                <form className='notesForm'>
                    <h1>Update Memo</h1>
                    <div className='topWrapper'>
                        <div className="mb-3 title">
                            <label htmlFor="Title" className="form-label" id='colorChange'>Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="Title"
                                placeholder='Enter updated title'
                                autoComplete='off'
                                name='title'
                                value={noteData.title}
                                onChange={handleInputChange}
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
                            placeholder='Enter updated description...'
                            required
                            autoComplete='off'
                            rows="4"
                            cols="50"
                            name='description'
                            value={noteData.description}
                            onChange={handleInputChange}
                        ></textarea>
                    </div>
                    <button type="button" className="btn btn-primary createBtn" onClick={() => updateNote(noteId)}>Update</button>
                    <button type="button" className="btn btn-secondary close-btn" onClick={onClose} style={{ width: '30%', marginLeft: '35%', marginTop: '1%' }}>Close</button>
                </form>
            </div>
        </div>
    );
};

export default UpdateNote;
