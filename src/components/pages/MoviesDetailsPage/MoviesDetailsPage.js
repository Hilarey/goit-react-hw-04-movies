import React, { Component } from "react";
import { Link, Switch, Route } from "react-router-dom";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import PropTypes from "prop-types";
import moviesApi from "../../services/moviesApi";
import MoviesCastPage from "../../pageDetails/MoviesCastPage/MoviesCastPage";
import MoviesReviewsPage from "../../pageDetails/MoviesReviewsPage/MoviesReviewsPage";
import routes from "../../../routes";
import styles from "./MoviesDetailesPage.module.css";

export default class MoviesDetailsPage extends Component {
  static propTypes = {
    match: PropTypes.instanceOf(Object).isRequired,
    location: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.instanceOf(Object).isRequired
  };
  state = {
    movies: null,
    loading: false,
    error: null
  };

  componentDidMount() {
    const { match } = this.props;
    this.setState({ loading: true });

    moviesApi
      .fetchDetailMovies(match.params.moviesId)
      .then(movies => {
        return this.setState({
          movies: movies
        });
      })
      .catch(error => this.setState({ error }))
      .finally(() => this.setState({ loading: false }));
  }

  handleGoBack = () => {
    const { location, history } = this.props;
    if (location.state && location.state.from) {
      return history.push(location.state.from);
    }
    history.push(routes.HOME);
  };

  render() {
    const { movies, loading, error } = this.state;
    const { match, location } = this.props;
    return (
      <div>
        {movies && (
          <div>
            <button
              className={styles.button}
              type="button"
              onClick={this.handleGoBack}
            >
              Go back
            </button>
            {loading && (
              <Loader type="Puff" color="#00BFFF" height={50} width={50} />
            )}
            {error && <p>Whoops, something went wrong: {error.message}</p>}
            <div className={styles.wrap}>
              <div>
                {movies.poster_path && (
                  <img
                    src={`https://image.tmdb.org/t/p/w300/${movies.poster_path}`}
                    alt="poster"
                  />
                )}
              </div>
              <div className={styles.text}>
                <p className={styles.title}>
                  {`${movies.original_title}  (${movies.release_date.slice(
                    0,
                    4
                  )})`}
                </p>

                <p>User score: {movies.vote_average * 10}%</p>
                <p className={styles.title}>Overview</p>
                <p>{movies.overview}</p>
                <p className={styles.title}>Genres</p>
                <div>
                  {movies.genres.map(({ id, name }) => (
                    <span key={id}>{name}&nbsp;</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
        <h3>Additional information</h3>
        <ul>
          <li>
            <Link
              to={{
                pathname: `${match.url}/Cast`,
                state: location.state
              }}
            >
              Cast
            </Link>
          </li>
          <li>
            <Link
              to={{
                pathname: `${match.url}/Reviews`,
                state: location.state
              }}
            >
              Reviews
            </Link>
          </li>
        </ul>
        <Switch>
          <Route exact path={routes.MOVIES_CAST} component={MoviesCastPage} />
          <Route
            exact
            path={routes.MOVIES_REVIEWS}
            component={MoviesReviewsPage}
          />
        </Switch>
      </div>
    );
  }
}
