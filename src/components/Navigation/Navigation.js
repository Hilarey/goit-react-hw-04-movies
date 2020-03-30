import React from "react";
import { NavLink } from "react-router-dom";
import routes from "../../routes";
import styles from "./Navigation.module.css";

const Navigation = () => (
  <ul className={styles.list}>
    <li>
      <NavLink exact to={routes.HOME} className={styles.NavLink}>
        Home
      </NavLink>
    </li>
    <li>
      <NavLink to={routes.MOVIES} className={styles.NavLink}>Movies</NavLink>
    </li>
  </ul>
);

export default Navigation;
