import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FaCamera, FaClock, FaMapMarkerAlt, FaUtensils, FaWeight } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './DonateForm.css';

const DonationForm = () => {
  const [foodItems, setFoodItems] = useState('');
  const [quantity, setQuantity] = useState('');
  const [shelfLife, setShelfLife] = useState('');
  const [location, setLocation] = useState('');
  const [picture, setPicture] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Dummy user data (for illustration, replace with actual user data from authentication context)
  const user = {
    donorId: '123456', // Example donorId
    donorName: 'John Doe', // Example donorName
    loc: 'Some Location', // Example loc
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('foodItems', foodItems);
    formData.append('quantity', quantity);
    formData.append('shelfLife', shelfLife);
    formData.append('location', location);
    formData.append('picture', picture);
    
    // Add user-specific data
    formData.append('donorId', user.donorId);
    formData.append('donorName', user.donorName);
    formData.append('loc', user.loc);

    try {
      const response = await axios.post('http://localhost:4000/api/donations', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      toast.success('Donation submitted successfully!');
      setShowModal(false);
      resetForm();
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error('Failed to submit donation.');
    }
  };

  const resetForm = () => {
    setFoodItems('');
    setQuantity('');
    setShelfLife('');
    setLocation('');
    setPicture(null);
  };

  return (
    <div className="container custom-modal">
      <Button onClick={() => setShowModal(true)} className="mb-3" style={styles.greenButton}>
        <FaUtensils className="me-2" /> Donate Food Items
      </Button>

      <Modal show={showModal} onHide={() => setShowModal(false)} dialogClassName="custom-modal">
        <Modal.Header closeButton >
          <Modal.Title>Donate</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit} style={styles.form}>
            <div className="row">
              <div className="col-md-6">
                <div className="mb-3">
                  <label className="form-label">
                    <FaUtensils className="me-2" />
                    Food Items:
                  </label>
                  <input
                    type="text"
                    value={foodItems}
                    onChange={(e) => setFoodItems(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FaWeight className="me-2" />
                    Quantity:
                  </label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FaClock className="me-2" />
                    Shelf Life (in hours):
                  </label>
                  <input
                    type="number"
                    value={shelfLife}
                    onChange={(e) => setShelfLife(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FaMapMarkerAlt className="me-2" />
                    Location:
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="form-control"
                    required
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">
                    <FaCamera className="me-2" />
                    Picture:
                  </label>
                  <input
                    type="file"
                    onChange={(e) => setPicture(e.target.files[0])}
                    className="form-control"
                    required
                  />
                </div>
                <Button type="submit" className="btn btn-success mt-3">
                  Submit Donation
                </Button>
              </div>
              <div className="col-md-6">
                <div style={styles.mapBox}>
                  <p style={styles.mapPlaceholderText}>
                    Placeholder for Map Component
                  </p>
                </div>
              </div>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* ToastContainer for displaying toasts */}
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

const styles = {
  greenButton: {
    backgroundColor: '#28a745',
    borderColor: '#28a745',
  },
  form: {
    minWidth: '400px',
  },
  mapBox: {
    height: '400px',
    border: '1px solid #ccc',
    marginTop: '20px',
    backgroundColor: '#fff',
  },
  mapPlaceholderText: {
    textAlign: 'center',
    paddingTop: '150px',
    fontSize: '18px',
    color: '#999'
  }
};

export default DonationForm;
