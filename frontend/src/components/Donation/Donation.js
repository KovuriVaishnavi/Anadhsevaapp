import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/Donation.css";
import DonateForm from "../DonateForm/DonateForm";

const DonationComponent = () => {
  const [requests, setRequests] = useState([]);
  const [formData, setFormData] = useState({
    foodItems: "",
    quantity: "",
    receiverId: "",
    shelfLife: "",
  });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/requests", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        setRequests(response.data);
      } catch (error) {
        console.error("Error fetching donation requests:", error);
      }
    };

    fetchRequests();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:5000/api/requests",
        formData,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log("Donation submitted:", response.data);
      // Reset form or handle success
    } catch (error) {
      console.error("Error submitting donation:", error);
    }
  };

  const openForm = (receiverId) => {
    setFormData({ ...formData, receiverId });
    setShowForm(true);
  };

  return (
    <div className="donation">
      <div className="instant-donate">
        <div className="filter">
          <button className="filter-button green-button">5 Km</button>
          <button className="filter-button green-button">10 Km</button>
          <button className="filter-button green-button">City</button>
          <button className="filter-button green-button">All</button>
        </div>
        <button className="instant-donate-button green-button">Donate</button>
      </div>
      <div className="map">
        
      </div>
      <div className="donation-requests">
        {requests.map((request) => (
          <div key={request.id} className="donation-request">
            <h3>{request.organization}</h3>
            <p>Location: {request.location}</p>
            <p>
              Amount needed: {request.amount} (feeds approx {request.people}{" "}
              people)
            </p>
            <button
              className="donate-button green-button"
              onClick={() => openForm(request.id)}
            >
              Donate
            </button>
          </div>
        ))}
        <div className="donation-request">
          <h3>organization</h3>
          <p>Location:</p>
          <p>Amount needed: (feeds approx people)</p>
          <button
            className="donate-button green-button"
            onClick={() => openForm(11)}
          >
            Donate
          </button>
        </div>
        <div className="donation-request">
          <h3>organization</h3>
          <p>Location:</p>
          <p>Amount needed: (feeds approx people)</p>
          <button
            className="donate-button green-button"
            onClick={() => openForm(11)}
          >
            Donate
          </button>
        </div>
        <div className="donation-request">
          <h3>organization</h3>
          <p>Location:</p>
          <p>Amount needed: (feeds approx people)</p>
          <button
            className="donate-button green-button"
            onClick={() => openForm(11)}
          >
            Donate
          </button>
        </div>
      </div>
      {showForm && <DonateForm />}
    </div>
  );
};

export default DonationComponent;
