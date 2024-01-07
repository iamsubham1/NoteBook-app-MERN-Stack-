import React, { useState, useEffect } from 'react';
import '../components/css/ViewNotes.css';
import { getCookie } from '../utils/getCookie';
import { getColors } from '../utils/generate colors';


const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);


    useEffect(() => {
        fetchNotes();
    }, []);


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
                // Toggle the showNotes state to switch between show and hide

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
            const response = await fetch(`http://localhost:4000/api/notes/deletenote/${noteid}`, {
                method: "delete",
                headers: {
                    'Content-Type': 'appplication/json',
                    'JWT': getCookie('JWT')
                },
                credentials: 'include'
            })
            if (response.ok) {
                fetchNotes()
            }
            else {
                throw new Error(`error deleting note :${response.statusText}`)
            }

        } catch (error) {
            console.error('Error deleting note:', error);
        }
    }

    return (
        <div className='container1'>
            <h2>Your Notes</h2>


            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}


            <div className="row" id='row'>
                {notes.length === 0 ? (
                    <p style={{ color: 'white' }}>No Notes to show </p>
                ) : (
                    notes.map((note) => (
                        <div key={note._id} className="col-md-6">
                            <div className="card mb-4 shadow-sm" id='idk'>
                                <div
                                    className="card-body"
                                    id='card-body'
                                    style={{ backgroundColor: getColors(), minWidth: '15vw' }}
                                >
                                    <div id='icons'>
                                        <i className="fa-solid fa-pen-to-square"></i>
                                        <i className="fa-solid fa-trash" onClick={() => deleteNote(note._id)}></i>
                                    </div>
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.description}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>


        </div>
    );
};

export default ViewNotes;


