import React, { useState, useEffect, useRef } from 'react';
import '../components/css/UserInfo.css';
import { getCookie } from '../utils/getCookie';

import userImg from '../assets/user.png'
import ActivityLog from './ActivityLog';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true); // Add loading state
    const [isuploading, setIsuploading] = useState(false);
    const [profilePicKey, setProfilePicKey] = useState(Date.now()); // Add a key for image element

    const fileInputRef = useRef(null);

    const handleUpload = () => {
        fileInputRef.current.click();
    }

    const handleFileChange = async (event) => {
        const file = event.target.files && event.target.files[0];
        try {
            setIsuploading(true)
            const formData = new FormData();
            formData.append('photo', file);
            const response = await fetch('http://localhost:4000/api/auth/upload', {
                method: "POST",
                headers: {
                    'JWT': getCookie('JWT'),
                },
                credentials: 'include',
                body: formData
            });

            if (!response.ok) {
                throw new Error('Error uploading file');
            }

            const data = await response.json();
            console.log('File uploaded successfully:', data);
            setProfilePicKey(Date.now());
            // window.location.reload()

        } catch (error) {
            console.error('error:', error.message)
        }
        finally {
            setIsuploading(false)
        }
    }

    useEffect(() => {
        const fetchUserInfo = async () => {
            try {
                // Simulate a delay

                await new Promise((resolve) => setTimeout(resolve, 200));

                const response = await fetch('http://localhost:4000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'JWT': getCookie('JWT'),
                    },
                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Error fetching user info');
                }

                const data = await response.json();
                console.log("data:", data);
                setUserInfo(data.user);
            } catch (error) {
                console.error('Error:', error.message);
            } finally {
                setIsLoading(false); // Set loading state to false when data is fetched
            }
        };

        fetchUserInfo();
    }, [profilePicKey]);

    if (isLoading || isuploading) {
        return (<div className="spinner-border" role="status" id='spinner'>
            <span className="visually-hidden">Loading...</span>
        </div>)
    }


    const profilePictureUrl = userInfo?.profilePic || userImg;

    return (
        <>
            <div id='Wrapper'>
                <img
                    key={profilePicKey}
                    src={profilePictureUrl}
                    alt='User Profile'
                    style={{
                        width: '10%',
                        height: 'auto',
                        borderRadius: '50%',
                        objectFit: 'cover',
                        objectPosition: 'center center',
                    }}
                    id='userImg'
                />

                <div id='round'><i className="fa-solid fa-pen" onClick={handleUpload} id='pen'></i></div>

                <form encType="multipart/form-data" method='post'>


                    <input
                        type='file'
                        id='picInput'
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                        onChange={handleFileChange}
                    />
                </form>
                <div id='mainSection'>
                    <div id='accountSection'>
                        <h1 style={{ textTransform: 'capitalize' }}>{userInfo.name}</h1>
                        <p>{userInfo.email}</p>
                        <div id='span'>
                            <h3>{userInfo.notes.length}</h3>
                            <p>Notes</p>
                        </div>
                    </div>
                </div>
            </div>
            <ActivityLog />
        </>
    );
};

export default UserInfo;
