import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
 const [email, setEmail] = useState('');
 const [password, setPassword] = useState('');
 const [loginSuccess, setLoginSuccess] = useState(false);
 const [loginError, setLoginError] = useState(false);
 const navigate = useNavigate();

 const handleSubmit = async (e) => {
  e.preventDefault();

  const response = await fetch('http://localhost:4000/v1/login', {
   method: 'POST',
   headers: {
    'Content-Type': 'application/json',
   },
   body: JSON.stringify({ email, password }),
  });

  const data = await response.json()
  if (data.response.ok) {
   console.log("Login successful", data)
   setLoginSuccess(true);
   setLoginError(false);
   navigate('/admin/articles')
  } else {
   console.log("Login failed", data);
   setLoginSuccess(false);
   setLoginError(true)
  }
 };

 return (
  <div className="container d-flex justify-content-center align-items-center vh-100">
   <div className="card col-6">
    <div className="card-body">
     <h2 className="card-title text-center">Login</h2>
     <div className="row">
      <div>
       <form onSubmit={handleSubmit}>
        <div className="mb-3">
         <label htmlFor="email" className="form-label">Email:</label>
         <input
          type="email"
          className="form-control"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
         />
        </div>
        <div className="mb-3">
         <label htmlFor="password" className="form-label">Password:</label>
         <input
          type="password"
          className="form-control"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
         />
         {loginSuccess && <p className="text-success">Login successful!</p>}
         {loginError && <p className="text-danger">Invalid username or password</p>}
        </div>
        <div className="text-center">
         <button type="submit" className="btn btn-primary w-50">Log in</button>
        </div>
       </form>
      </div>
     </div>
    </div>
   </div>
  </div>
 );
};

export default Login;
