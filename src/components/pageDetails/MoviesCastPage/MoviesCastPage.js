import React, { Component } from "react";
import PropTypes from "prop-types";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import moviesApi from "../../services/moviesApi";

export default class MoviesCastPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired
  };

  state = {
    cast: null,
    loading: false,
    error: null
  };

  componentDidMount() {
    const { match } = this.props;
    this.getCastMovies(match.params.moviesId);
  }

  getCastMovies = query => {
    this.setState({ loading: true });
    moviesApi
      .fetchCastMovies(query)
      .then(cast => this.setState({ cast }))
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  };

  render() {
    const { cast, loading, error } = this.state;
    return (
      <div>
        {loading && (
          <Loader type="Puff" color="#00BFFF" height={50} width={50} />
        )}
        {error && <p>Whoops, something went wrong: {error.message}</p>}
        {cast &&
          cast.map(({ id, character, name, profile_path }) => (
            <div key={id}>
              {profile_path && (
                <img
                  src={`https://image.tmdb.org/t/p/w200${profile_path}`}
                  alt="photoActor"
                />
              )}
              <h3>Hero: {character}</h3>
              <p>Actor: {name}</p>
            </div>
          ))}
      </div>
    );
  }
}
