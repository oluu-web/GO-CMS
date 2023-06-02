import React, { Fragment, Component } from "react";
// import { Link } from "react-router-dom";


export default class Articles extends Component {
  state = {
    articles: [],
    isLoaded: false,
    error: null,
  };

  componentDidMount() {
    fetch("http://localhost:4000/v1/articles")
      .then((response) => {
        if (response.status !== "200") {
          let err = Error;
          err.message = "Invalid response code: " + response.status;
          this.setState({ error: err });
        }
        return response.json();
      })
      .then((json) => {
        console.log(json.articles)
        this.setState({
          articles: json.articles,
          isLoaded: true,
        },
          (error) => {
            this.setState({
              isLoaded: true,
              error
            });
          }
        );
      })


  }

  render() {
    const { articles, isLoaded, error } = this.state;
    if (error) {
      return <div>Error: {error.message}</div>
    }
    else if (!isLoaded) {
      return <p>Loading...</p>
    }
    else {
      return (
        <Fragment>
          <h2>Choose an article</h2>
          <ul>
            {articles.map((m) => (
              <li key={m.id}>
                <a href={`/article/${m.id}`}>{m.content}</a>
              </li>
            ))}
          </ul>
        </Fragment>
      );
    }
  }
}