import React, { useState, useEffect, Fragment } from 'react';
import { useParams } from 'react-router-dom';
import "./AdminOneMovie.css";
import Input from "./form-components/Input";
import TextArea from "./form-components/TextArea";

export default function EditArticle(props) {
  // const { id } = useParams();
  // console.log(id);
  const [article, setArticle] = useState({
    id: 1,
    title: "",
    content: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = (evt) => {
    console.log("Form was submitted");
    evt.preventDefault();
  };

  const handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  useEffect(() => {


    fetch("https://localhost:4000/v1/article/1")
      .then((response) => {
        if (response.status !== 200) {
          let err = new Error();
          err.message = "Invalid response code: " + response.status;
          throw err;
        }
        return response.json();
      })
      .then((json) => {
        setArticle({
          // id: id,
          title: json.article.title,
          content: json.article.content,
        });
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [props?.match?.params?.id]); // Check if props.match and its properties exist

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>Edit Movie</h2>
        <hr />
        <form onSubmit={handleSubmit}>
          <input
            type="hidden"
            name="id"
            id="id"
            value={article.id}
            onChange={handleChange}
          />

          <Input
            title={"Title"}
            type={"text"}
            name={"title"}
            value={article.title}
            handleChange={handleChange}
          />

          <TextArea
            title={"Content"}
            name={"content"}
            value={article.content}
            rows={"50"}
            handleChange={handleChange}
          />

          <hr />

          <button className="btn btn-primary">Save</button>
        </form>

        <div className="mt-3">
          <pre>{JSON.stringify({ article, isLoaded, error }, null, 3)}</pre>
        </div>
      </Fragment>
    );
  }
}
