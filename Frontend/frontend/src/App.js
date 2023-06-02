import React from 'react';
import Navbar from './components/Navbar';
import Footer from './components/footer';
import Header from './components/Header';
import Articles from './components/Articles';
import LoginPage from './components/Login';
function App() {
  return (
    <div>
      {/* <Header /> */}
      <Navbar />
      <LoginPage />
      <Footer />
    </div>


  );
}

export default App;
