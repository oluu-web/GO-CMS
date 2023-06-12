import React from 'react';
import img from '../assets/sc.png'
import './Navbar.css'
const Navbar = () => {
 return (
  <nav className="navbar navbar-expand-lg navbar-light bg-light">
   <div className="container" style={{ margin: 0, padding: 0 }}>
    <div className="d-flex align-items-center">
     <a href='https://covenantuniversity.edu.ng/'>
      <img src="https://covenantuniversity.edu.ng/images/2021/02/08/cu-logo.png" alt="Covenant University Logo" className="logo" style={{ height: '80px', width: '80px' }} />
     </a>
     <div className="verticalLine mx-2"></div>
     <a href="/">
      <img src={img} alt="CUSC Logo" className="logo" style={{ height: '80px', width: '80px' }} />
     </a>
    </div>
    <button
     className="navbar-toggler"
     type="button"
     data-bs-toggle="collapse"
     data-bs-target="#navbarNav"
     aria-controls="navbarNav"
     aria-expanded="false"
     aria-label="Toggle navigation"
    >
     <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
     <ul className="navbar-nav ms-auto navLinks">
      <li className="nav-item ">
       <a className="nav-link" href="#">
        About Us
       </a>
      </li>
      <li className="nav-item">
       <a className="nav-link" href="#">
        Student Life
       </a>
      </li>
      <li className="nav-item">
       <a className="nav-link" href="#">
        Organisations
       </a>
      </li>
     </ul>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;
