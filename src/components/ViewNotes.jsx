import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/ViewNotes.css';
import { getCookie } from '../utils/getCookie';
import { getColors } from '../utils/generate colors';
import UpdateNote from './UpdateNotes';

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [updateForm, showUpdateForm] = useState(false);
    const [selectedNoteId, setSelectedNoteId] = useState(null); // Add this line
    const [title, settitle] = useState('')
    const [isfilterd, setisfiltered] = useState(false);

    const handleInputChange = (e) => {
        const inputValue = e.target.value;
        settitle(inputValue);

    };

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/notes/fetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                setNotes(data);
            } else {
                setError('Failed to fetch notes');
            }
        } catch (error) {
            setError('Error fetching notes');
        } finally {
            setLoading(false);
        }
    };

    const deleteNote = async (noteid) => {
        try {
            const response = await fetch(`api/notes/deletenote/${noteid}`, {
                method: 'delete',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                credentials: 'include'
            });

            if (response.ok) {
                fetchNotes();
            } else {
                throw new Error(`Error deleting note: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    const filterNotes = async (tag) => {
        try {
            setLoading(true);
            setisfiltered(true);

            const response = await fetch('/api/notes/filter', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                body: JSON.stringify({ tag }),
                credentials: 'include'
            });
            if (response.ok) {
                const data = await response.json();
                // console.log('Response data:', data);
                setNotes(data.notes);
            } else {
                const errorMessage = await response.text();
                console.error(`Failed to fetch filtered notes. Server error: ${errorMessage}`);
                setError('Failed to fetch filtered notes');
            }
        } catch (error) {
            console.error('Error fetching filtered notes:', error);
            setError('Error fetching filtered notes');
        } finally {
            setLoading(false);
        }
    };
    const clearFilter = () => {

        fetchNotes();
        setisfiltered(false);


    };

    const searchNote = useCallback(async () => {
        try {
            setLoading(true);

            const searchedTitle = title
            const response = await fetch('/api/notes/search', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                body: JSON.stringify({ searchedTitle }),
                credentials: 'include'
            });

            if (response.ok) {
                const data = await response.json();
                console.log('Response data:', data);
                setNotes(data.notes);
            } else {
                const errorMessage = await response.text();
                console.error(`Failed to search note. Server error: ${errorMessage}`);
                setError('Failed to search notes');
            }
        } catch (error) {
            console.error('Error fetching searched note:', error);
            setError('Error fetching searched notes');
        } finally {
            setLoading(false);
        }

    }, [title]);

    const showForm = (noteId) => {
        setSelectedNoteId(noteId);
        showUpdateForm(true);
    };

    //re render component on title change
    useEffect(() => {
        searchNote();
    }, [title, searchNote]);
    return (
        <div className='container1'>
            <h2>Your Notes</h2>
            <div id='searchBar'>
                <form >
                    <input type="text" className="search --bs-danger " id='searchInput' name="search" placeholder="Search"
                        onChange={handleInputChange} value={title} />
                </form>

                <div className="dropdown" >
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ backgroundColor: 'transparent', border: 'none' }}>
                        <i className="fa-solid fa-filter" style={{ color: '#8BC4FD' }}></i>
                    </button>
                    <ul className="dropdown-menu">
                        <li><Link className="dropdown-item" onClick={() => filterNotes('Work')}>Work</Link></li>
                        <li><Link className="dropdown-item" onClick={() => filterNotes('Personal')}>Personal</Link></li>
                        <li><Link className="dropdown-item" onClick={() => filterNotes('Other')}>Other</Link></li>

                    </ul>

                    <div id='clearFilterBtn'>
                        {isfilterd && <button className="btn btn-link" onClick={clearFilter} style={{ textDecoration: 'none', color: '#7AADDF' }}>Clear Filter</button>}
                    </div>

                </div>

            </div>


            {loading && <div className="spinner-border" role="status" id='spinner'>
                <span className="visually-hidden">Loading...</span>
            </div>}
            {error && <p>{error}</p>}

            <div className="row" id='row'>
                {notes.length === 0 ? (
                    <p style={{ color: 'white' }}>No Notes to show </p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} className="col-md-6" id='noteWrapper' style={{

                            minWidth: '15vw',
                            flex: '1',
                            fontWeight: 600,
                        }}>
                            <div className="card mb-4 shadow-sm" id='idk'>
                                <div
                                    className="card-body"
                                    id='card-body'
                                    style={{
                                        backgroundColor: getColors(),

                                        fontWeight: 600,
                                    }}
                                >
                                    <div id='icons'>
                                        <i className="fa-solid fa-pen-to-square" onClick={() => showForm(note._id)}></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
                                    </div>
                                    <h5 className="card-title">Title:{note.title}</h5>
                                    <p className="card-text">-{note.description}</p>
                                    <p className="card-text" style={{ textTransform: 'uppercase' }}><i className="fa-solid fa-tag"></i>  {note.tag}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {updateForm && <UpdateNote onClose={() => showUpdateForm(false)} noteId={selectedNoteId} />}
        </div >
    );
};

export default ViewNotes;
