import React, { Component } from "react";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";
import getQueryParams from "../utils/getQueryParams";
import moviesApi from "../services/moviesApi";
import SearchBar from "../pageDetails/SearchBar/SearchBar";
import MoviesGallery from "../pageDetails/MoviesGallery/MoviesGallery";

export default class MoviesPage extends Component {
  static propTypes = {
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired
  };

  state = {
    movies: [],
    loading: false,
    error: null
  };

  componentDidMount() {
    const { location } = this.props;
    const { query } = getQueryParams(location.search);
    if (query) {
      this.getSearchMovies(query);
    }
  }

  componentDodUpdate(prevProps, prevState) {
    const { query: prevQuery } = getQueryParams(prevProps.location.search);
    const { query: nextQuery } = getQueryParams(this.props.location.search);

    if (prevQuery !== nextQuery) {
      this.getSearchMovies(nextQuery);
    }
  }

  handleChangeQuery = query => {
    const { location, history } = this.props;
    this.getSearchMovies(query);
    history.push({
      ...location,
      search: `query=${query}`
    });
  };

  getSearchMovies = query => {
    this.setState({ loading: true });
    moviesApi
      .fetchMoviesWithQuery(query)
      .then(movies => this.setState({ movies }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { movies, loading, error } = this.state;
    return (
      <div>
        <SearchBar onSearch={this.handleChangeQuery} />
        {loading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        <MoviesGallery movies={movies} />
      </div>
    );
  }
}
