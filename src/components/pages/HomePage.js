import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import moviesApi from "../services/moviesApi";
import MoviesGallery from "../pageDetails/MoviesGallery/MoviesGallery";

export default class HomePage extends Component {
  state = {
    movies: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    this.setState({ loading: true });

    moviesApi
      .fetchPopularMovies()
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <h1>Trending today</h1>
        {loading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <MoviesGallery movies={movies} />
      </div>
    );
  }
}
