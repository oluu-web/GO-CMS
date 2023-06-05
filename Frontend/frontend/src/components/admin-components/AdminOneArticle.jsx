import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import "./AdminOneMovie.css";
import Input from "../form-components/Input";
import TextArea from "../form-components/TextArea";

export default function EditArticle() {
  const { id } = useParams();
  // console.log(id)

  const [article, setArticle] = useState({
    id: "",
    title: "",
    content: "",
  });
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState(null);

  const url = 'http://localhost:4000/v1/admin/editarticle/'

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("Form was submitted");

    axios.put(url + id, article) // Removed unnecessary wrapping of article in an object
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
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
    axios.get("http://localhost:4000/v1/article/" + id) // Used axios.get() instead of fetch()
      .then((response) => {
        if (response.status !== 200) {
          let err = new Error();
          err.message = "Invalid response code: " + response.status;
          throw err;
        }
        return response.data; // Accessed response data instead of calling response.json()
      })
      .then((data) => { // Changed the variable name from json to data
        setArticle({
          id: data.article.id, // Accessed data.article.id instead of json.article.id
          title: data.article.title,
          content: data.article.content,
        });
        setIsLoaded(true);
      })
      .catch((error) => {
        setIsLoaded(true);
        setError(error);
      });
  }, [id]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <p>Loading...</p>;
  } else {
    return (
      <Fragment>
        <h2>Edit Article</h2>
        <br />
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
            rows={"10"}
            handleChange={handleChange}
          />

          <hr />

          <button className="btn btn-primary">Save</button>
        </form>
      </Fragment>
    );
  }
}

