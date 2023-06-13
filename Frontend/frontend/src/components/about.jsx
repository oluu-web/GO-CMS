import React, { Fragment, useEffect, useState } from 'react';

export default function About() {
 const [members, setMembers] = useState([]);
 const [isLoaded, setIsLoaded] = useState(false);
 const [error, setError] = useState(null);

 useEffect(() => {
  fetch('http://localhost:4000/v1/council')
   .then((response) => {
    if (response.status !== 200) {
     let err = new Error();
     err.message = "Invalid response code: " + response.status;
     throw err;
    }
    return response.json();
   })
   .then((json) => {
    setMembers(json.council);
    setIsLoaded(true);
   })
   .catch((error) => {
    setIsLoaded(true);
    setError(error);
   });
 }, []);

 if (error) {
  return <div>Error: {error.message}</div>;
 } else if (!isLoaded) {
  return <p>Loading...</p>;
 } else {
  return (
   <Fragment>
    <div
     style={{
      backgroundColor: '#37085C',
      height: '200px',
      width: '100%',
      textAlign: 'center',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: '10px',
     }}
    >
     <h1 style={{ color: '#FFFFFF' }}>About Us</h1>
    </div>
    <section className="container">
     <div className="row justify-content-center">
      <div className="col-10">
       <p>
        The Covenant University Student Council is an elected body of students who represent the student body of the prestigious institution, Covenant University.
       </p>
       <p>
        We act as a bridge between the students and the administration, working to improve the overall academic, social, and cultural experience of the students.
       </p>
       <p>
        As a student council, our mission is to advocate for the needs and concerns of our fellow students, create a positive and inclusive campus culture, and foster a sense of community within our institution.
       </p>
       <p>
        We aim to provide opportunities for student engagement and leadership, organize events and activities, and promote academic excellence.
       </p>
      </div>
     </div>
    </section>

    <section style={{ paddingTop: '20px', paddingBottom: '20px', marginLeft: '50px', marginRight: '50px' }}>
     <div>
      <h2 style={{ textAlign: 'center' }}>Meet the Student Leaders</h2>
     </div>

     <br />

     <div className="card-deck">
      <div className="row">
       {members.map((m) => (
        <div className="col-lg-4" key={m.id}>
         <div className="card mb-4">
          <img src={m.url} className="card-img-top" alt={m.name} width="320" height="500" />
          <div className="card-body">
           <h5 className="card-title">{m.name}</h5>
           <p className="card-text">{m.post}</p>
          </div>
         </div>
        </div>
       ))}
      </div>
     </div>
    </section>
   </Fragment>
  );
 }
}
