import React from "react";
import Appbar from "../Appbar/Appbar";
import "./Layout.css";

const Layout = ({ children }) => <div className="Layout"><Appbar/> <hr/> {children}</div>;

export default Layout;