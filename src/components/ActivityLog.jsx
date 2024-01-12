import React, { useState, useEffect } from 'react';
import { getCookie } from '../utils/getCookie';


const ActivityLog = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getColorForAction = (actionMessage) => {
        console.log(actionMessage)
        if (actionMessage && actionMessage.toLowerCase().includes('uploaded')) {
            return 'cyan';
        } else if (actionMessage && actionMessage.toLowerCase().includes('added')) {
            return 'green';
        } else if (actionMessage && actionMessage.toLowerCase().includes('delete')) {
            return 'red';
        } else if (actionMessage && actionMessage.toLowerCase().includes('update')) {
            return 'orange';
        } else {
            return 'red';
        }
    };
    const fetchLogs = async () => {
        try {
            const response = await fetch('/api/auth/fetchlogs', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'JWT': getCookie('JWT')
                },
                credentials: 'include',
            });

            if (response.ok) {
                const data = await response.json();
                setLogs(data);
                data.forEach(log => {
                    const actionMessage = log.actionMessage;
                    console.log('Action Message:', actionMessage);
                    const color = getColorForAction(actionMessage);
                    console.log('Color:', color);
                });

            } else {
                throw new Error(`Error fetching logs: ${response.statusText}`);
            }

        } catch (error) {
            console.error('Error fetching logs:', error);
            setError('Error fetching logs');
        } finally {
            setLoading(false);
        }
    };

    const reversedLogs = [...logs].reverse();

    useEffect(() => {
        fetchLogs()

    }, []);
    return (
        <div>
            <h2>Logs</h2>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <ul>
                {reversedLogs.map((log) => (
                    <li key={log._id} style={{ color: getColorForAction(log.actionMessage), fontFamily: 'poppins' }}>
                        {log.actionMessage} on {log.timestamp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityLog
