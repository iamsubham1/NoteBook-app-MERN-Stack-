import React, { useState } from 'react';
import '../components/css/ViewNotes.css';
import { getCookie } from '../utils/getCookie';

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showNotes, setShowNotes] = useState(false);  // State to control visibility
    const token = getCookie('JWT');

    const fetchNotes = async () => {
        try {
            setLoading(true);
            const response = await fetch('/api/notes/fetch', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': token
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
        <div>
            <h2>Your Notes</h2>
            <button onClick={fetchNotes} disabled={loading} className="btn btn-secondary" >
                {loading ? 'Fetching...' : showNotes ? 'Hide Notes' : 'Show Notes'}
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            {showNotes && (
                <div className="row">
                    {notes.map((note) => (
                        <div key={note._id} className="col-md-4">
                            <div className="card mb-4 shadow-sm">
                                <div className="card-body">
                                    <h5 className="card-title">{note.title}</h5>
                                    <p className="card-text">{note.description}</p>
                                    {/* Add any other note details you want to display */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewNotes;
