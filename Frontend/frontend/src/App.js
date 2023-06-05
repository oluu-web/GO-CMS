import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Articles from './components/admin-components/Articles';
import EditArticle from './components/admin-components/AdminOneArticle';
import LoginPage from './components/admin-components/Login';
function App() {
  return (
    <Router>
      <Navbar />


      <div>
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
          {<Route path="/admin/article/:id" element={<EditArticle />} />}
          <Route path="/admin/articles" element={<Articles />} />
          {/* <Route path="/" element={<Home />} /> */}

        </Routes>
      </div>
      <Footer />
    </Router>



  );
}

export default App;
