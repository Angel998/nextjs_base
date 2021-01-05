import React from "react";
import PropTypes from "prop-types";
import { Icon } from "./tags";

function WarningTrash({ message }) {
  return (
    <div className="warning warning-trash">
      <div className="icon">
        <Icon name="icon-trash" className="empty" />
      </div>

      <div className="text">{message}</div>
    </div>
  );
}

WarningTrash.propTypes = {
  message: PropTypes.string.isRequired,
};

export { WarningTrash };
