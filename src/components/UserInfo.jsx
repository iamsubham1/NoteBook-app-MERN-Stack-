import React, { useState, useEffect } from 'react';
import { getCookie } from '../utils/getCookie';

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
                        'JWT': token// Assuming you store the token in localStorage
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

        // Call the fetchUserInfo function
        fetchUserInfo();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            <h1>User Information</h1>
            <p>User ID: {userInfo._id}</p>
            <p>Email: {userInfo.email}</p>
            {/* Add other user details as needed */}
        </div>
    );
};

export default UserInfo;
