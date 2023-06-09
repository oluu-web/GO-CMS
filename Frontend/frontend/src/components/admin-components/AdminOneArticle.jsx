import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import "./AdminOneMovie.css";
import Input from "../form-components/Input";
import TextArea from "../form-components/TextArea";
import Alert from "../ui-components/Alert";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";



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
  const [errors, setErrors] = useState([]);
  const [alert, setAlert] = useState({ type: "d-none", message: "" });
  const navigate = useNavigate();

  const url_edit = 'http://localhost:4000/v1/admin/editarticle/'
  const url_delete = 'http://localhost:4000/v1/admin/deletearticle/'

  const handleSubmit = (evt) => {
    evt.preventDefault();

    console.log("Form was submitted");
    let errors = [];
    if (article.title === "") {
      errors.push("title");
    }

    setErrors(errors);

    if (errors.length > 0) {
      return false;
    }


    const data = new FormData(evt.target);
    const payload = Object.fromEntries(data.entries());

    axios.put(url_edit + id, article)
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
  };

  const handleDelete = (evt) => {
    evt.preventDefault();

    confirmAlert({
      title: "Delete Article?",
      message: "Are you sure?",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            // delete the movie
            axios.delete(url_delete + id)
              .then((response) => {
                console.log(response.data);
              })
            navigate('/admin/articles')
          },
        },
        {
          label: "No",
          onClick: () => { },
        },
      ],
    })
  }

  const handleChange = (evt) => {
    let value = evt.target.value;
    let name = evt.target.name;
    setArticle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const hasError = (key) => {
    return errors.indexOf(key) !== -1;
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
        <Alert alertType={alert.type} alertMessage={alert.message} />
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
            className={hasError("title") ? "is-invalid" : ""}
            title={"Title"}
            type={"text"}
            name={"title"}
            value={article.title}
            errorDiv={hasError("title") ? "text-danger" : "d-none"}
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
          <div>
            <button className="btn btn-primary">Save</button>
            <button
              className='btn btn-danger'
              onClick={handleDelete}
            >Delete</button>
          </div>
        </form>
      </Fragment>
    );
  }
}

