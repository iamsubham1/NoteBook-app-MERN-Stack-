import React from 'react'
import '../components/css/Notes.css'

const Notes = () => {
    return (
        <div className='Container'>
            <form className='notesForm'>
                <h1>Create Memo</h1>
                <div className='topWrapper'>
                    <div className="mb-3 title ">
                        <label htmlFor="Title" className="form-label" id='colorChange'>Title</label>
                        <input type="text" className="form-control" id="Title" aria-describedby="emailHelp" placeholder='example title' />

                    </div>
                    <div class="dropdown">
                        <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Tags
                        </button>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" >Work</a></li>
                            <li><a class="dropdown-item" >Personal</a></li>
                            <li><a class="dropdown-item" >Miscellaneous</a></li>
                        </ul>
                    </div>
                </div>

                <div className="mb-3">
                    <label htmlFor="Description" className="form-label" id='colorChange'>Description</label>
                    <textarea className="form-control" id="Description" placeholder='write your memo here...'
                        rows="4" cols="50"></textarea>


                </div>


                <button type="submit" class="btn btn-primary createBtn">Create</button>
            </form>

        </div>
    )
}

export default Notes


