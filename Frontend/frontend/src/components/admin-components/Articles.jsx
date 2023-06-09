import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";

export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

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

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <div className="d-flex justify-content-between mb-3 align-items-center mx-10">
          <h2 className="mx-10">Articles</h2>
          <Link to={`/admin/article/new`}>
            <Button variant="primary" className="mx-10">Create New</Button>
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
            {articles.map((a) => (
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
      </Fragment>
    );
  }
}
