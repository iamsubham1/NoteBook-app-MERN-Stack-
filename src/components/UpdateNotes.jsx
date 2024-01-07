import React, { useState } from 'react';

const UpdateNoteForm = ({ selectedNote, onUpdate, onCancel }) => {
    const [updatedTitle, setUpdatedTitle] = useState(selectedNote.title);
    const [updatedDescription, setUpdatedDescription] = useState(selectedNote.description);

    const handleUpdate = () => {
        // You can perform any validation here before updating
        onUpdate({
            ...selectedNote,
            title: updatedTitle,
            description: updatedDescription,
        });
    };

    return (
        <div>
            <h3>Update Note Form</h3>
            <input
                type="text"
                value={updatedTitle}
                onChange={(e) => setUpdatedTitle(e.target.value)}
            />
            <textarea
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
            />
            <button onClick={handleUpdate}>Update</button>
            <button onClick={onCancel}>Cancel</button>
        </div>
    );
};

export default UpdateNoteForm;
