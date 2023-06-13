import React, { useEffect, useState, Fragment } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './UserArticles.css'



export default function UserArticles() {

 // console.log(id)

 const [articles, setArticles] = useState([]);
 const [isLoaded, setIsLoaded] = useState(false);
 const [error, setError] = useState(null);
 const [currentPage, setCurrentPage] = useState(1);
 const navigate = useNavigate();

 useEffect(() => {
  fetch('http://localhost:4000/v1/articles')
   .then((response) => {
    if (response.status !== 200) {
     let err = new Error();
     err.message = "Invalid response code: " + response.status;
     throw err;
    }
    return response.json();
   })
   .then((json) => {
    setArticles(json.articles);
    setIsLoaded(true);
   })
   .catch((error) => {
    setIsLoaded(true);
    setError(error);
   });
 }, []);

 const totalPages = Math.ceil(articles.length / 10);

 const handlePageChange = (pageNumber) => {
  setCurrentPage(pageNumber);
 };

 const renderPaginationButtons = () => {
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
   pageNumbers.push(i);
  }
  return (
   <div className="pagination">
    {pageNumbers.map((number) => (
     <button
      key={number}
      className={currentPage === number ? "active" : ""}
      onClick={() => handlePageChange(number)}
     >{number}</button>
    ))}
   </div>
  );
 }

 if (error) {
  return <div>Error: {error.message}</div>;
 } else if (!isLoaded) {
  return <p>Loading...</p>;
 } else {
  const indexOfLastArticle = currentPage * 10;
  const indexOfFirstArticle = indexOfLastArticle - 10;
  const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)

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
     }}>
     <h1 style={{ color: '#FFFFFF' }}>Articles</h1>
    </div>

    <section className="container">
     <div className='row justify-content-center'>
      <div className='col-10'>
       {currentArticles.map((a) => (
        <Link to={`/article/${a.id}`}>
         <h3>{a.title}</h3>
         <p>
          {a.content.slice(0, 20)} ....
         </p>
        </Link>
       ))}
      </div>

      <div className='pagination-contaier'>
       {renderPaginationButtons()}
      </div>
     </div>
    </section>
   </Fragment>
  )
 }
}