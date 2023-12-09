import React from "react";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import "./NotFound.css";

const NotFound = () => {
  const { pathname } = useLocation();

  return (
    <div className="not-found">
      <h1 className="not-found__title">Oops!</h1>
      <p className="not-found__message">
        We can’t seem to find the page you’re looking for.
      </p>
      <p className="not-found__error">Error code: 404</p>
      <p className="not-found__path">
        There is no page at <code>{pathname}</code>
      </p>
      <p className="not-found__link">
        Go back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};

export default NotFound;
