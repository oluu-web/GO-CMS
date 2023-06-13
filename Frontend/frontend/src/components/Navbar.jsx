import React from 'react';
import img from '../assets/sc.png'
import { Link } from 'react-router-dom';
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
       <Link to={"/about-us"} className="nav-link">
        About Us
       </Link>
      </li>
      <li className="nav-item">
       <Link to={"/student-life"} className="nav-link">
        Student Life
       </Link>
      </li>
      <li className="nav-item">
       <Link to={"/organisations"} className='nav-link'>Organisations</Link>
      </li>
     </ul>
    </div>
   </div>
  </nav>
 );
};

export default Navbar;


// import React from 'react';
// import img from '../assets/sc.png';
// import { Link } from 'react-router-dom';
// import './Navbar.css';

// const Navbar = () => {
//  return (
//   <nav className="navbar navbar-expand-lg navbar-light">
//    <div className="container">
//     <Link to="https://covenantuniversity.edu.ng/" className="navbar-brand">
//      <img src="https://covenantuniversity.edu.ng/images/2021/02/08/cu-logo.png" alt="Covenant University Logo" className="logo" style={{ height: '80px', width: '80px' }} />
//     </Link>
//     <div className="verticalLine mx-2"></div>
//     <Link to="/" className="navbar-brand">
//      <img src={img} alt="CUSC Logo" className="logo" style={{ height: '80px', width: '80px' }} />
//     </Link>
//     <button
//      className="navbar-toggler"
//      type="button"
//      data-bs-toggle="collapse"
//      data-bs-target="#navbarNav"
//      aria-controls="navbarNav"
//      aria-expanded="false"
//      aria-label="Toggle navigation"
//      style={{ marginLeft: '10px' }} // Added style to position the hamburger menu at the right side
//     >
//      <span className="navbar-toggler-icon"></span>
//     </button>
//     <div className="collapse navbar-collapse" id="navbarNav">
//      <ul className="navbar-nav ms-auto navLinks">
//       <li className="nav-item">
//        <Link to={"/about-us"} className="nav-link">
//         About Us
//        </Link>
//       </li>
//       <li className="nav-item">
//        <Link to={"/student-life"} className="nav-link">
//         Student Life
//        </Link>
//       </li>
//       <li className="nav-item">
//        <Link to={"/organisations"} className='nav-link'>Organisations</Link>
//       </li>
//      </ul>
//     </div>
//    </div>
//   </nav>
//  );
// };

// export default Navbar;
