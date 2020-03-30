import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import routes from "../../../routes";
import styles from "../MoviesGallery/MoviesGallery.module.css";

class MoviesGallery extends Component {
  render() {
    const { movies, location } = this.props;
    return (
      <>
        {movies && movies.length > 0 && (
          <ul className={styles.list}>
            {movies.map(({ id, title, name }) => (
              <li key={id} className={styles.listItem}>
                <Link
                  to={{
                    pathname: `${routes.MOVIES}/${id}`,
                    state: { from: location }
                  }}
                >
                  {title ? title : name}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </>
    );
  }
}

export default withRouter(MoviesGallery);
