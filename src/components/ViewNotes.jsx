import React, { useState } from 'react';
import '../components/css/ViewNotes.css';
import { getCookie } from '../utils/getCookie';
import { getColors } from '../utils/generate colors';


const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showNotes, setShowNotes] = useState(false);  // State to control visibility


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
                setShowNotes((prevShowNotes) => !prevShowNotes);
            } else {
                setError('Failed to fetch notes');
            }
        } catch (error) {
            setError('Error fetching notes');
        } finally {
            setLoading(false);
        }
    };



    return (
        <div className='container1'>
            <h2>Your Notes</h2>
            <button onClick={fetchNotes} disabled={loading} className="btn btn-secondary" id='showNotes'>
                {loading ? 'Fetching...' : showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {showNotes && (
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
                                            <i className="fa-solid fa-trash"></i>
                                        </div>
                                        <h5 className="card-title">{note.title}</h5>
                                        <p className="card-text">{note.description}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )
            }

        </div>
    );
};

export default ViewNotes;


