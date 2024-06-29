import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import DonationForm from './DonateForm/DonateForm';
import Footer from './Footer'; // Import the Footer component
import img3 from './images/about1.png'; // Ensure you have this image in the specified path
import missionImg from './images/image.png'; // Update with the correct path
import './styles/Home.css';

const Home = () => {
  // State variables for metrics
  const [donations, setDonations] = useState(6200);
  const [fundsRaised, setFundsRaised] = useState(80);
  const [volunteers, setVolunteers] = useState(256);
  const [recipients, setRecipients] = useState(256);

  return (
    <div className="home">
      <section className="hero">
        {/* Your hero section content */}
      </section>

      <section className="mission-section">
        <div className="mission-text">
          <h2>Our Helping To The World.</h2>
          <p>Onsectetur adipiscing elit, sed do eiusmod tempor incididunt ut bore et dolore magnat, sed do eiusmod.</p>
          <div className="mission-button">
            {/* <Link to="/donate">
              <button className="donate-button">Donate</button>
            </Link> */}
            <DonationForm/>
            <div className="phone">
              <i className="fas fa-phone-alt"></i> +12 1325 41
            </div>
          </div>
        </div>
        <div className="mission-image">
          <img src={missionImg} alt="Child" />
        </div>
      </section>
      <section className="services">
        <h2>Help The Helpless</h2>
        <div className="service-cards">
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-hands-helping"></i>
            </div>
            <h3>Volunteers</h3>
            <p>
              Our volunteers are the backbone of our organization. Join us to make a difference in the community.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-donate"></i>
            </div>
            <h3>Donors</h3>
            <p>
              Generous donors provide the necessary resources to keep our mission alive and thriving.
            </p>
          </div>
          <div className="service-card">
            <div className="service-icon">
              <i className="fas fa-user-friends"></i>
            </div>
            <h3>Recipients</h3>
            <p>
              We support recipients by providing essential food items and resources to help them in times of need.
            </p>
          </div>
        </div>
      </section>
      <section className="foundation">
        <div className="foundation-content">
          <div className="foundation-text">
            <h2>About Our Foundation</h2>
            <h3>We Are In A Mission To Help The Helpless</h3>
            <p>
              Our foundation is dedicated to fighting hunger and providing support
              to those in need. We believe in ensuring that no one goes hungry
              and everyone has access to healthy and nutritious food.
            </p>
            <p>
              Join us in our mission to make a difference in the lives of the
              helpless. Together, we can provide food and hope to those who need
              it most.
            </p>
            <Link to='/aboutus'><button>About Us</button></Link>
          </div>
          <div className="foundation-images">
            <img src={img3} alt="Foundation" />
          </div>
        </div>
      </section>

      <section className="call-to-action">
        <h2>Let's Change the World With Humanity</h2>
        <button>Become a Volunteer</button>
      </section>



      <section className="metrics">
        <div className="metric">
          <p>{donations}+</p>
          <h3>Donations</h3>
        </div>
        <div className="metric">
          <p>{fundsRaised}+</p>
          <h3>Fund Raised</h3>
        </div>
        <div className="metric">
          <p>{volunteers}+</p>
          <h3>Volunteers</h3>
        </div>
        <div className="metric">
          <p>{recipients}+</p>
          <h3>Recipients</h3>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
