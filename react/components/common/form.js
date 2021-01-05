import React from "react";
import PropTypes from "prop-types";

import { Icon } from "../common/tags";
import { getImagesFromInput } from "../../utils/getFilesFromInput";

function Button({
  text,
  img,
  icon,
  iconClass,
  className,
  extraClass,
  onClick,
  type,
  disabled,
  dataTarget,
}) {
  const fullClass = className || "button";
  return (
    <button
      className={`${fullClass} ${extraClass}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
      data-target={dataTarget}
    >
      {img && <img src={img} alt="" />}

      {icon && <Icon name={icon} className={iconClass} />}
      <span>{text}</span>
    </button>
  );
}

Button.propTypes = {
  text: PropTypes.string,
  img: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  className: PropTypes.string,
  extraClass: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  dataTarget: PropTypes.string,
};

Button.defaultProps = {
  extraClass: "",
  type: "button",
  disabled: false,
};

function getInputError(error) {
  let inputError;

  if (error) {
    if (Array.isArray(error)) {
      inputError = error.find((err) => err !== undefined);
    } else {
      inputError = error;
    }
  }
  return inputError;
}

function InputField({
  id,
  label,
  type,
  value,
  className,
  extraClass,
  error,
  onChange,
  disabled,
  placeholder,
  icon,
  iconClass,
}) {
  const fullClass = className || "input-group";
  const inputError = getInputError(error);
  return (
    <div className={`${fullClass} ${extraClass}`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type={type}
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
        placeholder={placeholder}
      />
      {inputError && (
        <span className="helper-text no-hide red">{inputError}</span>
      )}

      {icon && <Icon name={icon} className={iconClass} />}
    </div>
  );
}

InputField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  disabled: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  extraClass: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
  placeholder: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
};

InputField.defaultProps = {
  type: "text",
  className: "",
  extraClass: "",
  disabled: false,
};

function InputPassword({
  id,
  label,
  value,
  error,
  className,
  extraClass,
  onChange,
  disabled,
}) {
  const fullClass = className || "input-group";
  const inputError = getInputError(error);

  return (
    <div className={`${fullClass} ${extraClass} input-password`}>
      {label && <label htmlFor={id}>{label}</label>}
      <input
        type="password"
        name={id}
        id={id}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {inputError && (
        <span className="helper-text no-hide red">{inputError}</span>
      )}
    </div>
  );
}

InputPassword.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  extraClass: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

InputPassword.defaultProps = {
  className: "",
  extraClass: "",
  disabled: false,
};

function InputFile({
  className,
  extraClass,
  id,
  label,
  value,
  disabled,
  error,
  multiple,
  forImages,
  onChange,
}) {
  const fullClass = className || "input-group";
  return (
    <div className={`${fullClass} ${extraClass}`}>
      <input
        type="file"
        id={id}
        onChange={(event) => {
          let files = [];
          const eventData = {
            target: {
              name: id,
              value: files,
            },
          };
          if (forImages) {
            getImagesFromInput(event, (files) => {
              eventData.target.value = files;
              onChange(eventData);
            });
          }
        }}
        disabled={disabled}
        multiple={multiple}
      />
      {label && <label htmlFor={id}>{label}</label>}

      {error && <span className="helper-text no-hide red">{error}</span>}
    </div>
  );
}

InputFile.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  error: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  forImages: PropTypes.bool.isRequired,
  multiple: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
  className: PropTypes.string,
  extraClass: PropTypes.string,
  disabled: PropTypes.bool.isRequired,
};

InputFile.defaultProps = {
  extraClass: "",
  disabled: false,
  forImages: true,
  multiple: false,
};

export { Button, InputField, InputFile, InputPassword };
