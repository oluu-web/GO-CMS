import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";


export default function Articles() {
  const [articles, setArticles] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch('http://localhost:4000/v1/articles')
      .then((response) => {
        if (response.status !== 200) {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          setError(err);
        }
        return response.json();
      })
      .then((json) => {
        setArticles(json.articles);
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true)
        setError(error);
      });
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoaded) {
    return <p>Lodaing...</p>;
  } else {

    return (
      <Fragment>
        <h2>Articles</h2>

        <table className="table table-compactcable-striped">
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
                <Link to={`/admin/article/${a.id}`}>
                  <td>{a.title}</td> </Link>
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