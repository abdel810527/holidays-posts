import React, { Fragment } from "react";

export default function Errormessage({ message }) {
  return (
    <Fragment>
      <h5 className="error-message">{message}</h5>
    </Fragment>
  );
}
