import React, { useEffect, Fragment, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';


export default function ViewArticle() {
  const { id } = useParams();

  const [article, setArticle] = useState({
    id: id,
    title: "",
    content: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const url_view = 'http://localhost:4000/v1/article/'

  useEffect(() => {
    axios.get(url_view + id)
      .then((response) => {
        if (response.status !== 200) {
          let err = new Error();
          err.message = "Invalid response code: " + response.status;
          throw err;
        }
        return response.data;
      })
      .then((data) => {
        setArticle({
          title: data.article.title,
          content: data.article.content,
        });
        setIsLoaded(true)
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [id]);

  const str = article.content
  const result = str.split(/\r?\n/)



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <div style={{
          backgroundColor: '#37085C',
          height: '200px',
          width: '100%',
          textAlign: 'center',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: '10px',
        }}>
          <h1 style={{ color: '#FFFFFF' }}>{article.title}</h1>
        </div>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-10">
              {result.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}

