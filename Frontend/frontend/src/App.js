import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Articles from './components/admin-components/Articles';
import EditArticle from './components/admin-components/AdminOneArticle';
import LoginPage from './components/admin-components/Login';
import CreateArticle from './components/admin-components/CreateArticle';
import ViewArticle from './components/user-components/ViewArticle';
import UserArticles from './components/user-components/UserArticles';
import About from './components/about'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Navbar />


      <div>
        <Routes>
          <Route path="/admin" element={<LoginPage />} />
          <Route path="/admin/article/new" element={<CreateArticle />} />
          <Route path="/admin/article/:id" element={<EditArticle />} />
          <Route path="/admin/articles" element={<Articles />} />

          <Route path="/article/:id" element={<ViewArticle />} />
          <Route path='/articles' element={<UserArticles />} />
          {/* <Route path="/" element={<Home />} /> */}
          <Route path="/about-us" element={<About />} />

        </Routes>
      </div>
      <Footer />
    </Router>



  );
}

export default App;
