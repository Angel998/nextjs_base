import React from "react";
import PropTypes from "prop-types";
import { uuid } from "../../../utils/string";
import { Spinner, Empty } from "../common/tags";

function SimpleMapper({
  elements,
  loading,
  smallSpinner,
  emptyMessage,
  component,
  componentAditionalProps,
}) {
  let content;

  if (loading) {
    content = <Spinner small={smallSpinner} />;
  } else if (elements.length > 0) {
    const ComponentToRender = component;
    content = elements.map((item) => (
      <ComponentToRender
        key={uuid()}
        element={item}
        {...componentAditionalProps}
      />
    ));
  } else {
    content = <Empty message={emptyMessage} />;
  }

  return content;
}

SimpleMapper.propTypes = {
  elements: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired,
  smallSpinner: PropTypes.bool.isRequired,
  emptyMessage: PropTypes.string,
  component: PropTypes.any,
  componentAditionalProps: PropTypes.object,
};

SimpleMapper.defaultProps = {
  elements: [],
  loading: false,
  smallSpinner: false,
  componentAditionalProps: {},
};

export { SimpleMapper };
