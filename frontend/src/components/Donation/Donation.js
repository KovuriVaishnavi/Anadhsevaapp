import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Donation.css";
import DonateForm from "../DonateForm/DonateForm";
import Maps from "../Maps";

const DonationComponent = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [requestId, setRequestId] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3001/api/request/pending",
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );

        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const openForm = (id) => {
    setRequestId(id);
    setShowForm(true);
  };

  const instantDonate = () => {
    setShowForm(true);
  }

  return (
    <div className="donation">
      <div className="instant-donate">
        <div className="filter">
          <button className="filter-button green-button">5 Km</button>
          <button className="filter-button green-button">10 Km</button>
          <button className="filter-button green-button">City</button>
          <button className="filter-button green-button">All</button>
        </div>
        <button className="instant-donate-button green-button" onClick={() => instantDonate()}>Donate</button>
      </div>
      <div className="flex-donation">

      <div className="map">
        <Maps donorLocation={JSON.parse(localStorage.getItem("user")).location} requests={requests} />
      </div>
      <div className="donation-requests">
        {requests.map((request) => (
          <div key={request._id} className="donation-request">
            <h3>{request.receiverName}</h3>
            <p>Location: {request.location.name}</p>
            <p>
              Amount needed: {request.quantity} (feeds approx {request.quantity}{" "}
              people)
            </p>
            <button
              className="donate-button green-button"
              onClick={() => openForm(request._id)}
              >
              Donate
            </button>
          </div>
        ))}
        </div>
      </div>
      {showForm && <DonateForm requestId={requestId}/>}
    </div>
  );
};

export default DonationComponent;
