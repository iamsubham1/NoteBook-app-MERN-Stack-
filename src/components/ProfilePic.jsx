import React from 'react'

const ProfilePic = () => {
    return (
        <div>
            <h1>profile page</h1>
            <form method="post" enctype="multipart/form-data" >
                <label htmlForfor="fileInput">Select File:</label>
                <input type="file" id="fileInput" name="profile-pic" accept=".jpg, .jpeg, .png, .gif" required />


                <button type="submit">Upload File</button>
            </form>
        </div>
    )
}

export default ProfilePic
