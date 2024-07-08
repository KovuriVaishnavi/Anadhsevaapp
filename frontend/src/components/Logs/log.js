import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Log = () => {
    const [requests, setRequests] = useState([]);
    const [type, setType] = useState('donor'); // Default to 'donor'

    useEffect(() => {
        fetchRequests();
    }, [type]); // Add 'type' as a dependency

    const fetchRequests = async () => {
        let endpoint;
        switch (type) {
            case 'donor':
                endpoint = 'http://localhost:3001/api/request/donated';
                break;
            case 'receiver':
                endpoint = 'http://localhost:3001/api/request/received';
                break;
            case 'volunteer':
                endpoint = 'http://localhost:3001/api/request/volunteered';
                break;
            default:
                endpoint = 'http://localhost:3001/api/request/donated';
                break;
        }

        try {
            const response = await axios.get(endpoint, {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setRequests(response.data);
        } catch (error) {
            console.error('Error fetching requests:', error);
        }
    };

    const logHistory = () => {
        console.log('History of requests:', requests);
    };

    return (
        <div>
            <h1>Log History</h1>
            <select value={type} onChange={(e) => setType(e.target.value)}>
                <option value="donor">Donor</option>
                <option value="receiver">Receiver</option>
                <option value="volunteer">Volunteer</option>
            </select>

            <ul>
                {requests.map((request) => (
                    <li key={request._id}>
                        {request.donarName ? (
                            <span> {request.donarName}</span>
                        ) : request.receiverName ? (
                            <span> {request.receiverName}</span>
                        ) : (
                            <span>Volunteer: {request.volunteerId} - Donor: {request.donarName} - Receiver: {request.receiverName}</span>
                        )}: {request.loc} - Status: {request.status}
                    </li>
                ))}
            </ul>


        </div>
    );
};

export default Log;
