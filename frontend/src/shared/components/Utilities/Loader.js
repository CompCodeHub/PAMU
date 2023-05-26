import React from "react";
import { Spinner } from "react-bootstrap";

// Responsible for displaying a loading animation
const Loader = () => {
  return (
    <React.Fragment>
      <Spinner
        animation="border"
        role="status"
        style={{ margin: "auto", height: "100px", width: "100px", display: "block" }}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </React.Fragment>
  );
};

export default Loader;
