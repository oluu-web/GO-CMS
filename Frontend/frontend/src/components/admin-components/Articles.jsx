import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import './Articles.css'

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [articlesPerPage, setArticlesPerPage] = useState(10);

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
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleArticlesPerPageChange = (evt) => {
    setArticlesPerPage(Number(evt.target.value));
    setCurrentPage(1);
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
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {

    const indexOfLastArticle = currentPage * articlesPerPage;
    const indexOfFirstArticle = indexOfLastArticle - articlesPerPage;
    const currentArticles = articles.slice(indexOfFirstArticle, indexOfLastArticle)
    return (
      <Fragment>
        <div className="d-flex justify-content-between mb-3 align-items-center mx-10">
          <h2 className="mx-10" style={{ marginLeft: '10px', marginTop: '10px' }}>Articles</h2>
          <Link to={`/admin/article/new`}>
            <Button variant="primary" className="mx-10" style={{ marginRight: '10px', marginTop: '10px' }}>Create New</Button>
          </Link>
        </div>
        <table className="table table-bright table-striped table-hover">
          <thead>
            <tr>
              <th>Name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {currentArticles.map((a) => (
              <tr key={a.id}>
                <td>
                  <Link to={`/admin/article/${a.id}`}>{a.title}</Link>
                </td>
                <td>{a.created_at}</td>
                <td>{a.updated_at}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className='pagination-container'>
          {renderPaginationButtons()}
          <select
            // className="pagination-select"
            value={articlesPerPage}
            onChange={handleArticlesPerPageChange}
          >
            <option value={10}>10</option>
            <option value={50}>50</option>
            <option value={100}>100</option>
          </select>
        </div>
      </Fragment>
    );
  }
}
