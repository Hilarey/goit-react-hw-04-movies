import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";
import moviesApi from "../../services/moviesApi";

export default class MoviesReviewsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired
  };

  state = {
    reviews: null,
    loading: false,
    error: null
  };

  componentDidMount() {
    const { match } = this.props;
    this.getReviewsMovies(match.params.moviesId);
  }

  getReviewsMovies = query => {
    this.setState({ loading: true });
    moviesApi
      .fetchReviewsMovies(query)
      .then(reviews => this.setState({ reviews }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { reviews, loading, error } = this.state;
    const message = "We don`t have any reviews for this movie";
    return (
      <div>
        {loading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {reviews &&
          (reviews.length === 0 ? (
            <p>{message}</p>
          ) : (
            <ul>
              {reviews.map(({ id, author, content }) => (
                <li key={id}>
                  <div>
                    <h2>{author}</h2>
                    <p>{content}</p>
                  </div>
                </li>
              ))}
            </ul>
          ))}
      </div>
    );
  }
}
