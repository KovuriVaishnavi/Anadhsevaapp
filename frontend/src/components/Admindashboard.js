import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './styles/AdminDashboard.css';

const AdminDashboard = () => {
    const [metrics, setMetrics] = useState({
        totalDonations: 0,
        totalReceivers: 0,
        totalVolunteers: 0,
        inventoryStatus: { items: 0, categories: 0 },
    });
    const [activities, setActivities] = useState([]);
    const [pendingRequests, setPendingRequests] = useState([]);

    useEffect(() => {
        axios.get('/api/statistics')
            .then(response => {
                setMetrics(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the statistics!', error);
            });

        axios.get('/api/activities')
            .then(response => {
                setActivities(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the activities!', error);
            });

        axios.get('/api/pending-requests')
            .then(response => {
                setPendingRequests(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pending requests!', error);
            });
    }, []);

    const users = {
        donors: [
            { name: 'John Doe', email: 'john@example.com', donations: 10 },
            { name: 'Jane Smith', email: 'jane@example.com', donations: 7 },
        ],
        receivers: [
            { name: 'Alice Johnson', email: 'alice@example.com', requests: 5 },
            { name: 'Bob Brown', email: 'bob@example.com', requests: 3 },
        ],
        volunteers: [
            { name: 'Charlie White', email: 'charlie@example.com', hours: 20 },
            { name: 'Daisy Green', email: 'daisy@example.com', hours: 15 },
        ],
    };

    return (
        <div className="admin-dashboard">
            <div className="dashboard-header">
                <h1>Admin Dashboard</h1>
            </div>
            <div className="dashboard-metrics">
                <div className="metric-card">
                    <h2>Total Donations</h2>
                    <p>{metrics.totalDonations}</p>
                </div>
                <div className="metric-card">
                    <h2>Total Receivers</h2>
                    <p>{metrics.totalReceivers}</p>
                </div>
                <div className="metric-card">
                    <h2>Total Volunteers</h2>
                    <p>{metrics.totalVolunteers}</p>
                </div>
                <div className="metric-card">
                    <h2>Inventory Items</h2>
                    <p>{metrics.inventoryStatus.items}</p>
                </div>
                <div className="metric-card">
                    <h2>Inventory Categories</h2>
                    <p>{metrics.inventoryStatus.categories}</p>
                </div>
            </div>
            <div className="recent-activities">
                <h2>Recent Activities</h2>
                <ul>
                    {activities.map((activity, index) => (
                        <li key={index}>{activity}</li>
                    ))}
                </ul>
            </div>
            <div className="pending-requests">
                <h2>Pending Requests</h2>
                <ul>
                    {pendingRequests.map((request, index) => (
                        <li key={index}>{request}</li>
                    ))}
                </ul>
            </div>
            <div className="users-section">
                <h2>Donors</h2>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Donations</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.donors.map((donor, index) => (
                            <tr key={index}>
                                <td>{donor.name}</td>
                                <td>{donor.email}</td>
                                <td>{donor.donations}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="users-section">
                <h2>Receivers</h2>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Requests</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.receivers.map((receiver, index) => (
                            <tr key={index}>
                                <td>{receiver.name}</td>
                                <td>{receiver.email}</td>
                                <td>{receiver.requests}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="users-section">
                <h2>Volunteers</h2>
                <table className="user-table">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Hours</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.volunteers.map((volunteer, index) => (
                            <tr key={index}>
                                <td>{volunteer.name}</td>
                                <td>{volunteer.email}</td>
                                <td>{volunteer.hours}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminDashboard;
