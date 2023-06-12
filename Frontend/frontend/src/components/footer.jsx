import React from 'react';
import { Twitter, Instagram, LinkedIn, YouTube, Phone, Mail } from '@mui/icons-material';

export default function Footer() {


 const iconButtonStyle = {
  width: '40px',
  height: '40px',
  color: 'white',
 }

 const iconStyle = {
  display: 'inline-block',
  backgroundColor: '#747474',
  width: '100px',
  height: '100px',
  borderRadius: '100%',
  marginRight: '10px',

 };

 const infoStyle = {
  marginTop: '1px',
 };

 return (
  <footer style={{ backgroundColor: '#37085C', height: '200px', width: '100%', marginTop: '10px' }}>
   <div className="container d-flex flex-column align-items-center justify-content-center h-100">
    <div className="footerItems">
     <a href="https://twitter.com">
      <Twitter style={iconButtonStyle} />
     </a>
     <a href="https://instagram.com">
      <Instagram style={iconButtonStyle} />
     </a>
     <a href="https://youtube.com">
      <YouTube style={iconButtonStyle} />
     </a>
     <a href="https://linkedin.com">
      <LinkedIn style={iconButtonStyle} />
     </a>
    </div>

    <div className="contactInfo mt-2" style={{ color: 'white' }}>
     <div className="d-flex flex-column align-items-center">
      <div style={infoStyle}><Phone /> +234 903 355 0046</div>
      <div style={infoStyle}><Mail />info@covenantuniversity.edu.ng</div>
     </div>
    </div>
   </div>
  </footer>
 );
};