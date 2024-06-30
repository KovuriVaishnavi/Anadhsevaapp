import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const location = useLocation();
  const isUserTypeSelection = location.pathname === '/user-type-selection';

  return (
    <header className="header">
      <div className="logo">Charity</div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          {isUserTypeSelection ? (
            <li><Link to="/logs">Logs</Link></li>
          ) : (
            <>
              <li><Link to="/about">About</Link></li>
              <li><Link to="/causes">Latest Causes</Link></li>
              <li><Link to="/events">Social Events</Link></li>
              <li><Link to="/blog">Blog</Link></li>
              <li><Link to="/contact">Contact</Link></li>
              <li><Link to="/login">Login</Link></li>
              <li><Link to="/register">Register</Link></li>
            </>
          )}
        </ul>
      </nav>
      {!isUserTypeSelection && <button className="donate-button">Donate</button>}
    </header>
  );
};

export default Header;



// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import { useAuth } from './context/AuthProvider';
// import './styles/Header.css';

// const Header = () => {
//     const [menuOpen, setMenuOpen] = useState(false);
//     const { user, logout } = useAuth();

//     const toggleMenu = () => {
//         setMenuOpen(!menuOpen);
//     };

//     return (
//         <header className="header">
//             <div className="logo">Anadh Seva</div>
//             <div className="menu-icon" onClick={toggleMenu}>
//                 &#9776;
//             </div>
//             <nav>
//                 <ul className={menuOpen ? 'show' : ''}>
//                     <li><Link to="/">Home</Link></li>
//                     <li><Link to="/aboutus">About</Link></li>
//                     <li><Link to="/contactus">Contact</Link></li>
//                     {user ? (
//                         <>
//                             <li><Link to="/receive">Receive</Link></li>
//                             <li><Link to="/donate">Donate</Link></li>
//                             <li><Link to="/volunteer">Volunteer</Link></li>
//                             <li><button className="logout-button" onClick={logout}>Logout</button></li>
//                         </>
//                     ) : (
//                         <>
//                             <li><Link to="/login">Login</Link></li>
//                             <li><Link to="/register">Register</Link></li>
//                         </>
//                     )}
//                 </ul>
//             </nav>
//         </header>
//     );
// };

// export default Header;
