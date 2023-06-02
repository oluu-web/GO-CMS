import React, { Component } from "react";

class Header extends Component {
 render() {
  return (
   <header>
    <div className="container">
     <div className="row">
      <div className="col-md-12">
       <h1>My Website</h1>
       <p>This is my website.</p>
       <nav>
        <ul>
         <li><a href="/home">Home</a></li>
         <li><a href="/about">About</a></li>
         <li><a href="/contact">Contact</a></li>
        </ul>
       </nav>
      </div>
     </div>
    </div>
   </header>
  );
 }
}

export default Header;
