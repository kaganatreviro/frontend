import React, { useState } from "react";
import "./style.scss";

const importAll = (r) => {
  const images = {};
  r.keys().forEach((item) => {
    images[item.replace("./", "")] = r(item);
  });
  return images;
};

const images = importAll(
  require.context("../../assets/icons", false, /\.(png|jpe?g|svg)$/),
);

function Icon(props) {
  const {
    name,
    height,
    width,
    hover,
    style,
    className,
    onClick,
    onMouseCustom,
    disabled,
  } = props;

  const [over, setOver] = useState(false);

  const handleSetOver = () => {
    setOver(true);
  };

  if (!images[`${name}.svg`] && !images["_active.svg"]) {
    return <span>none*</span>;
  }

  return (
    <div
      className={`icon ${className}`}
      onMouseOver={onMouseCustom || handleSetOver}
      onMouseOut={() => setOver(false)}
      style={style}
      onClick={onClick}
      disabled={disabled}
    >
      <img
        width={width}
        height={height}
        src={images[over && hover ? `${name}_active.svg` : `${name}.svg`]}
        alt={name}
      />
    </div>
  );
}

export default Icon;
