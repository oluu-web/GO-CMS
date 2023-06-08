import React, { useState, Fragment } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import "./AdminOneMovie.css";
import Input from "../form-components/Input";
import TextArea from "../form-components/TextArea";
import Alert from "../ui-components/Alert";

export default function CreateArticle() {

  const [article, setArticle] = useState({
    title: "",
    content: "",
  });
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState([]);
  const url_create = 'http://localhost:4000/v1/admin/new';
  const navigate = useNavigate();
  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("Form was submitted");
    let validationErrors = [];

    if (article.title === "") {
      validationErrors.push("title");
    }

    if (article.content === "") {
      validationErrors.push("content");
    }

    setErrors(validationErrors);

    if (validationErrors.length > 0) {
      return false;
    }

    axios.post(url_create, article)
      .then(response => {
        console.log(response);
        navigate('/admin/articles')
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

  const hasError = (key) => {
    return errors.includes(key);
  };

  if (error) {
    return <div>Error: {error.message}</div>;
  } else {
    return (
      <Fragment>
        <h2>Create Article</h2>
        <Alert alertType={alert.type} alertMessage={alert.message} />
        <br />
        <hr />
        <form onSubmit={handleSubmit}>
          <Input
            className={hasError("title") ? "is-invalid" : ""}
            title={"Title"}
            type={"text"}
            name={"title"}
            value={article.title}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
            handleChange={handleChange}
          />

          <TextArea
            className={hasError("content") ? "is-invalid" : ""}
            title={"Content"}
            name={"content"}
            value={article.content}
            rows={"10"}
            errorDiv={hasError("content") ? "text-danger" : "d-none"}
            handleChange={handleChange}
          />

          <hr />
          <div>
            <button className="btn btn-primary" type="submit">Save</button>
          </div>
        </form>
      </Fragment>
    );
  }
}
