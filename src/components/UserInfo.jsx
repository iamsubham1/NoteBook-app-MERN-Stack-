import React, { useState, useEffect } from 'react';
import '../components/css/UserInfo.css'
import { getCookie } from '../utils/getCookie';
import userImg from '../assets/user.png'

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {

        const fetchUserInfo = async () => {
            const token = getCookie('JWT')
            try {
                // Fetch user info
                const response = await fetch('http://localhost:4000/api/auth/getuser', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'JWT': token
                    },

                    credentials: 'include',
                });

                if (!response.ok) {
                    throw new Error('Error fetching user info');
                }

                const data = await response.json();
                setUserInfo(data.user);
                setLoading(false);


            } catch (error) {
                console.error('Error:', error.message);
                setError('Error fetching user info');
                setLoading(false);
            }
        };
        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (<>
        <div id='Wrapper' >
            <img src={userImg} style={{ width: "9%" }} id='userImg' alt=''></img>

            <div id='mainSection' >

                <div id='accountSection' >

                    <h1 style={{ textTransform: 'capitalize' }}> {userInfo.name}</h1>
                    <p > {userInfo.email}</p>
                    <div id='span'  > <h3 >{userInfo.notes.length}</h3>
                        <p>Notes</p></div>

                </div>



            </div>
        </div >
    </>

    );
};

export default UserInfo;
