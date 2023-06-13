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
     <a href="https://twitter.com/CUHEBRON" target='_blank'>
      <Twitter style={iconButtonStyle} />
     </a>
     <a href="https://www.instagram.com/studentcouncil_cu/" target='_blank'>
      <Instagram style={iconButtonStyle} />
     </a>
     <a href="https://youtube.com/@cuscpress9530" target='_blank'>
      <YouTube style={iconButtonStyle} />
     </a>
     <a href="https://www.linkedin.com/company/covenant-university-student-council/" target='_blank'>
      <LinkedIn style={iconButtonStyle} />
     </a>
    </div>

    <div className="contactInfo mt-2" style={{ color: 'white' }}>
     <div className="d-flex flex-column align-items-center">
      <div style={infoStyle}><Phone />
       <a href='tel:+234 903 355 0046' style={{ color: '#ffffff', textDecoration: 'none', }}>+234 903 355 0046</a>
      </div>
      <div style={infoStyle}><Mail />
       <a href='mailto:info@covenantuniversity.edu.ng' style={{ color: '#ffffff', textDecoration: 'none', }}>
        info@covenantuniversity.edu.ng
       </a></div>
     </div>
    </div>
   </div>
  </footer>
 );
};