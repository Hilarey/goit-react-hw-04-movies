import React, { Component } from "react";
import styles from "./SearchBar.module.css";

export default class SearchBar extends Component {
  state = {
    searchQuery: ""
  };

  handleChange = e => {
    this.setState({ searchQuery: e.target.value });
  };

  handleSubmit = e => {
    const { searchQuery } = this.state;
    e.preventDefault();
    this.props.onSearch(searchQuery);
    this.setState({
      searchQuery: ""
    });
  };

  render() {
    const { searchQuery } = this.state;
    return (
      <form onSubmit={this.handleSubmit} className={styles.form}>
        <input
        className={styles.input}
          type="text"
          name="movie"
          value={searchQuery}
          onChange={this.handleChange}
          placeholder="Enter a movie name"
        />
        <button className={styles.button} type="submit">Search</button>
      </form>
    );
  }
}
