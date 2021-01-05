import React from "react";
import PropTypes from "prop-types";
import { Link as RouterLink } from "react-router-dom";
import { ICON_URL, IMAGES_URL } from "../../../config/appConfig";

/**
 * Aqui se agregan los componentes para etiquetas comunes y reusables
 *
 */

function Icon({ name, className, extraClass }) {
  let fullClass = className || "icon";
  return (
    <svg className={`${fullClass} ${extraClass}`}>
      <use href={`${ICON_URL}#${name}`} />
    </svg>
  );
}

Icon.propTypes = {
  name: PropTypes.string,
  className: PropTypes.string,
  extraClass: PropTypes.string,
};

Icon.defaultProps = {
  name: "",
  extraClass: "",
};

function Img({ src, alt, className, useAssets }) {
  const imageSrc = useAssets ? `${IMAGES_URL}/${src}` : src;
  return <img src={imageSrc} className={className} alt={alt} />;
}

Img.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  className: PropTypes.string,
  useAssets: PropTypes.bool.isRequired,
};

Img.defaultProps = {
  src: "",
  alt: "Image",
  className: "",
  useAssets: true,
};

function Link({
  id,
  href,
  text,
  className,
  icon,
  iconClass,
  image,
  imageAlt,
  children,
  target,
  onClick,
  addChildren,
  useRouter,
}) {
  if (useRouter) {
    return (
      <RouterLink
        id={id}
        to={href}
        className={className}
        onClick={onClick}
        target={target}
      >
        {children && !addChildren ? (
          children
        ) : (
          <React.Fragment>
            {icon && <Icon name={icon} className={iconClass} />}
            {image && <Img src={image} className={className} alt={imageAlt} />}
            {text}
            {addChildren && children && children}
          </React.Fragment>
        )}
      </RouterLink>
    );
  }
  return (
    <a
      id={id}
      href={href}
      className={className}
      target={target}
      onClick={onClick}
    >
      {children && !addChildren ? (
        children
      ) : (
        <React.Fragment>
          {icon && <Icon name={icon} className={iconClass} />}
          {image && <Img src={image} className={className} alt={imageAlt} />}
          {text}
          {addChildren && children && children}
        </React.Fragment>
      )}
    </a>
  );
}

Link.propTypes = {
  id: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.string,
  iconClass: PropTypes.string,
  href: PropTypes.string.isRequired,
  className: PropTypes.string,
  image: PropTypes.string,
  imageAlt: PropTypes.string,
  target: PropTypes.string,
  addChildren: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  useRouter: PropTypes.bool.isRequired,
};

Link.defaultProps = {
  className: "",
  text: "",
  target: "",
  addChildren: false,
  useRouter: false,
};

function Spinner({ extraClass, text, small }) {
  return (
    <div className={`loading ${small ? "small" : ""} ${extraClass}`}>
      <div className="icon">
        <Icon name="icon-power-off" className="spiner-null" />
      </div>

      {text && <div className="text">{text}</div>}
    </div>
  );
}

Spinner.propTypes = {
  extraClass: PropTypes.string,
  text: PropTypes.string,
  small: PropTypes.bool.isRequired,
};
Spinner.defaultProps = {
  extraClass: "",
  small: false,
};

function Empty({ message }) {
  return <div>{message}</div>;
}

Empty.propTypes = {
  message: PropTypes.string,
};

Empty.defaultProps = {
  message: "No hay contenido para mostrar...",
};

export { Icon, Img, Link, Spinner, Empty };
