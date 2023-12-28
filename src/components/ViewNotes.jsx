import React, { useState, useEffect } from 'react';
import '../components/css/ViewNotes.css';
import { getCookie } from '../utils/getCookie';

const ViewNotes = () => {
    const [notes, setNotes] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
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
            } else {
                setError('Failed to fetch notes');
            }
        } catch (error) {
            setError('Error fetching notes');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        // Fetch notes when the component mounts
        fetchNotes();
    }, [token]);

    return (
        <div>
            <h2>Your Notes</h2>
            <button onClick={fetchNotes} disabled={loading}>
                {loading ? 'Fetching...' : 'Get Notes'}
            </button>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <ul>
                {notes.map((note) => (
                    <li key={note._id}>
                        <h3>{note.title}</h3>
                        <p>{note.description}</p>
                        {/* Add any other note details you want to display */}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ViewNotes;
