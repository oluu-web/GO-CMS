import React from "react";
import './Navbar.css';

const NavbarComponent = () => {




 return (
  <nav className="navbar navbar-light bg-light">
   <a className="navbar-brand" href="/">
    My Website
   </a>
   <ul className="nav">
    <li className="nav-item">
     <a className="nav-link" href="/home">Home</a>
    </li>
    <li className="nav-item">
     <a className="nav-link" href="/about">About</a>
    </li>
    <li className="nav-item">
     <a className="nav-link" href="/contact">Contact</a>
    </li>
   </ul>
   <button className="navbar-toggler"></button>
  </nav>

 );
};

export default NavbarComponent;
