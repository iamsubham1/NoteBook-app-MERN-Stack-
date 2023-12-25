import React, { useState } from 'react';
import '../components/css/Notes.css';

const Notes = () => {

    const [notesData, setNotesData] = useState({
        title: '',
        description: '',
        Tag: '',
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
            Tag: tag,
        });
    };


    const handleSubmit = (e) => {
        e.preventDefault();
        // Add logic to handle the submission of the form (e.g., save the note)
        console.log('Note Submitted:', notesData);
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
                            required
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
                        >
                            {notesData.selectedTag ? notesData.selectedTag : 'Tags'}
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

                <button type="submit" className="btn btn-primary createBtn" onClick={handleSubmit}>Create</button>
            </form>
        </div>
    );
};

export default Notes;
